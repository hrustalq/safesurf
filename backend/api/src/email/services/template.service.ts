import { Injectable } from '@nestjs/common';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import * as Handlebars from 'handlebars';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class TemplateService {
  private readonly templatesDir: string;
  private readonly cache: Map<string, Handlebars.TemplateDelegate>;

  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext('TemplateService');
    this.templatesDir = join(process.cwd(), 'src/email/templates');
    this.cache = new Map();
    this.registerHelpers();
    this.registerPartials();
  }

  private registerHelpers() {
    Handlebars.registerHelper('formatDate', (date: Date) => {
      return new Date(date).toLocaleDateString();
    });

    Handlebars.registerHelper('uppercase', (text: string) => {
      return text.toUpperCase();
    });
  }

  private registerPartials() {
    try {
      const partialsDir = join(this.templatesDir, 'partials');
      const files = readdirSync(partialsDir);
      files.forEach(file => {
        if (file.endsWith('.hbs')) {
          const partialName = file.replace('.hbs', '');
          const partialContent = readFileSync(join(partialsDir, file), 'utf-8');
          Handlebars.registerPartial(partialName, partialContent);
        }
      });
    } catch (error) {
      this.logger.warn('No partials directory found');
    }
  }

  getTemplate(name: string, language: string = 'en'): Handlebars.TemplateDelegate {
    const cacheKey = `${name}-${language}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const templatePath = join(this.templatesDir, language, `${name}.hbs`);
      const templateContent = readFileSync(templatePath, 'utf-8');
      const template = Handlebars.compile(templateContent);
      this.cache.set(cacheKey, template);
      return template;
    } catch (error) {
      this.logger.error({ error, templateName: name, language }, 'Failed to load template');
      
      // Fallback to English if the requested language template doesn't exist
      if (language !== 'en') {
        this.logger.warn(`Falling back to English template for ${name}`);
        return this.getTemplate(name, 'en');
      }
      
      throw error;
    }
  }

  render(templateName: string, data: any, language?: string): string {
    const template = this.getTemplate(templateName, language);
    return template(data);
  }
} 