import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'icon', // ← имя должно совпадать
    plugin: 'icon-picker',
    type: 'string',
  });
};

export default register;
