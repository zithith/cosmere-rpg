import { AncestryItem } from '@src/system/documents';

import { BaseItemSheet, COMMON_PARTS, COMMON_TABS } from './base';
import { AnyObject } from '@src/system/types/utils';
import { TabsApplicationMixin } from './mixins/tabs';
import {
    ComponentHandlebarsApplicationMixin,
    ComponentHandlebarsRenderOptions,
} from '../mixins';

export class AncestrySheet extends TabsApplicationMixin(
    ComponentHandlebarsApplicationMixin(BaseItemSheet),
) {
    /* eslint-disable @typescript-eslint/unbound-method */
    static DEFAULT_OPTIONS = {
        classes: ['cosmere-rpg', 'sheet', 'item', 'ancestry'],
        position: {
            width: 600,
            height: 250,
        },
        form: {
            handler: this.onFormEvent,
            submitOnChange: true,
        },
        window: {
            resizable: true,
            title: '<i class="fas fa-timeline"></i> ' + this.name,
        },
    };
    /* eslint-enable @typescript-eslint/unbound-method */

    static PARTS = {
        ...COMMON_PARTS,
        'sheet-content': {
            template:
                'systems/cosmere-rpg/templates/item/ancestry/sheet-content.hbs',
        },
    };

    static TABS = foundry.utils.mergeObject(super.TABS, {
        ...COMMON_TABS,
    });

    get item(): AncestryItem {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return super.document;
    }

    /* --- Form --- */

    public static onFormEvent(
        this: AncestrySheet,
        event: Event,
        form: HTMLFormElement,
        formData: FormDataExtended,
    ) {
        super.onFormEvent(event, form, formData);
    }

    /* --- Context --- */

    public async _prepareContext(
        options: Partial<foundry.applications.api.ApplicationV2.RenderOptions>,
    ) {
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        if (
            (this.item.system.description.value as string) ===
            CONFIG.COSMERE.items.types.ancestry.desc_placeholder
        ) {
            this.item.system.description.value = game.i18n!.localize(
                this.item.system.description.value as string,
            );
        }
        const enrichedDescValue = await TextEditor.enrichHTML(
            this.item.system.description.value as string,
        );
        /* eslint-enable @typescript-eslint/no-unsafe-member-access */

        return {
            ...(await super._prepareContext(options)),
            descHtml: enrichedDescValue,
        };
    }

    /* --- Life cycle --- */

    protected _onRender(
        context: AnyObject,
        options: ComponentHandlebarsRenderOptions,
    ) {
        super._onRender(context, options);
    }

    protected async _renderFrame(
        options: Partial<foundry.applications.api.ApplicationV2.RenderOptions>,
    ): Promise<HTMLElement> {
        return super._renderFrame(options);
    }
}
