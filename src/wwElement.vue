<template>
    <div v-if="!columns">Please bind variable</div>
    <div class="container">
        <div v-for="column in columns" :key="column.id">
            <wwLayoutItemContext :index="index" :item="{}" is-repeat :data="column">
                <wwLayout path="itemHeader"></wwLayout>
                <wwElement
                    v-bind="content.list"
                    :wwProps="{ group, items: column.items, itemKey: content.itemKey }"
                    @element-event="onChange(index, $event.value)"
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
        onChange(value, index) {
            const items = [...this.columns];
            items.splice(index, 1, value);
            this.$emit("trigger-event", { name: "change", event: { value: items } });
            this.$emit("element-event", { name: "change", event: { value: items } });
            if (this.content.variableId) wwLib.wwVariable.updateValue(this.content.variableId, items);
        },
    },
};
</script>

<style lang="scss">
.container {
    display: flex;
    flex-wrap: wrap;
}
</style>
