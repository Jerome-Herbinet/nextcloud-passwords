<template>
    <div :class="className"
         @click="openAction($event)"
         @dragstart="dragStartAction($event)"
         :data-folder-id="folder.id"
         :data-folder-title="folder.label"
         data-drop-type="folder">
        <star-icon class="favorite" data-item-action="favorite" fill-color="var(--color-warning)" @click.prevent.stop="favoriteAction" v-if="folder.favorite"/>
        <star-outline-icon class="favorite" data-item-action="favorite" fill-color="var(--color-placeholder-dark)" @click.prevent.stop="favoriteAction" v-else/>
        <div class="favicon" :style="{'background-image': 'url(' + folder.icon + ')'}" :title="folder.label">&nbsp;</div>
        <div class="title" :title="folder.label"><span>{{ folder.label }}</span></div>
        <slot name="middle"/>
        <div class="more" @click="toggleMenu($event)">
            <i class="fa fa-ellipsis-h"></i>
            <div class="folderActionsMenu popovermenu bubble menu" :class="{ open: showMenu }">
                <slot name="menu">
                    <ul>
                        <slot name="menu-top"/>
                        <translate tag="li" data-item-action="edit" @click="renameAction()" icon="pencil" say="Rename"/>
                        <translate tag="li" data-item-action="move" @click="moveAction" icon="external-link" say="Move"/>
                        <translate tag="li" data-item-action="delete" @click="deleteAction()" icon="trash" say="Delete"/>
                        <slot name="menu-bottom"/>
                    </ul>
                </slot>
            </div>
        </div>
        <div class="date" :title="dateTitle">{{ getDate }}</div>
    </div>
</template>

<script>
    import Translate from '@vc/Translate';
    import DragManager from '@js/Manager/DragManager';
    import Localisation from "@js/Classes/Localisation";
    import FolderManager from '@js/Manager/FolderManager';
    import SearchManager from "@js/Manager/SearchManager";
    import ContextMenuService from '@js/Services/ContextMenuService';
    import StarIcon from "vue-material-design-icons/Star.vue";
    import StarOutlineIcon from "vue-material-design-icons/StarOutline.vue";

    export default {
        components: {
            Translate,
            StarIcon,
            StarOutlineIcon
        },

        props: {
            folder: {
                type: Object
            }
        },

        data() {
            return {
                showMenu: false
            };
        },

        computed: {
            getDate() {
                return Localisation.formatDate(this.folder.edited);
            },
            dateTitle() {
                return Localisation.translate('Last modified on {date}', {date: Localisation.formatDate(this.folder.edited, 'long')});
            },
            className() {
                let classNames = 'row folder';

                if(SearchManager.status.active) {
                    classNames += SearchManager.status.ids.indexOf(this.folder.id) !== -1 ? ' search-visible':' search-hidden';
                }

                return classNames;
            }
        },

        mounted() {
            ContextMenuService.register(this.folder, this.$el);
        },

        methods: {
            favoriteAction() {
                this.folder.favorite = !this.folder.favorite;
                FolderManager.updateFolder(this.folder)
                             .catch(() => { this.folder.favorite = !this.folder.favorite; });
            },
            toggleMenu() {
                this.showMenu = !this.showMenu;
                if(this.showMenu) {
                    document.addEventListener('click', this.menuEvent);
                } else {
                    document.removeEventListener('click', this.menuEvent);
                }
            },
            menuEvent($e) {
                if($e.target.closest('[data-folder-id="' + this.folder.id + '"] .more') !== null) return;
                this.showMenu = false;
                document.removeEventListener('click', this.menuEvent);
            },
            openAction($event) {
                if($event.target.closest('.more') !== null) return;
                this.$router.push({name: 'Folders', params: {folder: this.folder.id}});
            },
            deleteAction() {
                FolderManager.deleteFolder(this.folder);
            },
            moveAction() {
                FolderManager.moveFolder(this.folder);
            },
            renameAction() {
                FolderManager.renameFolder(this.folder)
                             .then((f) => {this.folder = f;});
            },
            dragStartAction($e) {
                DragManager
                    .start($e, this.folder)
                    .then((data) => {
                        if(data.dropType === 'folder') {
                            FolderManager
                                .moveFolder(this.folder, data.folderId)
                                .then((f) => {this.folder = f;});
                        } else if(data.dropType === 'trash') {
                            FolderManager.deleteFolder(this.folder);
                        }
                    });
            }
        },

        watch: {
            folder(value) {
                ContextMenuService.register(value, this.$el);
            }
        }
    };
</script>

<style lang="scss">
#app-content {
    .item-list {
        .row.folder {
            .favicon {
                background-size : 32px;
            }
        }
    }
}

</style>