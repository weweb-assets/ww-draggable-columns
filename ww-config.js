export default {
    editor: {
        label: {
            en: "Draggable Columns",
        },
    },
    properties: {
        variableId: {
            label: 'Associated variable',
            type: 'Variable',
            options: {
                types: ['Array']
            }
        },
        itemKey: {
            label: 'Item key',
            type: 'Text',
            defaultValue: 'id',
        },
        itemHeader: {
            hidden: true,
            defaultValue: []
        },
        itemFooter: {
            hidden: true,
            defaultValue: []
        },
        list: {
            hidden: true,
            type: 'Element',
            defaultValue: {type: ''}
        }
    },
};
