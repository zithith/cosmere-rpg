import { CosmereItem } from '@system/documents/item';
import { DeepPartial } from '@system/types/utils';

const { ItemSheetV2 } = foundry.applications.sheets;

// NOTE: Have to use type instead of interface to comply with AnyObject type
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BaseItemSheetRenderContext = {
    item: CosmereItem;
};

const BaseItemSheetTabs = {
    Details: 'details',
    Effects: 'effects',
} as const;
// type BaseItemSheetTab = typeof BaseItemSheetTabs[keyof typeof BaseItemSheetTabs];

export const COMMON_TABS = {
    [BaseItemSheetTabs.Details]: {
        label: 'COSMERE.Item.Generic.Details.label',
        icon: '<i class="fa-solid fa-feather-pointed"></i>',
    },
    [BaseItemSheetTabs.Effects]: {
        label: 'COSMERE.Item.Generic.Effects.label',
        icon: '<i class="fa-solid fa-gear"></i>',
    },
};

export const COMMON_PARTS = {
    navigation: {
        template: `systems/cosmere-rpg/templates/item/parts/navigation.hbs`,
    },
    header: {
        template: `systems/cosmere-rpg/templates/item/parts/header.hbs`,
    },
};

export class BaseItemSheet<
    T extends BaseItemSheetRenderContext = BaseItemSheetRenderContext,
> extends ItemSheetV2<T> {
    static DEFAULT_OPTIONS = {
        /* eslint-disable @typescript-eslint/unbound-method */
        form: {
            handler: this.onFormEvent,
            submitOnChange: true,
        },
    };
    /* eslint-enable @typescript-eslint/unbound-method */

    get item(): CosmereItem {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return super.document;
    }

    public static onFormEvent(
        this: BaseItemSheet,
        event: Event,
        form: HTMLFormElement,
        formData: FormDataExtended,
    ) {
        if (
            !(event.target instanceof HTMLInputElement) &&
            !(event.target instanceof HTMLTextAreaElement) &&
            !(
                event.target instanceof
                foundry.applications.elements.HTMLProseMirrorElement
            )
        )
            return;
        if (!event.target.name) return;

        console.dir(formData);

        // Update document
        void this.item.update(formData.object, { diff: false });
    }

    public async _prepareContext(
        options: DeepPartial<foundry.applications.api.ApplicationV2.RenderOptions>,
    ) {
        return {
            ...(await super._prepareContext(options)),
            item: this.item,
            desc: this.item.hasDescription()
                ? this.item.system.description
                : undefined,
            // effects: prepareActiveEffectCategories(this.item.effects)
        };
    }
}
