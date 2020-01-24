(function() {
    let translations = {
            'Passwords'                           : '密码',
            'All'                                 : '全部',
            'Folders'                             : '标签',
            'Recent'                              : '最近',
            'Favorites'                           : '收藏',
            'Shared'                              : '共享',
            'Tags'                                : '标签',
            'Security'                            : '安全性',
            'Trash'                               : '回收站',
            'Details'                             : '详情',
            'Edit'                                : '编辑',
            'Rename'                              : '重命名',
            'Delete'                              : '删除',
            'Restore'                             : '恢复',
            'New Password'                        : '创建密码',
            'New Folder'                          : '创建分类',
            'New Tag'                             : '创建标签',
            'Secure'                              : '安全',
            'Weak'                                : '弱',
            'Weak (Duplicate)'                    : '弱（重复）',
            'Weak (Outdated)'                     : '若（已过期）',
            'Breached'                            : '已泄露',
            'Notes'                               : '笔记',
            'Share'                               : '分享',
            'Revisions'                           : '版本',
            'QR Code'                             : '二维码',
            'Password'                            : '密码',
            'Username'                            : '用户名',
            'Website'                             : '网站',
            'Add Tags...'                         : '创建标签...',
            'Color'                               : '颜色',
            'Name'                                : '名字',
            'Label'                               : '标签',
            'General'                             : '一般性',
            'Properties'                          : '属性',
            'Numbers'                             : '数字',
            'Special Characters'                  : '特殊字符',
            'More Options'                        : '更多选项',
            'Favorite'                            : '收藏',
            'Encryption'                          : '加密',
            'On the server'                       : '服务器上',
            'Custom Fields'                       : '自定义字段',
            'Secret'                              : '密钥',
            'Text'                                : '文本',
            'File'                                : '文件',
            'Value'                               : '值',
            'Toggle visibility'                   : '切换可见性',
            'Generate password'                   : '生成密码',
            'Simple Server Side Encryption V1'    : '简单服务端加密 V1',
            'Take some notes'                     : '做些笔记',
            'Save'                                : '保存',
            'Create folder'                       : '创建分类',
            'Folder created'                      : '分类已创建',
            'Creating folder failed'              : '创建分类失败',
            'Rename folder'                       : '重命名分类',
            'Folder renamed'                      : '分类已重命名',
            'Renaming folder failed'              : '重命名分类失败',
            'Folder moved'                        : '分类已移动',
            'Moving folder failed'                : '移动分类失败',
            'Delete folder'                       : '删除分类',
            'Do you want to delete the folder'    : '你想删除这个分类吗',
            'Folder deleted'                      : '分类已删除',
            'Deleting folder failed'              : '删除分类失败',
            'Folder restored'                     : '分类已恢复',
            'Restoring folder failed'             : '恢复分类失败',
            'Create tag'                          : '创建标签',
            'Tag created'                         : '标签已创建',
            'Creating tag failed'                 : '标签创建失败',
            'Edit tag'                            : '编辑标签',
            'Generate random color'               : '生成随机颜色',
            'Tag saved'                           : '标签已保存',
            'Saving tag failed'                   : '保存标签失败',
            'Delete tag'                          : '删除标签',
            'Do you want to delete the tag'       : '你想删除这个标签吗',
            'Tag deleted'                         : '标签已删除',
            'Deleting tag failed'                 : '标签删除失败',
            'Tag restored'                        : '标签已还原',
            'Restoring tag failed'                : '标签还原失败',
            'Create password'                     : '创建密码',
            'Password created'                    : '密码已创建',
            'Creating password failed'            : '创建密码失败',
            'Edit password'                       : '编辑密码',
            'Password saved'                      : '密码已保存',
            'Saving password failed'              : '保存密码失败',
            'Password moved'                      : '密码已移动',
            'Moving password failed'              : '移动密码失败',
            'Delete password'                     : '删除密码',
            'Do you want to delete the password'  : '你想删除这个密码吗',
            'Password deleted'                    : '密码已删除',
            'Password restored'                   : '密码已恢复',
            'Restoring password failed'           : '密码已恢复',
            'Open Url'                            : '打开链接',
            'Copy Url'                            : '复制链接',
            'Copy User'                           : '复制用户名',
            'Copy Password'                       : '复制密码',
            '{element} was copied to clipboard'   : '{element} 已被复制到剪切板',
            'Error copying {element} to clipboard': '复制 {element} 到剪切板时失败',
            'Last modified on {date}'             : '最后修改于 {date}',
            'Restore revision'                    : '恢复版本',
            'Revision restored'                   : '版本已恢复',
            'Restoring revision failed'           : '版本恢复失败',
            'Do you want to restore the revision?': '你想恢复版本吗？',
            'Shared with you'                     : '与您共享',
            'Shared by you'                       : '由您共享',
            'Statistics'                          : '统计',
            'Created on'                          : '创建于',
            'Last updated'                        : '最后更新于',
            '{count} revisions'                   : '{count} 个版本',
            'Shares'                              : '分享',
            '{count} shares'                      : '{count} 次分享',
            'Encryption on server'                : '服务器端加密',
            'Encryption on client'                : '客户端加密',
            'No encryption'                       : '无加密',
            'Simple encryption (Gen. 1)'          : '简单加密（版本 1）',
            'Simple encryption (Gen. 2)'          : '简单加密（版本 2）',
            'Advanced encryption (SSE V2)'        : '高级加密（SSE V2）',
            'Encryption with libsodium'           : '使用 libsodium 加密',
            'More'                                : '更多',
            'Backup and Restore'                  : '备份与还原',
            "Settings"                            : '设置',
            'Handbook'                            : '参考手册',
            '{name} has shared this with you'     : '{name} 和您共享了这个',
            '{editable} and {shareable}.'         : '{editable} 和 {shareable}。',
            'Editing allowed'                     : '可以编辑',
            'Editing disallowed'                  : '不可编辑',
            'sharing allowed'                     : '可以共享',
            'sharing disallowed'                  : '不可共享',
            'Search user'                         : '搜索用户',
            'Set expiration date'                 : '设置过期日期',
            'Expires {date}'                      : '过期于 {date}',
            'Choose expiration date'              : '选择过期日期',
            'Please choose a date in the future'  : '请选择一个未来的日期',
            'Invalid date'                        : '非法日期',
            'The user {uid} does not exist'       : '该用户 {uid} 不存在',
            'Unable to share password: {message}' : '无法共享密码：{message}',
            'Toggle write permissions'            : '切换写入权限',
            'Toggle share permissions'            : '切换共享权限',
            'Stop sharing'                        : '停止共享',
            'Date'                                : '日期',
            'Default Cache (0 files, 0 B)'        : '默认缓存（0 个文件，0 B）',
            'Avatars Cache (0 files, 0 B)'        : '头像缓存（0 个文件，0 B）',
            'Favicon Cache (0 files, 0 B)'        : '网站图标缓存（0 个文件，0 B）',
            'Preview Cache (0 files, 0 B)'        : '预览缓存（0 个文件，0 B）',
            'Passwords Cache (0 files, 0 B)'      : '密码缓存（0 个文件，0 B）',
            'Changed'                             : '已改变',
            'Modified'                            : '已修改',
            'Edited'                              : '已编辑',
            'Created'                             : '已创建',
            'Folder'                              : '分类',
            'Revision'                            : '版本',
            'Url'                                 : '链接',
            'Parent'                              : '上级项',
            'Delete All Items'                    : '删除所有项',
            'Restore All Items'                   : '恢复所有项',
            'Restore Items'                       : '恢复项',
            'Restore all items in trash?'         : '恢复所有回收站中的项？',
            'Restore this item'                   : '恢复该项',
            'Items restored'                      : '项已恢复',
            'Empty Trash'                         : '清空回收站',
            'Delete all items in trash?'          : '删除所有回收站中的项？',
            'Trash emptied'                       : '回收站已清空',
            'Search'                              : '搜索',
            'Use the search box to search'        : '使用搜索框以搜索',
            'Search everywhere for "{query}"'     : '在所有地方搜索 "{query}"',
            'There is nothing here'               : '这里空空如也',
            'Click on "+" to add something'       : '点击“+”来创建些什么',
            'Deleted items will appear here'      : '已删除项会出现这里',
            'No passwords were shared with you'   : '没有密码与您共享',
            'You did not share any passwords'     : '您没有共享任何密码',
            'Your favorites will appear here'     : '您的收藏会出现在这里',
            'Better check the other sections'     : '最好看看其它部分',
            'That\'s probably a good sign'        : '那也许是个好事',
            'Go to {href}'                        : '跳转到 {href}',
            'Contents'                            : '内容',
            'Figure {count}: {title}'             : '数据 {count}：{title}',
            'Unable to fetch page: {message}.'    : '无法取得页面：{message}。',
            'Invalid content type {mime}'         : '非法的内容类型：{mime}',
            'No content available'                : '没有内容可用',
            'Not Found'                           : '未找到',
            'Still need help?'                    : '仍需要帮助？',
            'Ask in our forum!'                   : '在我们的论坛中询问！',
            'Found an error?'                     : '发现一个错误？',
            'Tell us!'                            : '告诉我们！',
            'The session has expired'             : '该会话已过期',
            'API Session Token expired'           : 'API 会话令牌已过期',
            'Network error'                       : '网络错误',
            'Unable to load {module}'             : '无法载入 {module}',
            'Sort by name'                        : '按名字排序',
            'Sort by modified date'               : '按修改日期排序',
            '{passwords} passwords'               : '{passwords} 个密码',
            '1 password'                          : '1 个密码',
            '{folders} folders'                   : '{folders} 个分类',
            '1 folder'                            : '1 个分类',
            '{tags} tags'                         : '{tags} 个标签',
            '1 tag'                               : '1 个标签',
            'Nothing'                             : '什么都没有',
            ' and '                               : ' 和 ',
            'match'                               : '匹配',
            'matches'                             : '匹配',
            'Created by'                          : '创建于',
            'You are logging in as {user}'        : '您正以 {user} 身份登录',
            'Login'                               : '登录',
            'Request token again'                 : '再次请求令牌',
            'Too many attempts'                   : '尝试次数过多',
            'Password is too short'               : '密码过短',
            'Password invalid'                    : '密码非法',
            'Unknown Error'                       : '未知错误',
            'Token request failed'                : '令牌请求错误',
            'CLIENT::MAINTENANCE'                 : '维护中',
            'CLIENT::UNKNOWN'                     : '未知',
            'CLIENT::SYSTEM'                      : '系统',
            'CLIENT::PUBLIC'                      : '公开',
            'CLIENT::CRON'                        : '后台任务',
            'CLIENT::CLI'                         : '命令行终端',
            'Please correct your input'           : '请更正您的输入',
            'Show value'                          : '显示值',
            'Cancel'                              : '取消',
            'Ok'                                  : '好',
            'true'                                : '真',
            'false'                               : '假',
            'yes'                                 : '是',
            'no'                                  : '否'
        },
        helpTexts    = {
            'You have reached the maximum length of 4096 characters'          : '您已经到达最长 4096 字符的限制',
            'We could not find anything for "{query}"'                        : '我们找不到任何有关“{query}”的内容。',
            'The page "{page}" could not be fetched from the handbook server.': '页面“{page}”无法从参考手册服务器上获取到。',
            'Some data is waiting to be synchronized'                         : '一些数据正等待被同步',
            'You will be logged out in {time} seconds'                        : '您将在 {time} 秒后被退出登录',
            'You may have requested too many tokens. Please try again later.' : '您尝试获得了太多令牌。请稍后再试。',
        },
        longTexts    = {
            'End-to-End encryption will be disabled for this password if you share it.'                : '如果共享，端到端加密将对该密码禁用。',
            'The session token is no longer valid. The app will now reload.'                           : '该会话令牌不再合法。应用将立刻重载。',
            'Today in 2018, the first version of passwords was published. Thank you for using the app.': '2018 年的今天，Passwords 推出了第一个公开版本。感谢您使用此应用。'
        };

    OC.L10N.register(
        'passwords',
        Object.assign(translations, helpTexts, longTexts),
        'nplurals=2; plural=(n != 1);'
    );
}());
