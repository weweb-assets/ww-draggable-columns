<template>
    <div v-if="!columns">Please bind variable</div>
    <div class="container">
        <div v-for="(column, index) in columns" :key="column.id">
            <wwLayoutItemContext :index="index" :item="{}" is-repeat :data="column">
                <wwLayout path="itemHeader"></wwLayout>
                <wwElement
                    v-bind="content.list"
                    :wwProps="{ group: 'berry', items: column.items, itemKey: content.itemKey }"
                    @element-event="onChange($event.event.value, index)"
                ></wwElement>
                <wwLayout path="itemFooter"></wwLayout>
            </wwLayoutItemContext>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    components: {
        draggable,
    },
    props: {
        content: { type: Object, required: true },
        wwProps: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ["trigger-event", "element-event"],
    setup() {
        return { group: wwLib.wwUtils.getUid() };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        columns() {
            if (!this.content.variableId) {
                return null;
            }
            const data = wwLib.wwVariable.getValue(this.content.variableId);
            if (!Array.isArray(data)) {
                return null;
            } else {
                return data;
            }
        },
    },
    methods: {
         onChange(value, index) {
            const columns = [...this.columns];
            columns.splice(index, 1, {...this.columns[index], items: value});
            this.$emit("trigger-event", { name: "change", event: { value: columns } });
            if (this.content.variableId) wwLib.wwVariable.updateValue(this.content.variableId, columns);
        },
    }
};
</script>

<style lang="scss">
.container {
    display: flex;
    flex-wrap: wrap;
}
</style>
