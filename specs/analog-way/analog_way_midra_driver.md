---
spec_id: admin/analog-way-midra-4k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Analog Way Midra 4K Control Spec"
manufacturer: "Analog Way"
model_family: "Midra 4K"
aliases: []
compatible_with:
  manufacturers:
    - "Analog Way"
  models:
    - "Midra 4K"
    - "QVU 4K"
    - "QMX 4K"
    - "PLS 4K"
    - "EKS 4K"
  firmware: ">= v2.00.20"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/Rest+API+Programmer%27s+Guide/midra4k_rest_api_programmers_guide_v3_0_13.pdf"
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AWJ+Protocol/midra_4k_awj_programmers_guide_v3.2.pdf
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AW+VideoCompositor+for+Midra+4k/Software+Packages+And+Drivers/Software/awvideocompositor_for_midra_4k_v1.3.zip
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AW+VideoCompositor+for+Midra+4k/Software+Packages+And+Drivers/Introduction+Documents/aw_videocompositor_for_midra_4k_introduction_v1.3.0.pdf
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AW+VideoCompositor+for+Midra+4k/Technical+Datasheet/aw-videocompositor-mdr4k-datasheet-en.pdf
retrieved_at: 2026-05-15T00:42:44.342Z
last_checked_at: 2026-05-15T21:12:41.796Z
generated_at: 2026-05-15T21:12:41.796Z
firmware_coverage: ">= v2.00.20"
protocol_coverage: []
known_gaps:
  - "HTTP port not stated in source; default assumed but not confirmed"
  - "source does not document unsolicited notifications or event subscriptions"
  - "source does not document multi-step macro sequences"
  - "source does not document power-on sequencing or interlock procedures"
  - "HTTP port number not stated in source"
  - "no event/webhook/subscription mechanism documented"
  - "no macro/preset sequencing documented beyond memory recall"
  - "thumbnail endpoints not fully enumerated as actions (read-only image resources)"
verification:
  verdict: verified
  checked_at: 2026-05-15T21:12:41.796Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions matched POST endpoints in source with identical paths and parameters; transport base URL and JWT auth verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Analog Way Midra 4K Control Spec

## Summary

The Analog Way Midra 4K is a multi-screen presentation switcher supporting up to 2 program screens, 1 auxiliary screen, and a multiviewer output. This spec covers the REST API control interface (HTTP GET/POST) at `/api/tpp/v1`. The device supports layer-based source routing (live layers 1-4, background, foreground), memory/preset recall, preview/program workflow with TAKE transitions, audio routing (direct, follow-layer, Dante, line-out), and multiviewer widget control. Authentication is optional and JWT-cookie-based when the Web RCS is password-protected.

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{ipaddress}/api/tpp/v1
  # UNRESOLVED: HTTP port not stated in source; default assumed but not confirmed
auth:
  type: cookie_jwt  # conditional: required only when Web RCS is password-protected
  description: >
    POST /auth/login?identifier={id}&password={pwd} returns Set-Cookie header
    with auth-jwt token. Subsequent requests must include Cookie header.
    Auth is optional - only enforced when Web RCS password protection is enabled.
```

## Traits
```yaml
- powerable    # inferred: shutdown/standby and wakeup commands present
- queryable    # inferred: extensive GET endpoints returning device state
- routable     # inferred: layer source routing, audio routing, multiviewer widget routing
```

## Actions
```yaml
# --- System ---
- id: system_reboot
  label: Reboot System
  kind: action
  method: POST
  path: /system/reboot
  params: []

- id: system_shutdown
  label: Shutdown / Standby
  kind: action
  method: POST
  path: /system/shutdown
  params:
    - name: standby
      type: boolean
      required: true
      description: "true to activate standby mode"

- id: system_wakeup
  label: Wake Up System
  kind: action
  method: POST
  path: /system/wakeup
  params: []

# --- Screen Memory ---
- id: screen_load_memory
  label: Recall Screen Memory
  kind: action
  method: POST
  path: /screens/{screenId}/load-memory
  params:
    - name: screenId
      type: integer
      in: url
      description: "Screen number (1-2)"
    - name: memoryId
      type: integer
      required: true
      description: "Memory index (1-200)"
    - name: target
      type: string
      required: false
      description: "Destination: 'program' or 'preview'. Default: 'preview'"

- id: load_master_memory
  label: Recall Master Memory
  kind: action
  method: POST
  path: /load-master-memory
  params:
    - name: memoryId
      type: integer
      required: true
      description: "Master memory index (1-50)"
    - name: target
      type: string
      required: false
      description: "Destination: 'program' or 'preview'. Default: 'preview'"

# --- Screen TAKE ---
- id: screen_take
  label: Single Screen TAKE
  kind: action
  method: POST
  path: /screens/{screenId}/take
  params:
    - name: screenId
      type: integer
      in: url
      description: "Screen number (1-2)"

- id: global_take
  label: Global TAKE
  kind: action
  method: POST
  path: /take
  params:
    - name: screenIds
      type: array
      required: true
      description: "List of screen indexes to transition"
    - name: auxiliaryScreenIds
      type: array
      required: true
      description: "List of auxiliary screen indexes to transition"

# --- Live Layer Source ---
- id: set_live_layer_source
  label: Set Live Layer Source
  kind: action
  method: POST
  path: /screens/{screenId}/live-layers/{layerId}/presets/{target}/source
  params:
    - name: screenId
      type: integer
      in: url
      description: "Screen number (1-2)"
    - name: layerId
      type: integer
      in: url
      description: "Layer number (1-4)"
    - name: target
      type: string
      in: url
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
      required: true
      description: "'none', 'color', or 'input'"
    - name: sourceId
      type: integer
      required: true
      description: "Source number"

# --- Background Layer Source ---
- id: set_background_layer_source
  label: Set Background Layer Source
  kind: action
  method: POST
  path: /screens/{screenId}/background-layer/presets/{target}/source
  params:
    - name: screenId
      type: integer
      in: url
      description: "Screen number (1-2)"
    - name: target
      type: string
      in: url
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
      required: true
      description: "'background-set' or 'none'"
    - name: sourceId
      type: integer
      required: true
      description: "Background set number (1-8)"

# --- Foreground Layer Source ---
- id: set_foreground_layer_source
  label: Set Foreground Layer Source
  kind: action
  method: POST
  path: /screens/{screenId}/foreground-layer/presets/{target}/source
  params:
    - name: screenId
      type: integer
      in: url
      description: "Screen number (1-2)"
    - name: target
      type: string
      in: url
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
      required: true
      description: "'foreground-image' or 'none'"
    - name: sourceId
      type: integer
      required: true
      description: "Foreground preset number (1-4)"

# --- Auxiliary Screen ---
- id: aux_screen_load_memory
  label: Recall Auxiliary Screen Memory
  kind: action
  method: POST
  path: /auxiliary-screens/{auxId}/load-memory
  params:
    - name: auxId
      type: integer
      in: url
      description: "Auxiliary screen number (always 1)"
    - name: memoryId
      type: integer
      required: true
      description: "Memory index"
    - name: target
      type: string
      required: false
      description: "'program' or 'preview'. Default: 'preview'"

- id: set_aux_screen_source
  label: Set Auxiliary Screen Source
  kind: action
  method: POST
  path: /auxiliary-screens/{auxId}/background-layer/presets/{target}/source
  params:
    - name: auxId
      type: integer
      in: url
      description: "Auxiliary screen number (always 1)"
    - name: target
      type: string
      in: url
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
      required: true
      description: "'none', 'input', or 'screen'"
    - name: sourceId
      type: integer
      required: true
      description: "Source number (1 for screen, 1-10 for inputs)"

- id: aux_screen_take
  label: Auxiliary Screen TAKE
  kind: action
  method: POST
  path: /auxiliary-screens/{auxId}/take
  params:
    - name: auxId
      type: integer
      in: url
      description: "Auxiliary screen number (1)"

# --- Multiviewer ---
- id: multiviewer_load_memory
  label: Recall Multiviewer Memory
  kind: action
  method: POST
  path: /multiviewer/load-memory
  params:
    - name: memoryId
      type: integer
      required: true
      description: "Memory index (1-20)"

- id: set_multiviewer_widget_source
  label: Set Multiviewer Widget Source
  kind: action
  method: POST
  path: /multiviewer/widgets/{widgetId}/source
  params:
    - name: widgetId
      type: integer
      in: url
      description: "Widget number (1-16)"
    - name: sourceType
      type: string
      required: true
      description: "'none', 'input', 'screen-program', 'screen-preview', or 'timer'"
    - name: sourceId
      type: integer
      required: true
      description: "Source number"

# --- Audio: Output ---
- id: set_output_audio_mode
  label: Set Output Audio Mode
  kind: action
  method: POST
  path: /outputs/{outputId}/audio/mode
  params:
    - name: outputId
      type: integer
      in: url
      description: "Output number (1 or 2)"
    - name: mode
      type: string
      required: true
      description: "'none', 'auto', or 'direct routing'"
    - name: sourceType
      type: string
      required: false
      description: "'none', 'input', 'custom', 'dante in', 'line in'. Required for 'direct routing'"
    - name: sourceId
      type: integer
      required: false
      description: "Audio source ID. Required for 'direct routing'"

# --- Audio: Screen ---
- id: set_screen_audio_mode
  label: Set Screen Audio Mode
  kind: action
  method: POST
  path: /screens/{screenId}/audio/mode
  params:
    - name: screenId
      type: integer
      in: url
      description: "Screen number (1 or 2)"
    - name: mode
      type: string
      required: true
      description: "'direct routing', 'follow audio layer', or 'follow live layer content'"
    - name: layerId
      type: integer
      required: false
      description: "Audio layer. Required for 'follow live layer content'"

- id: set_screen_audio_layer_source
  label: Set Screen Audio Layer Source
  kind: action
  method: POST
  path: /screens/{screenId}/audio-layer/presets/{presetId}/source
  params:
    - name: screenId
      type: integer
      in: url
      description: "Screen number (1 or 2)"
    - name: presetId
      type: string
      in: url
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
      required: true
      description: "'none', 'input', 'custom', 'dante in', 'line in'"
    - name: sourceId
      type: integer
      required: true
      description: "Audio source ID"

# --- Audio: Auxiliary Screen ---
- id: set_aux_screen_audio_mode
  label: Set Auxiliary Screen Audio Mode
  kind: action
  method: POST
  path: /auxiliary-screens/{auxScreenId}/audio/mode
  params:
    - name: auxScreenId
      type: integer
      in: url
      description: "Auxiliary screen number (always 1)"
    - name: mode
      type: string
      required: true
      description: "'direct routing', 'follow audio layer', or 'follow content'"
    - name: sourceType
      type: string
      required: false
      description: "Required for 'direct routing'"
    - name: sourceId
      type: integer
      required: false
      description: "Required for 'direct routing'"

- id: set_aux_screen_audio_layer_source
  label: Set Auxiliary Screen Audio Layer Source
  kind: action
  method: POST
  path: /auxiliary-screens/{auxScreenId}/audio-layer/presets/{presetId}/source
  params:
    - name: auxScreenId
      type: integer
      in: url
      description: "Auxiliary screen number (always 1)"
    - name: presetId
      type: string
      in: url
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
      required: true
      description: "'none', 'input', 'custom', 'dante in', 'line in'"
    - name: sourceId
      type: integer
      required: true
      description: "Audio source ID"

# --- Audio: Dante ---
- id: set_dante_output_mode
  label: Set Dante Output Mode
  kind: action
  method: POST
  path: /dante/output-groups/{groupId}/mode
  params:
    - name: groupId
      type: integer
      in: url
      description: "Output group number (1-4)"
    - name: mode
      type: string
      required: true
      description: "'follow screen' or 'direct routing'"
    - name: screenId
      type: integer
      required: false
      description: "Screen ID. Required for 'follow screen'"
    - name: sourceType
      type: string
      required: false
      description: "Required for 'direct routing'"
    - name: sourceId
      type: integer
      required: false
      description: "Required for 'direct routing'"

# --- Audio: Line-Out ---
- id: set_line_out_mode
  label: Set Line-Out Audio Mode
  kind: action
  method: POST
  path: /line-outs/{outputId}/mode
  params:
    - name: outputId
      type: integer
      in: url
      description: "Line-out output number (1-2)"
    - name: mode
      type: string
      required: true
      description: "'follow screen' or 'direct routing'"
    - name: channelPair
      type: string
      required: true
      description: "'channels 1&2', 'channels 3&4', 'channels 5&6', 'channels 7&8'"
    - name: screenId
      type: integer
      required: false
      description: "Required for 'follow screen'"
    - name: sourceType
      type: string
      required: false
      description: "Required for 'direct routing'"
    - name: sourceId
      type: integer
      required: false
      description: "Required for 'direct routing'"

# --- Auth ---
- id: auth_login
  label: Authenticate
  kind: action
  method: POST
  path: /auth/login
  params:
    - name: identifier
      type: string
      in: query
      required: true
      description: "User identifier (e.g. 'Admin')"
    - name: password
      type: string
      in: query
      required: true
      description: "User password"
  response:
    description: "Set-Cookie header with auth-jwt token; include in subsequent requests"
```

## Feedbacks
```yaml
- id: system_info
  label: System Information
  type: object
  method: GET
  path: /system
  fields:
    - name: type
      type: string
      description: "Device type: 'QVU 4K', 'QMX 4K', 'PLS 4K', 'EKS 4K'"
    - name: label
      type: string
      description: "Device label"
    - name: version
      type: object
      description: "Firmware version object {major, minor, patch, beta}"

- id: screen_info
  label: Screen Information
  type: object
  method: GET
  path: /screens/{screenId}
  fields:
    - name: isEnabled
      type: boolean
      description: "Screen enabled state"
    - name: label
      type: string
      description: "Screen label"
    - name: layerMode
      type: string
      description: "'mixing layers' or 'split layers'"

- id: live_layer_status
  label: Live Layer Status
  type: object
  method: GET
  path: /screens/{screenId}/live-layers/{layerId}/presets/{target}
  fields:
    - name: status
      type: string
      description: "'off', 'open', 'close', 'cross', 'flying', 'flying depth'"
    - name: sourceType
      type: string
      description: "'none', 'color', or 'input'"
    - name: sourceId
      type: integer
      description: "Source number"

- id: background_layer_status
  label: Background Layer Status
  type: object
  method: GET
  path: /screens/{screenId}/background-layer/presets/{target}
  fields:
    - name: status
      type: string
      description: "'off', 'open', 'close'"
    - name: sourceType
      type: string
      description: "'background-set' or 'none'"
    - name: sourceId
      type: integer
      description: "Background set number (1-8)"

- id: foreground_layer_status
  label: Foreground Layer Status
  type: object
  method: GET
  path: /screens/{screenId}/foreground-layer/presets/{target}
  fields:
    - name: status
      type: string
      description: "'off', 'open', 'close'"
    - name: sourceType
      type: string
      description: "'foreground-image' or 'none'"
    - name: sourceId
      type: integer
      description: "Foreground preset number (1-4)"

- id: aux_screen_info
  label: Auxiliary Screen Information
  type: object
  method: GET
  path: /auxiliary-screens/{auxId}
  fields:
    - name: isEnabled
      type: boolean
    - name: label
      type: string

- id: aux_screen_source
  label: Auxiliary Screen Source
  type: object
  method: GET
  path: /auxiliary-screens/{auxId}/background-layer/presets/{target}/source
  fields:
    - name: sourceType
      type: string
      description: "'none', 'input', or 'screen'"
    - name: sourceId
      type: integer

- id: multiviewer_info
  label: Multiviewer Output Information
  type: object
  method: GET
  path: /multiviewer/
  fields:
    - name: isEnabled
      type: boolean
    - name: label
      type: string

- id: multiviewer_widget_status
  label: Multiviewer Widget Status
  type: object
  method: GET
  path: /multiviewer/widgets/{widgetId}
  fields:
    - name: isEnabled
      type: boolean

- id: multiviewer_widget_source
  label: Multiviewer Widget Source
  type: object
  method: GET
  path: /multiviewer/widgets/{widgetId}/source
  fields:
    - name: sourceType
      type: string
      description: "'none', 'input', 'screen-program', 'screen-preview', or 'timer'"
    - name: sourceId
      type: integer

- id: output_audio_mode
  label: Output Audio Mode
  type: object
  method: GET
  path: /outputs/{outputId}/audio/mode
  fields:
    - name: mode
      type: string
      description: "'none', 'auto', or 'direct routing'"
    - name: sourceType
      type: string
      description: "'none', 'input', 'custom', 'dante in', 'line in' (direct routing only)"
    - name: sourceId
      type: integer

- id: output_audio_source
  label: Output Audio Source
  type: object
  method: GET
  path: /outputs/{outputId}/audio/source
  fields:
    - name: sourceType
      type: string
    - name: sourceId
      type: integer

- id: screen_audio_mode
  label: Screen Audio Mode
  type: object
  method: GET
  path: /screens/{screenId}/audio/mode
  fields:
    - name: mode
      type: string
      description: "'direct routing', 'follow audio layer', 'follow live layer content'"
    - name: sourceType
      type: string
    - name: sourceId
      type: integer
    - name: layerId
      type: integer

- id: screen_audio_preset
  label: Screen Audio Preset
  type: object
  method: GET
  path: /screens/{screenId}/audio/presets/{presetId}
  fields:
    - name: target
      type: string
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
    - name: sourceId
      type: integer

- id: screen_audio_layer_source
  label: Screen Audio Layer Source
  type: object
  method: GET
  path: /screens/{screenId}/audio-layer/presets/{presetId}/source
  fields:
    - name: sourceType
      type: string
    - name: sourceId
      type: integer

- id: aux_screen_audio_mode
  label: Auxiliary Screen Audio Mode
  type: object
  method: GET
  path: /auxiliary-screens/{auxScreenId}/audio/mode
  fields:
    - name: mode
      type: string
      description: "'direct routing', 'follow audio layer', 'follow content'"
    - name: sourceType
      type: string
    - name: sourceId
      type: integer

- id: aux_screen_audio_preset
  label: Auxiliary Screen Audio Preset
  type: object
  method: GET
  path: /auxiliary-screens/{auxScreenId}/audio/presets/{presetId}
  fields:
    - name: target
      type: string
    - name: sourceType
      type: string
    - name: sourceId
      type: integer

- id: aux_screen_audio_layer_source
  label: Auxiliary Screen Audio Layer Source
  type: object
  method: GET
  path: /auxiliary-screens/{auxScreenId}/audio-layer/presets/{presetId}/source
  fields:
    - name: sourceType
      type: string
    - name: sourceId
      type: integer

- id: dante_output_mode
  label: Dante Output Audio Mode
  type: object
  method: GET
  path: /dante/output-groups/{groupId}/mode
  fields:
    - name: mode
      type: string
      description: "'direct routing' or 'follow screen'"
    - name: sourceType
      type: string
    - name: sourceId
      type: integer
    - name: screenId
      type: integer

- id: dante_output_source
  label: Dante Output Audio Source
  type: object
  method: GET
  path: /dante/output-groups/{groupId}/source
  fields:
    - name: sourceType
      type: string
    - name: sourceId
      type: integer

- id: line_out_mode
  label: Line-Out Audio Mode
  type: object
  method: GET
  path: /line-outs/{outputId}/mode
  fields:
    - name: mode
      type: string
      description: "'direct routing' or 'follow screen'"
    - name: channelPair
      type: string
      description: "'channels 1&2', 'channels 3&4', 'channels 5&6', 'channels 7&8'"
    - name: sourceType
      type: string
    - name: sourceId
      type: integer
    - name: screenId
      type: integer

- id: line_out_source
  label: Line-Out Audio Source
  type: object
  method: GET
  path: /line-outs/{outputId}/source
  fields:
    - name: sourceType
      type: string
    - name: sourceId
      type: integer

- id: input_info
  label: Input Information
  type: object
  method: GET
  path: /inputs/{inputId}
  fields:
    - name: isEnabled
      type: boolean
    - name: label
      type: string
    - name: plugType
      type: string
      description: "'HDMI', 'DP', or 'SDI'"
    - name: isValid
      type: boolean
      description: "Input signal validity"

- id: foreground_image_info
  label: Foreground Image Information
  type: object
  method: GET
  path: /screens/{screenId}/foreground-images/{foregroundImageId}
  fields:
    - name: isEmpty
      type: boolean
    - name: isValid
      type: boolean
    - name: label
      type: string
    - name: isEnabled
      type: boolean

- id: background_image_info
  label: Background Image Information
  type: object
  method: GET
  path: /screens/{screenId}/background-images/{backgroundImageId}
  fields:
    - name: isEmpty
      type: boolean
    - name: isValid
      type: boolean
    - name: label
      type: string
    - name: isEnabled
      type: boolean

- id: background_set_info
  label: Background Set Information
  type: object
  method: GET
  path: /screens/{screenId}/background-sets/{backgroundSetId}
  fields:
    - name: isEmpty
      type: boolean
```

## Variables
```yaml
# No settable continuous variables documented - all control is via discrete actions.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications or event subscriptions
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - system_reboot
  - system_shutdown
interlocks: []
# Reboot and shutdown are destructive operations with no undo.
# UNRESOLVED: source does not document power-on sequencing or interlock procedures
```

## Notes

- All API endpoints are relative to `http://{ipaddress}/api/tpp/v1` except `/auth/login`.
- Thumbnail snapshots available at `http://{ipaddress}/api/device/snapshots/` for inputs (1-10), outputs (1-2), foreground/background images, and multiviewer. Max rate: 1 request/second. 256x256 PNG.
- The `target` parameter (program/preview) and TAKE workflow enables a preview-before-program pipeline.
- `sourceType` and `sourceId` are conditionally required depending on the audio `mode` value — see per-action param descriptions.
- Auth is optional and only enforced when the device's Web RCS has been password-protected by configuration.

<!-- UNRESOLVED: HTTP port number not stated in source -->
<!-- UNRESOLVED: no event/webhook/subscription mechanism documented -->
<!-- UNRESOLVED: no macro/preset sequencing documented beyond memory recall -->
<!-- UNRESOLVED: thumbnail endpoints not fully enumerated as actions (read-only image resources) -->

## Provenance

```yaml
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/Rest+API+Programmer%27s+Guide/midra4k_rest_api_programmers_guide_v3_0_13.pdf"
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AWJ+Protocol/midra_4k_awj_programmers_guide_v3.2.pdf
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AW+VideoCompositor+for+Midra+4k/Software+Packages+And+Drivers/Software/awvideocompositor_for_midra_4k_v1.3.zip
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AW+VideoCompositor+for+Midra+4k/Software+Packages+And+Drivers/Introduction+Documents/aw_videocompositor_for_midra_4k_introduction_v1.3.0.pdf
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AW+VideoCompositor+for+Midra+4k/Technical+Datasheet/aw-videocompositor-mdr4k-datasheet-en.pdf
retrieved_at: 2026-05-15T00:42:44.342Z
last_checked_at: 2026-05-15T21:12:41.796Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-15T21:12:41.796Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions matched POST endpoints in source with identical paths and parameters; transport base URL and JWT auth verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP port not stated in source; default assumed but not confirmed"
- "source does not document unsolicited notifications or event subscriptions"
- "source does not document multi-step macro sequences"
- "source does not document power-on sequencing or interlock procedures"
- "HTTP port number not stated in source"
- "no event/webhook/subscription mechanism documented"
- "no macro/preset sequencing documented beyond memory recall"
- "thumbnail endpoints not fully enumerated as actions (read-only image resources)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
