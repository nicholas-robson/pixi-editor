import { subscribe } from 'State/State';
import $ from 'jquery';
import { Control, getSelector, onChange } from 'Controls/Controls';
import { getLabel } from 'Controls/GetLabel';
import { typeHasProp } from 'Views/Inspector/TypeHasProp';
import { Prop } from 'Views/Inspector/Prop';
import { getTextureData, setTextureData } from 'Views/PixiApp/InitApp';

export function getImageControl(prop: Prop<string>): Control {
    const element = $(`
<div id='control-${prop.id}' class='row'>
    <label for='${prop.id}' class='col-sm-4 col-form-label col-form-label-sm '>${getLabel(prop)}</label>
    <div class='col-sm-8'>
        <label for='${prop.id}'><img class='img-thumbnail d-block' width='64' height='64' id='image-${
        prop.id
    }'/></label>
        <input type="file" class='form-control form-control-sm d-none' id='${prop.id}' accept=".jpg, .jpeg, .png">
    </div>
</div>
    `);

    const selector = getSelector(prop, (item, value) => {
        const hasType = item !== undefined && typeHasProp(item.type, prop);

        if (!hasType) {
            element.hide();
        } else {
            element.show();
            $(`#image-${prop.id}`).attr('src', value ? getTextureData(value) ?? '' : '');
        }
    });

    subscribe(selector);

    return {
        element,
        onAttach: () => {
            $(`#${prop.id}`).on('change', (e) => {
                const files = (e.target as any).files;
                const reader = new FileReader();
                reader.addEventListener('load', (event) => {
                    $(`#image-${prop.id}`).attr('src', (event?.target?.result as string) ?? '');
                    setTextureData(files[0].name, event?.target?.result as string);
                    onChange(prop, files[0].name);
                });
                reader.readAsDataURL(files[0]);
            });
        },
        selector,
    };
}
