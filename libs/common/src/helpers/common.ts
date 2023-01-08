import { Request } from 'express';

export const createOkMessage = ({ ip, method, url }: Request): string => {
  return `(${ip}) ${method} ${url}`;
};

export const createErrorMessage = (name: string, statusCode: number, { ip, method, url }: Request): string => {
  return `(${ip}) ${method} ${url} - ${name}(${statusCode})`;
};

export const enumToString = (en: any[] | Record<string, any>) => {
  return Object.values(en).join(' | ');
};
