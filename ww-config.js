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
            defaultValue: 'aaa053c8-a756-4130-8ab7-89e3a0dae293'
        }
    },
};
