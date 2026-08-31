---
spec_id: admin/ubiquiti-nudgis
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ubiquiti Nudgis Control Spec"
manufacturer: Ubiquiti
model_family: Nudgis
aliases: []
compatible_with:
  manufacturers:
    - Ubiquiti
  models:
    - Nudgis
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - nudgis.demo.ubicast.eu
  - github.com
source_urls:
  - https://nudgis.demo.ubicast.eu/static/mediaserver/docs/api/index.html
  - https://github.com/UbiCastTeam/mediaserver-client
retrieved_at: 2026-08-30T16:36:13.105Z
last_checked_at: 2026-08-30T22:17:55.473Z
generated_at: 2026-08-30T22:17:55.473Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-endpoint request/response parameter schemas are not included in the refined source excerpt (the linked API HTML page was not extracted); each action below enumerates the path only and marks request/response fields as unresolved."
  - "source does not describe discrete power/routing/level behavior."
  - "per-endpoint request fields not in refined excerpt"
  - "refined source excerpt does not include response payload schemas."
  - "refined source excerpt does not include request/response field schemas"
  - "source mentions notifications endpoints (/api/v2/notifications/...) but does not"
  - "no multi-step sequences described in the refined excerpt."
  - "no safety warnings, interlocks, or power-on sequencing present in source."
  - "per-endpoint request/response schemas not in refined excerpt; firmware version; default TCP/HTTP port (source uses path-based `/api/v2/` only, no port stated)."
verification:
  verdict: verified
  checked_at: 2026-08-30T22:17:55.473Z
  matched_actions: 183
  action_count: 183
  confidence: medium
  summary: "All 183 spec endpoint URLs appear verbatim in the source REST API table of contents; transport (HTTP, /api/v2 base, api-key header/query/body) is documented verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# Ubiquiti Nudgis Control Spec

## Summary
Nudgis is an interactive media platform (video, live streams, channels, annotations) exposing its control surface as an HTTP/REST API under `/api/v2/`. All requests are GET or POST with JSON responses, and authentication uses an `api-key` request header (with `api_key` query/body fallback). This spec catalogs every documented API endpoint as an action.

<!-- UNRESOLVED: per-endpoint request/response parameter schemas are not included in the refined source excerpt (the linked API HTML page was not extracted); each action below enumerates the path only and marks request/response fields as unresolved. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /api/v2
auth:
  type: api_key
  api_key_header: api-key # stated in source: "request header named `api-key`"
  api_key_query_param: api_key  # stated in source: URL query string fallback
  api_key_body_field: api_key  # stated in source: POST data fallback
```

## Traits
```yaml
# No traditional AV traits (powerable/routable/levelable) apply to a media-server REST platform.
# UNRESOLVED: source does not describe discrete power/routing/level behavior.
```

## Actions
```yaml
# CRITICAL: every distinct endpoint path documented in the source table of contents is
# listed below as a separate action. Request/response parameter bodies are UNRESOLVED
# because the refined excerpt does not contain the per-endpoint schema.

# --- Activities ---
- id: api_v2_activities
  label: /api/v2/activities/
  kind: action
  command: "GET /api/v2/activities/"
  params: []  # UNRESOLVED: per-endpoint request fields not in refined excerpt

# --- Annotations ---
- id: api_v2_annotations_list
  label: /api/v2/annotations/list/
  kind: action
  command: "GET /api/v2/annotations/list/"
  params: []
- id: api_v2_annotations_slides_list
  label: /api/v2/annotations/slides/list/
  kind: action
  command: "GET /api/v2/annotations/slides/list/"
  params: []
- id: api_v2_annotations_resources_list
  label: /api/v2/annotations/resources/list/
  kind: action
  command: "GET /api/v2/annotations/resources/list/"
  params: []
- id: api_v2_annotations_chapters_list
  label: /api/v2/annotations/chapters/list/
  kind: action
  command: "GET /api/v2/annotations/chapters/list/"
  params: []
- id: api_v2_annotations_activities_list
  label: /api/v2/annotations/activities/list/
  kind: action
  command: "GET /api/v2/annotations/activities/list/"
  params: []
- id: api_v2_annotations_types_list
  label: /api/v2/annotations/types/list/
  kind: action
  command: "GET /api/v2/annotations/types/list/"
  params: []
- id: api_v2_annotations_list_moderate
  label: /api/v2/annotations/list/moderate/
  kind: action
  command: "GET /api/v2/annotations/list/moderate/"
  params: []
- id: api_v2_annotations_vote
  label: /api/v2/annotations/vote/
  kind: action
  command: "POST /api/v2/annotations/vote/"
  params: []
- id: api_v2_annotations_post
  label: /api/v2/annotations/post/
  kind: action
  command: "POST /api/v2/annotations/post/"
  params: []
- id: api_v2_annotations_validate
  label: /api/v2/annotations/validate/
  kind: action
  command: "POST /api/v2/annotations/validate/"
  params: []
- id: api_v2_annotations_unvalidate
  label: /api/v2/annotations/unvalidate/
  kind: action
  command: "POST /api/v2/annotations/unvalidate/"
  params: []
- id: api_v2_annotations_delete
  label: /api/v2/annotations/delete/
  kind: action
  command: "POST /api/v2/annotations/delete/"
  params: []
- id: api_v2_annotations_delete_all
  label: /api/v2/annotations/delete/all/
  kind: action
  command: "POST /api/v2/annotations/delete/all/"
  params: []
- id: api_v2_annotations_transfer
  label: /api/v2/annotations/transfer/
  kind: action
  command: "POST /api/v2/annotations/transfer/"
  params: []
- id: api_v2_annotations_delete_all_social_public_on_media
  label: /api/v2/annotations/delete-all-social-public-on-media/
  kind: action
  command: "POST /api/v2/annotations/delete-all-social-public-on-media/"
  params: []
- id: api_v2_annotations_search
  label: /api/v2/annotations/search/
  kind: action
  command: "GET /api/v2/annotations/search/"
  params: []

# --- Authentication ---
- id: api_v2_auth_generate_otl_url
  label: /api/v2/auth/generate-otl-url/
  kind: action
  command: "POST /api/v2/auth/generate-otl-url/"
  params: []

# --- Categories ---
- id: api_v2_categories
  label: /api/v2/categories/
  kind: action
  command: "GET /api/v2/categories/"
  params: []

# --- Catalog ---
- id: api_v2_catalog_bulk_delete
  label: /api/v2/catalog/bulk-delete/
  kind: action
  command: "POST /api/v2/catalog/bulk-delete/"
  params: []
- id: api_v2_catalog_bulk_restore
  label: /api/v2/catalog/bulk-restore/
  kind: action
  command: "POST /api/v2/catalog/bulk-restore/"
  params: []
- id: api_v2_catalog_bulk_update_categories
  label: /api/v2/catalog/bulk-update-categories/
  kind: action
  command: "POST /api/v2/catalog/bulk-update-categories/"
  params: []
- id: api_v2_catalog_get_all
  label: /api/v2/catalog/get-all/
  kind: action
  command: "GET /api/v2/catalog/get-all/"
  params: []

# --- Channels ---
- id: api_v2_channels
  label: /api/v2/channels/
  kind: action
  command: "GET /api/v2/channels/"
  params: []
- id: api_v2_channels_tree
  label: /api/v2/channels/tree/
  kind: action
  command: "GET /api/v2/channels/tree/"
  params: []
- id: api_v2_channels_path
  label: /api/v2/channels/path/
  kind: action
  command: "GET /api/v2/channels/path/"
  params: []
- id: api_v2_channels_content
  label: /api/v2/channels/content/
  kind: action
  command: "GET /api/v2/channels/content/"
  params: []
- id: api_v2_channels_get
  label: /api/v2/channels/get/
  kind: action
  command: "GET /api/v2/channels/get/"
  params: []
- id: api_v2_channels_add
  label: /api/v2/channels/add/
  kind: action
  command: "POST /api/v2/channels/add/"
  params: []
- id: api_v2_channels_edit
  label: /api/v2/channels/edit/
  kind: action
  command: "POST /api/v2/channels/edit/"
  params: []
- id: api_v2_channels_personal
  label: /api/v2/channels/personal/
  kind: action
  command: "GET /api/v2/channels/personal/"
  params: []
- id: api_v2_channels_delete
  label: /api/v2/channels/delete/
  kind: action
  command: "POST /api/v2/channels/delete/"
  params: []
- id: api_v2_channels_count_retranscoding
  label: /api/v2/channels/count-retranscoding/
  kind: action
  command: "GET /api/v2/channels/count-retranscoding/"
  params: []

# --- Default settings ---
- id: api_v2_settings_defaults_publishing
  label: /api/v2/settings/defaults/publishing/
  kind: action
  command: "GET /api/v2/settings/defaults/publishing/"
  params: []
- id: api_v2_settings_defaults_community
  label: /api/v2/settings/defaults/community/
  kind: action
  command: "GET /api/v2/settings/defaults/community/"
  params: []
- id: api_v2_settings_defaults_metadata
  label: /api/v2/settings/defaults/metadata/
  kind: action
  command: "GET /api/v2/settings/defaults/metadata/"
  params: []
- id: api_v2_settings_defaults_publishing_apply
  label: /api/v2/settings/defaults/publishing/apply/
  kind: action
  command: "POST /api/v2/settings/defaults/publishing/apply/"
  params: []
- id: api_v2_settings_defaults_community_apply
  label: /api/v2/settings/defaults/community/apply/
  kind: action
  command: "POST /api/v2/settings/defaults/community/apply/"
  params: []
- id: api_v2_settings_defaults_metadata_apply
  label: /api/v2/settings/defaults/metadata/apply/
  kind: action
  command: "POST /api/v2/settings/defaults/metadata/apply/"
  params: []
- id: api_v2_settings_defaults_publishing_edit
  label: /api/v2/settings/defaults/publishing/edit/
  kind: action
  command: "POST /api/v2/settings/defaults/publishing/edit/"
  params: []
- id: api_v2_settings_defaults_community_edit
  label: /api/v2/settings/defaults/community/edit/
  kind: action
  command: "POST /api/v2/settings/defaults/community/edit/"
  params: []
- id: api_v2_settings_defaults_metadata_edit
  label: /api/v2/settings/defaults/metadata/edit/
  kind: action
  command: "POST /api/v2/settings/defaults/metadata/edit/"
  params: []

# --- Downloads ---
- id: api_v2_download
  label: /api/v2/download/
  kind: action
  command: "GET /api/v2/download/"
  params: []
- id: api_v2_download_object_id_extension
  label: /api/v2/download/<object-id>.<extension>
  kind: action
  command: "GET /api/v2/download/<object-id>.<extension>"
  params:
    - name: object_id
      type: string
      description: Media object identifier (20 chars, prefixed with v/l/p/c)
    - name: extension
      type: string
      description: File extension
- id: api_v2_download_slides
  label: /api/v2/download/slides/
  kind: action
  command: "GET /api/v2/download/slides/"
  params: []
- id: api_v2_download_photos
  label: /api/v2/download/photos/
  kind: action
  command: "GET /api/v2/download/photos/"
  params: []
- id: api_v2_download_metadata
  label: /api/v2/download/metadata/
  kind: action
  command: "GET /api/v2/download/metadata/"
  params: []

# --- Files (skinning) ---
- id: api_v2_files_public
  label: /api/v2/files/public/
  kind: action
  command: "GET /api/v2/files/public/"
  params: []
- id: api_v2_files_public_get
  label: /api/v2/files/public/get/
  kind: action
  command: "GET /api/v2/files/public/get/"
  params: []
- id: api_v2_files_public_add
  label: /api/v2/files/public/add/
  kind: action
  command: "POST /api/v2/files/public/add/"
  params: []
- id: api_v2_files_public_rename
  label: /api/v2/files/public/rename/
  kind: action
  command: "POST /api/v2/files/public/rename/"
  params: []
- id: api_v2_files_public_delete
  label: /api/v2/files/public/delete/
  kind: action
  command: "POST /api/v2/files/public/delete/"
  params: []

# --- Groups ---
- id: api_v2_groups
  label: /api/v2/groups/
  kind: action
  command: "GET /api/v2/groups/"
  params: []
- id: api_v2_groups_get
  label: /api/v2/groups/get/
  kind: action
  command: "GET /api/v2/groups/get/"
  params: []
- id: api_v2_groups_add
  label: /api/v2/groups/add/
  kind: action
  command: "POST /api/v2/groups/add/"
  params: []
- id: api_v2_groups_edit
  label: /api/v2/groups/edit/
  kind: action
  command: "POST /api/v2/groups/edit/"
  params: []
- id: api_v2_groups_delete
  label: /api/v2/groups/delete/
  kind: action
  command: "POST /api/v2/groups/delete/"
  params: []
- id: api_v2_groups_ldap_search
  label: /api/v2/groups/ldap-search/
  kind: action
  command: "GET /api/v2/groups/ldap-search/"
  params: []
- id: api_v2_groups_members
  label: /api/v2/groups/members/
  kind: action
  command: "GET /api/v2/groups/members/"
  params: []
- id: api_v2_groups_members_add
  label: /api/v2/groups/members/add/
  kind: action
  command: "POST /api/v2/groups/members/add/"
  params: []
- id: api_v2_groups_members_edit
  label: /api/v2/groups/members/edit/
  kind: action
  command: "POST /api/v2/groups/members/edit/"
  params: []
- id: api_v2_groups_members_remove
  label: /api/v2/groups/members/remove/
  kind: action
  command: "POST /api/v2/groups/members/remove/"
  params: []
- id: api_v2_groups_rules
  label: /api/v2/groups/rules/
  kind: action
  command: "GET /api/v2/groups/rules/"
  params: []
- id: api_v2_groups_rules_add
  label: /api/v2/groups/rules/add/
  kind: action
  command: "POST /api/v2/groups/rules/add/"
  params: []
- id: api_v2_groups_rules_edit
  label: /api/v2/groups/rules/edit/
  kind: action
  command: "POST /api/v2/groups/rules/edit/"
  params: []
- id: api_v2_groups_rules_delete
  label: /api/v2/groups/rules/delete/
  kind: action
  command: "POST /api/v2/groups/rules/delete/"
  params: []

# --- Home pages ---
- id: api_v2_homepages
  label: /api/v2/homepages/
  kind: action
  command: "GET /api/v2/homepages/"
  params: []
- id: api_v2_homepages_get
  label: /api/v2/homepages/get/
  kind: action
  command: "GET /api/v2/homepages/get/"
  params: []
- id: api_v2_homepages_current
  label: /api/v2/homepages/current/
  kind: action
  command: "GET /api/v2/homepages/current/"
  params: []
- id: api_v2_homepages_add
  label: /api/v2/homepages/add/
  kind: action
  command: "POST /api/v2/homepages/add/"
  params: []
- id: api_v2_homepages_edit
  label: /api/v2/homepages/edit/
  kind: action
  command: "POST /api/v2/homepages/edit/"
  params: []
- id: api_v2_homepages_delete
  label: /api/v2/homepages/delete/
  kind: action
  command: "POST /api/v2/homepages/delete/"
  params: []

# --- Interactions ---
- id: api_v2_interactions_get
  label: /api/v2/interactions/get/
  kind: action
  command: "GET /api/v2/interactions/get/"
  params: []

# --- Latest ---
- id: api_v2_latest
  label: /api/v2/latest/
  kind: action
  command: "GET /api/v2/latest/"
  params: []

# --- Live streams ---
- id: api_v2_lives
  label: /api/v2/lives/
  kind: action
  command: "GET /api/v2/lives/"
  params: []
- id: api_v2_lives_active
  label: /api/v2/lives/active/
  kind: action
  command: "GET /api/v2/lives/active/"
  params: []
- id: api_v2_lives_statuses
  label: /api/v2/lives/statuses/
  kind: action
  command: "GET /api/v2/lives/statuses/"
  params: []
- id: api_v2_lives_properties
  label: /api/v2/lives/properties/
  kind: action
  command: "GET /api/v2/lives/properties/"
  params: []
- id: api_v2_lives_get_viewers
  label: /api/v2/lives/get-viewers/
  kind: action
  command: "GET /api/v2/lives/get-viewers/"
  params: []
- id: api_v2_lives_hlsify
  label: /api/v2/lives/hlsify/
  kind: action
  command: "POST /api/v2/lives/hlsify/"
  params: []
- id: api_v2_lives_prepare
  label: /api/v2/lives/prepare/
  kind: action
  command: "POST /api/v2/lives/prepare/"
  params: []
- id: api_v2_lives_start
  label: /api/v2/lives/start/
  kind: action
  command: "POST /api/v2/lives/start/"
  params: []
- id: api_v2_lives_stop
  label: /api/v2/lives/stop/
  kind: action
  command: "POST /api/v2/lives/stop/"
  params: []
- id: api_v2_lives_asr_config
  label: /api/v2/lives/asr-config/
  kind: action
  command: "POST /api/v2/lives/asr-config/"
  params: []
- id: api_v2_lives_change_slide
  label: /api/v2/lives/change-slide/
  kind: action
  command: "POST /api/v2/lives/change-slide/"
  params: []
- id: api_v2_lives_change_status
  label: /api/v2/lives/change-status/
  kind: action
  command: "POST /api/v2/lives/change-status/"
  params: []

# --- LTI ---
- id: api_v2_lti_bindings
  label: /api/v2/lti/bindings/
  kind: action
  command: "GET /api/v2/lti/bindings/"
  params: []
- id: api_v2_lti_bindings_get
  label: /api/v2/lti/bindings/get/
  kind: action
  command: "GET /api/v2/lti/bindings/get/"
  params: []
- id: api_v2_lti_bindings_add
  label: /api/v2/lti/bindings/add/
  kind: action
  command: "POST /api/v2/lti/bindings/add/"
  params: []
- id: api_v2_lti_bindings_edit
  label: /api/v2/lti/bindings/edit/
  kind: action
  command: "POST /api/v2/lti/bindings/edit/"
  params: []
- id: api_v2_lti_bindings_delete
  label: /api/v2/lti/bindings/delete/
  kind: action
  command: "POST /api/v2/lti/bindings/delete/"
  params: []

# --- Media ---
- id: api_v2_medias_get
  label: /api/v2/medias/get/
  kind: action
  command: "GET /api/v2/medias/get/"
  params: []
- id: api_v2_medias_add
  label: /api/v2/medias/add/
  kind: action
  command: "POST /api/v2/medias/add/"
  params: []
- id: api_v2_medias_add_zoom
  label: /api/v2/medias/add/zoom/
  kind: action
  command: "POST /api/v2/medias/add/zoom/"
  params: []
- id: api_v2_medias_edit
  label: /api/v2/medias/edit/
  kind: action
  command: "POST /api/v2/medias/edit/"
  params: []
- id: api_v2_medias_edit_autocam
  label: /api/v2/medias/edit/autocam/
  kind: action
  command: "POST /api/v2/medias/edit/autocam/"
  params: []
- id: api_v2_medias_duplicate
  label: /api/v2/medias/duplicate/
  kind: action
  command: "POST /api/v2/medias/duplicate/"
  params: []
- id: api_v2_medias_delete
  label: /api/v2/medias/delete/
  kind: action
  command: "POST /api/v2/medias/delete/"
  params: []
- id: api_v2_medias_add_thumb
  label: /api/v2/medias/add-thumb/
  kind: action
  command: "POST /api/v2/medias/add-thumb/"
  params: []
- id: api_v2_medias_clear_thumbs
  label: /api/v2/medias/clear-thumbs/
  kind: action
  command: "POST /api/v2/medias/clear-thumbs/"
  params: []
- id: api_v2_medias_notify_speakers
  label: /api/v2/medias/notify-speakers/
  kind: action
  command: "POST /api/v2/medias/notify-speakers/"
  params: []

# --- Navigation ---
- id: api_v2_menu
  label: /api/v2/menu/
  kind: action
  command: "GET /api/v2/menu/"
  params: []

# --- Notifications ---
- id: api_v2_notifications
  label: /api/v2/notifications/
  kind: action
  command: "GET /api/v2/notifications/"
  params: []
- id: api_v2_notifications_get
  label: /api/v2/notifications/get/
  kind: action
  command: "GET /api/v2/notifications/get/"
  params: []
- id: api_v2_notifications_join
  label: /api/v2/notifications/join/
  kind: action
  command: "POST /api/v2/notifications/join/"
  params: []
- id: api_v2_notifications_quit
  label: /api/v2/notifications/quit/
  kind: action
  command: "POST /api/v2/notifications/quit/"
  params: []
- id: api_v2_notifications_quit_token
  label: /api/v2/notifications/quit/token/
  kind: action
  command: "POST /api/v2/notifications/quit/token/"
  params: []

# --- Permissions ---
- id: api_v2_perms_get
  label: /api/v2/perms/get/
  kind: action
  command: "GET /api/v2/perms/get/"
  params: []
- id: api_v2_perms_get_default
  label: /api/v2/perms/get/default/
  kind: action
  command: "GET /api/v2/perms/get/default/"
  params: []
- id: api_v2_perms_get_for_content
  label: /api/v2/perms/get/for-content/
  kind: action
  command: "GET /api/v2/perms/get/for-content/"
  params: []
- id: api_v2_perms_edit
  label: /api/v2/perms/edit/
  kind: action
  command: "POST /api/v2/perms/edit/"
  params: []
- id: api_v2_perms_edit_default
  label: /api/v2/perms/edit/default/
  kind: action
  command: "POST /api/v2/perms/edit/default/"
  params: []
- id: api_v2_perms_profiles
  label: /api/v2/perms/profiles/
  kind: action
  command: "GET /api/v2/perms/profiles/"
  params: []

# --- Recorders control ---
- id: api_v2_recorders
  label: /api/v2/recorders/
  kind: action
  command: "GET /api/v2/recorders/"
  params: []
- id: api_v2_recorders_control
  label: /api/v2/recorders/control/
  kind: action
  command: "POST /api/v2/recorders/control/"
  params: []

# --- Resources (audio & video) ---
- id: api_v2_medias_modes
  label: /api/v2/medias/modes/
  kind: action
  command: "GET /api/v2/medias/modes/"
  params: []
- id: api_v2_medias_playlist
  label: /api/v2/medias/playlist/
  kind: action
  command: "GET /api/v2/medias/playlist/"
  params: []
- id: api_v2_medias_resources_list
  label: /api/v2/medias/resources-list/
  kind: action
  command: "GET /api/v2/medias/resources-list/"
  params: []
- id: api_v2_medias_resources_info
  label: /api/v2/medias/resources-info/
  kind: action
  command: "GET /api/v2/medias/resources-info/"
  params: []
- id: api_v2_medias_resources_check
  label: /api/v2/medias/resources-check/
  kind: action
  command: "GET /api/v2/medias/resources-check/"
  params: []
- id: api_v2_medias_resources_probe
  label: /api/v2/medias/resources-probe/
  kind: action
  command: "GET /api/v2/medias/resources-probe/"
  params: []
- id: api_v2_medias_resources_rename
  label: /api/v2/medias/resources-rename/
  kind: action
  command: "POST /api/v2/medias/resources-rename/"
  params: []
- id: api_v2_medias_resources_delete
  label: /api/v2/medias/resources-delete/
  kind: action
  command: "POST /api/v2/medias/resources-delete/"
  params: []
- id: api_v2_medias_branding
  label: /api/v2/medias/branding/
  kind: action
  command: "GET /api/v2/medias/branding/"
  params: []
- id: api_v2_medias_audio_tracks_list
  label: /api/v2/medias/audio/tracks/list/
  kind: action
  command: "GET /api/v2/medias/audio/tracks/list/"
  params: []
- id: api_v2_medias_audio_tracks_scan
  label: /api/v2/medias/audio/tracks/scan/
  kind: action
  command: "POST /api/v2/medias/audio/tracks/scan/"
  params: []
- id: api_v2_medias_audio_tracks_add
  label: /api/v2/medias/audio/tracks/add/
  kind: action
  command: "POST /api/v2/medias/audio/tracks/add/"
  params: []
- id: api_v2_medias_audio_tracks_edit
  label: /api/v2/medias/audio/tracks/edit/
  kind: action
  command: "POST /api/v2/medias/audio/tracks/edit/"
  params: []
- id: api_v2_medias_audio_tracks_delete
  label: /api/v2/medias/audio/tracks/delete/
  kind: action
  command: "POST /api/v2/medias/audio/tracks/delete/"
  params: []

# --- Resources routing rules ---
- id: api_v2_routing
  label: /api/v2/routing/
  kind: action
  command: "GET /api/v2/routing/"
  params: []
- id: api_v2_routing_get
  label: /api/v2/routing/get/
  kind: action
  command: "GET /api/v2/routing/get/"
  params: []
- id: api_v2_routing_add
  label: /api/v2/routing/add/
  kind: action
  command: "POST /api/v2/routing/add/"
  params: []
- id: api_v2_routing_edit
  label: /api/v2/routing/edit/
  kind: action
  command: "POST /api/v2/routing/edit/"
  params: []
- id: api_v2_routing_delete
  label: /api/v2/routing/delete/
  kind: action
  command: "POST /api/v2/routing/delete/"
  params: []

# --- Search ---
- id: api_v2_search
  label: /api/v2/search/
  kind: action
  command: "GET /api/v2/search/"
  params: []

# --- Server status ---
- id: api_time
  label: /api/time/
  kind: query
  command: "GET /api/time/"
  params: []
- id: api_v2  label: /api/v2/
  kind: query
  command: "GET /api/v2/"
  params: []
- id: api_v2_info
  label: /api/v2/info/
  kind: query
  command: "GET /api/v2/info/"
  params: []
- id: api_v2_error_report
  label: /api/v2/error-report/
  kind: action
  command: "POST /api/v2/error-report/"
  params: []

# --- Storage ---
- id: api_v2_storage
  label: /api/v2/storage/
  kind: action
  command: "GET /api/v2/storage/"
  params: []
- id: api_v2_storage_info
  label: /api/v2/storage/info/
  kind: action
  command: "GET /api/v2/storage/info/"
  params: []
- id: api_v2_storage_update
  label: /api/v2/storage/update/
  kind: action
  command: "POST /api/v2/storage/update/"
  params: []

# --- Statistics ---
- id: api_v2_stats_connections
  label: /api/v2/stats/connections/
  kind: query
  command: "GET /api/v2/stats/connections/"
  params: []
- id: api_v2_stats_viewers
  label: /api/v2/stats/viewers/
  kind: query
  command: "GET /api/v2/stats/viewers/"
  params: []
- id: api_v2_stats_global
  label: /api/v2/stats/global/
  kind: query
  command: "GET /api/v2/stats/global/"
  params: []
- id: api_v2_stats_channel
  label: /api/v2/stats/channel/
  kind: query
  command: "GET /api/v2/stats/channel/"
  params: []
- id: api_v2_stats_media
  label: /api/v2/stats/media/
  kind: query
  command: "GET /api/v2/stats/media/"
  params: []
- id: api_v2_stats_live
  label: /api/v2/stats/live/
  kind: query
  command: "GET /api/v2/stats/live/"
  params: []
- id: api_v2_stats_unwatched
  label: /api/v2/stats/unwatched/
  kind: query
  command: "GET /api/v2/stats/unwatched/"
  params: []
- id: api_v2_stats_categories
  label: /api/v2/stats/categories/
  kind: query
  command: "GET /api/v2/stats/categories/"
  params: []
- id: api_v2_stats_user
  label: /api/v2/stats/user/
  kind: query
  command: "GET /api/v2/stats/user/"
  params: []
- id: api_v2_stats_personal
  label: /api/v2/stats/personal/
  kind: query
  command: "GET /api/v2/stats/personal/"
  params: []
- id: api_v2_stats_personal_details
  label: /api/v2/stats/personal/details/
  kind: query
  command: "GET /api/v2/stats/personal/details/"
  params: []

# --- Subtitles ---
- id: api_v2_subtitles
  label: /api/v2/subtitles/
  kind: action
  command: "GET /api/v2/subtitles/"
  params: []
- id: api_v2_subtitles_add
  label: /api/v2/subtitles/add/
  kind: action
  command: "POST /api/v2/subtitles/add/"
  params: []
- id: api_v2_subtitles_edit
  label: /api/v2/subtitles/edit/
  kind: action
  command: "POST /api/v2/subtitles/edit/"
  params: []
- id: api_v2_subtitles_delete
  label: /api/v2/subtitles/delete/
  kind: action
  command: "POST /api/v2/subtitles/delete/"
  params: []

# --- Tasks on media ---
- id: api_v2_tasks
  label: /api/v2/tasks/
  kind: action
  command: "GET /api/v2/tasks/"
  params: []
- id: api_v2_tasks_start
  label: /api/v2/tasks/start/
  kind: action
  command: "POST /api/v2/tasks/start/"
  params: []
- id: api_v2_tasks_control
  label: /api/v2/tasks/control/
  kind: action
  command: "POST /api/v2/tasks/control/"
  params: []
- id: api_v2_tasks_priority
  label: /api/v2/tasks/priority/
  kind: action
  command: "POST /api/v2/tasks/priority/"
  params: []
- id: api_v2_tasks_progress
  label: /api/v2/tasks/progress/
  kind: query
  command: "GET /api/v2/tasks/progress/"
  params: []
- id: api_v2_tasks_trimming_child_init
  label: /api/v2/tasks/trimming-child-init/
  kind: action
  command: "POST /api/v2/tasks/trimming-child-init/"
  params: []
- id: api_v2_tasks_get_upload_config
  label: /api/v2/tasks/get-upload-config/
  kind: query
  command: "GET /api/v2/tasks/get-upload-config/"
  params: []
- id: api_v2_tasks_get_transcoding_config
  label: /api/v2/tasks/get-transcoding-config/
  kind: query
  command: "GET /api/v2/tasks/get-transcoding-config/"
  params: []
- id: api_v2_tasks_subtitles
  label: /api/v2/tasks/subtitles/
  kind: action
  command: "POST /api/v2/tasks/subtitles/"
  params: []
- id: api_v2_tasks_subtitles_json_schema
  label: /api/v2/tasks/subtitles/json-schema/
  kind: query
  command: "GET /api/v2/tasks/subtitles/json-schema/"
  params: []
- id: api_v2_tasks_enrichments
  label: /api/v2/tasks/enrichments/
  kind: action
  command: "POST /api/v2/tasks/enrichments/"
  params: []
- id: api_v2_tasks_enrichments_json_schema
  label: /api/v2/tasks/enrichments/json-schema/
  kind: query
  command: "GET /api/v2/tasks/enrichments/json-schema/"
  params: []
- id: api_v2_tasks_generative_tasks_callback
  label: /api/v2/tasks/generative-tasks-callback/
  kind: action
  command: "POST /api/v2/tasks/generative-tasks-callback/"
  params: []

# --- Uploads ---
- id: api_v2_upload
  label: /api/v2/upload/
  kind: action
  command: "POST /api/v2/upload/"
  params: []
- id: api_v2_upload_complete
  label: /api/v2/upload/complete/
  kind: action
  command: "POST /api/v2/upload/complete/"
  params: []
- id: api_v2_upload_hls
  label: /api/v2/upload/hls/
  kind: action
  command: "POST /api/v2/upload/hls/"
  params: []
- id: api_v2_upload_recover
  label: /api/v2/upload/recover/
  kind: action
  command: "POST /api/v2/upload/recover/"
  params: []

# --- Users ---
- id: api_v2_users
  label: /api/v2/users/
  kind: action
  command: "GET /api/v2/users/"
  params: []
- id: api_v2_users_get
  label: /api/v2/users/get/
  kind: action
  command: "GET /api/v2/users/get/"
  params: []
- id: api_v2_users_add
  label: /api/v2/users/add/
  kind: action
  command: "POST /api/v2/users/add/"
  params: []
- id: api_v2_users_edit
  label: /api/v2/users/edit/
  kind: action
  command: "POST /api/v2/users/edit/"
  params: []
- id: api_v2_users_notify
  label: /api/v2/users/notify/
  kind: action
  command: "POST /api/v2/users/notify/"
  params: []
- id: api_v2_users_delete
  label: /api/v2/users/delete/
  kind: action
  command: "POST /api/v2/users/delete/"
  params: []
- id: api_v2_users_me
  label: /api/v2/users/me/
  kind: query
  command: "GET /api/v2/users/me/"
  params: []
- id: api_v2_users_ldap_search
  label: /api/v2/users/ldap-search/
  kind: query
  command: "GET /api/v2/users/ldap-search/"
  params: []
- id: api_v2_users_import_csv
  label: /api/v2/users/import-csv/
  kind: action
  command: "POST /api/v2/users/import-csv/"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: refined source excerpt does not include response payload schemas.
# Per-endpoint response shape and observable-state fields cannot be enumerated from this excerpt.
```

## Variables
```yaml
# UNRESOLVED: refined source excerpt does not include request/response field schemas
# (per-endpoint parameter bodies live on the linked API HTML page, not in this excerpt).
```

## Events
```yaml
# UNRESOLVED: source mentions notifications endpoints (/api/v2/notifications/...) but does not
# describe the unsolicited-event format in the refined excerpt.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in the refined excerpt.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing present in source.
```

## Notes
Source is an HTTP/REST API for a media-server platform (videos, live streams, channels, annotations, users). Every endpoint in the documented table of contents has been enumerated as a distinct action. Per-endpoint request/response field schemas live on the linked `nudgis.demo.ubicast.eu/static/mediaserver/docs/api/api.html` page and are not present in this refined excerpt — they remain UNRESOLVED. Reference Python client:<https://github.com/UbiCastTeam/mediaserver-client>.

<!-- UNRESOLVED: per-endpoint request/response schemas not in refined excerpt; firmware version; default TCP/HTTP port (source uses path-based `/api/v2/` only, no port stated). -->

## Provenance

```yaml
source_domains:
  - nudgis.demo.ubicast.eu
  - github.com
source_urls:
  - https://nudgis.demo.ubicast.eu/static/mediaserver/docs/api/index.html
  - https://github.com/UbiCastTeam/mediaserver-client
retrieved_at: 2026-08-30T16:36:13.105Z
last_checked_at: 2026-08-30T22:17:55.473Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-30T22:17:55.473Z
matched_actions: 183
action_count: 183
confidence: medium
summary: "All 183 spec endpoint URLs appear verbatim in the source REST API table of contents; transport (HTTP, /api/v2 base, api-key header/query/body) is documented verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-endpoint request/response parameter schemas are not included in the refined source excerpt (the linked API HTML page was not extracted); each action below enumerates the path only and marks request/response fields as unresolved."
- "source does not describe discrete power/routing/level behavior."
- "per-endpoint request fields not in refined excerpt"
- "refined source excerpt does not include response payload schemas."
- "refined source excerpt does not include request/response field schemas"
- "source mentions notifications endpoints (/api/v2/notifications/...) but does not"
- "no multi-step sequences described in the refined excerpt."
- "no safety warnings, interlocks, or power-on sequencing present in source."
- "per-endpoint request/response schemas not in refined excerpt; firmware version; default TCP/HTTP port (source uses path-based `/api/v2/` only, no port stated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
