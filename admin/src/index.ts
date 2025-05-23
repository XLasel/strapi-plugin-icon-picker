import React from 'react';
import { PLUGIN_ID } from './pluginId';

const pluginId =  PLUGIN_ID ;

export default {
  register(app: any) {
    console.log('Registering icon-picker plugin');
    
    app.customFields.register({
      name: 'icon',
      pluginId,
      type: 'string',
      intlLabel: {
        id: `${pluginId}.label`,
        defaultMessage: 'Icon Picker',
      },
      intlDescription: {
        id: `${pluginId}.description`,
        defaultMessage: 'Выберите иконку из библиотеки Lucide',
      },
      components: {
        Input: async () => {
          const module = await import('./components/IconPickerInput');
          return {
            default: module.default
          };
        }
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: `${pluginId}.customField.section.base`,
              defaultMessage: 'Base settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: `${pluginId}.customField.required.label`,
                  defaultMessage: 'Required field',
                },
                description: {
                  id: `${pluginId}.customField.required.description`,
                  defaultMessage: 'Make this field required',
                },
              },
            ],
          },
        ],
      },
    });
  },
  bootstrap() {},

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
