---
spec_id: admin/analog-way-pls-300
schema_version: ai4av-public-spec-v1
revision: 1
title: "Analog Way PLS 300 Control Spec"
manufacturer: "Analog Way"
model_family: "PLS 300"
aliases: []
compatible_with:
  manufacturers:
    - "Analog Way"
  models:
    - "PLS 300"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/Rest+API+Programmer%27s+Guide/midra4k_rest_api_programmers_guide_v3_0_13.pdf"
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LiveCore/Common/Programmer's+guide/livecore_tpp_commands_for_v04_02_23.zip"
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AWJ+Protocol/midra_4k_awj_programmers_guide_v3.2.pdf
retrieved_at: 2026-05-31T17:57:58.040Z
last_checked_at: 2026-05-31T20:54:04.554Z
generated_at: 2026-05-31T20:54:04.554Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact PLS 300 firmware version compatibility range not stated (doc references API v2.00.20+)"
  - "whether PLS 300 supports all endpoints or a subset of the Midra 4K API"
  - "default credentials not stated; source shows \"Admin\"/\"pass\" as example only"
  - "source does not define unsolicited event/push feedback; all state is polled via GET queries"
  - "no continuous variables (volume, gain, etc.) documented in source"
  - "no unsolicited notification mechanism documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "exact PLS 300 firmware version compatibility not stated"
  - "whether PLS 300 supports all Midra 4K endpoints (some may be QVU/QMX/EKS-only)"
  - "thumbnail URLs use /api/device/ path (different from /api/tpp/v1 control path) — base URL mapping unclear"
  - "no port number stated for HTTP server"
verification:
  verdict: verified
  checked_at: 2026-05-31T20:54:04.554Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions matched literally in source; transport parameters confirmed; bidirectional API coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-31
---

# Analog Way PLS 300 Control Spec

## Summary
REST API control spec for the Analog Way PLS 300 (Midra 4K family) presentation switcher. Provides HTTP-based control over screens, layers, presets, multiviewer, audio routing, auxiliary screens, and system management. Base path: `http://<ipaddress>/api/tpp/v1`.

<!-- UNRESOLVED: exact PLS 300 firmware version compatibility range not stated (doc references API v2.00.20+) -->
<!-- UNRESOLVED: whether PLS 300 supports all endpoints or a subset of the Midra 4K API -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://<ipaddress>/api/tpp/v1
auth:
  type: cookie
  description: >-
    POST /auth/login?identifier={id}&password={pwd} returns Set-Cookie header
    with auth-jwt token. Subsequent requests must include Cookie header with
    auth-jwt value. Returns 401 Unauthorized if Web RCS is password-protected
    and cookie is missing.
  # UNRESOLVED: default credentials not stated; source shows "Admin"/"pass" as example only
```

## Traits
```yaml
- powerable    # inferred: shutdown/wakeup/reboot commands present
- routable     # inferred: source routing for layers, audio, multiviewer widgets
- queryable    # inferred: extensive GET endpoints for reading state
```

## Actions
```yaml
- id: system_info_get
  label: Get System Information
  kind: query
  method: GET
  path: /api/tpp/v1/system
  params: []
  response:
    fields:
      - name: type
        type: string
        description: "Device type: QVU 4K, QMX 4K, PLS 4K, or EKS 4K"
      - name: label
        type: string
        description: Device label
      - name: version
        type: object
        description: Firmware version (major, minor, patch, beta)

- id: system_reboot
  label: Reboot System
  kind: action
  method: POST
  path: /api/tpp/v1/system/reboot
  params: []

- id: system_shutdown
  label: Shutdown System
  kind: action
  method: POST
  path: /api/tpp/v1/system/shutdown
  params:
    - name: standby
      type: boolean
      required: true
      description: "true to activate standby mode"

- id: system_wakeup
  label: Wake Up System
  kind: action
  method: POST
  path: /api/tpp/v1/system/wakeup
  params: []

- id: screen_info_get
  label: Get Screen Information
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
  response:
    fields:
      - name: isEnabled
        type: boolean
      - name: label
        type: string
      - name: layerMode
        type: string
        description: "mixing layers or split layers"

- id: screen_load_memory
  label: Recall Preset to Screen
  kind: action
  method: POST
  path: /api/tpp/v1/screens/{screenId}/load-memory
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: memoryId
      type: integer
      required: true
      description: "Memory index (1-200)"
    - name: target
      type: string
      required: false
      description: "program or preview. Default: preview"

- id: load_master_memory
  label: Recall Master Preset
  kind: action
  method: POST
  path: /api/tpp/v1/load-master-memory
  params:
    - name: memoryId
      type: integer
      required: true
      description: "Master memory index (1-50)"
    - name: target
      type: string
      required: false
      description: "program or preview. Default: preview"

- id: screen_live_layer_status_get
  label: Get Live Layer Status
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}/live-layers/{layerId}/presets/{target}
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: layerId
      type: integer
      in: path
      description: "Layer number (1-4)"
    - name: target
      type: string
      in: path
      description: "program or preview"
  response:
    fields:
      - name: status
        type: string
        description: "off, open, close, cross, flying, flying depth"
      - name: sourceType
        type: string
        description: "none, color, or input"
      - name: sourceId
        type: integer

- id: screen_live_layer_source_set
  label: Set Live Layer Source
  kind: action
  method: POST
  path: /api/tpp/v1/screens/{screenId}/live-layers/{layerId}/presets/{target}/source
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: layerId
      type: integer
      in: path
      description: "Layer number (1-4)"
    - name: target
      type: string
      in: path
      description: "program or preview"
    - name: sourceType
      type: string
      required: true
      description: "none, color, or input"
    - name: sourceId
      type: integer
      required: true
      description: Source number

- id: screen_background_layer_status_get
  label: Get Background Layer Status
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}/background-layer/presets/{target}
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: target
      type: string
      in: path
      description: "program or preview"
  response:
    fields:
      - name: status
        type: string
        description: "off, open, close"
      - name: sourceType
        type: string
        description: "background-set or none"
      - name: sourceId
        type: integer
        description: "Background set number (1-8)"

- id: screen_background_layer_source_set
  label: Set Background Layer Source
  kind: action
  method: POST
  path: /api/tpp/v1/screens/{screenId}/background-layer/presets/{target}/source
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: target
      type: string
      in: path
      description: "program or preview"
    - name: sourceType
      type: string
      required: true
      description: "background-set or none"
    - name: sourceId
      type: integer
      required: true
      description: "Background source number (1-8)"

- id: screen_foreground_layer_status_get
  label: Get Foreground Layer Status
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}/foreground-layer/presets/{target}
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: target
      type: string
      in: path
      description: "program or preview"
  response:
    fields:
      - name: status
        type: string
        description: "off, open, close"
      - name: sourceType
        type: string
        description: "foreground-image or none"
      - name: sourceId
        type: integer
        description: "Foreground preset number (1-4)"

- id: screen_foreground_layer_source_set
  label: Set Foreground Layer Source
  kind: action
  method: POST
  path: /api/tpp/v1/screens/{screenId}/foreground-layer/presets/{target}/source
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: target
      type: string
      in: path
      description: "program or preview"
    - name: sourceType
      type: string
      required: true
      description: "foreground-image or none"
    - name: sourceId
      type: integer
      required: true
      description: "Foreground source number (1-4)"

- id: screen_take
  label: Single TAKE (Screen)
  kind: action
  method: POST
  path: /api/tpp/v1/screens/{screenId}/take
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"

- id: global_take
  label: Global TAKE (Multiple Screens)
  kind: action
  method: POST
  path: /api/tpp/v1/take
  params:
    - name: screenIds
      type: array
      required: true
      description: List of screen indexes to transition
    - name: auxiliaryScreenIds
      type: array
      required: true
      description: List of auxiliary screen indexes to transition

- id: auxiliary_screen_info_get
  label: Get Auxiliary Screen Information
  kind: query
  method: GET
  path: /api/tpp/v1/auxiliary-screens/{auxId}
  params:
    - name: auxId
      type: integer
      in: path
      description: "Auxiliary screen number (always 1)"
  response:
    fields:
      - name: isEnabled
        type: boolean
      - name: label
        type: string

- id: auxiliary_screen_load_memory
  label: Recall Preset to Auxiliary Screen
  kind: action
  method: POST
  path: /api/tpp/v1/auxiliary-screens/{auxId}/load-memory
  params:
    - name: auxId
      type: integer
      in: path
      description: "Auxiliary screen number (always 1)"
    - name: memoryId
      type: integer
      required: true
      description: Memory index
    - name: target
      type: string
      required: false
      description: "program or preview. Default: preview"

- id: auxiliary_screen_source_get
  label: Get Auxiliary Screen Source
  kind: query
  method: GET
  path: /api/tpp/v1/auxiliary-screens/{auxId}/background-layer/presets/{target}/source
  params:
    - name: auxId
      type: integer
      in: path
      description: "Auxiliary screen number (always 1)"
    - name: target
      type: string
      in: path
      description: "program or preview"
  response:
    fields:
      - name: sourceType
        type: string
        description: "none, input, or screen"
      - name: sourceId
        type: integer

- id: auxiliary_screen_source_set
  label: Set Auxiliary Screen Source
  kind: action
  method: POST
  path: /api/tpp/v1/auxiliary-screens/{auxId}/background-layer/presets/{target}/source
  params:
    - name: auxId
      type: integer
      in: path
      description: "Auxiliary screen number (always 1)"
    - name: target
      type: string
      in: path
      description: "program or preview"
    - name: sourceType
      type: string
      required: true
      description: "none, input, or screen"
    - name: sourceId
      type: integer
      required: true
      description: "Source number (1 for screen, 1-10 for inputs)"

- id: auxiliary_screen_take
  label: TAKE (Auxiliary Screen)
  kind: action
  method: POST
  path: /api/tpp/v1/auxiliary-screens/{auxId}/take
  params:
    - name: auxId
      type: integer
      in: path
      description: "Auxiliary screen number (1-1)"

- id: multiviewer_info_get
  label: Get Multiviewer Output Information
  kind: query
  method: GET
  path: /api/tpp/v1/multiviewer/
  params: []
  response:
    fields:
      - name: isEnabled
        type: boolean
      - name: label
        type: string

- id: multiviewer_load_memory
  label: Recall Preset to Multiviewer
  kind: action
  method: POST
  path: /api/tpp/v1/multiviewer/load-memory
  params:
    - name: memoryId
      type: integer
      required: true
      description: "Memory index (1-20)"

- id: multiviewer_widget_source_get
  label: Get Multiviewer Widget Source
  kind: query
  method: GET
  path: /api/tpp/v1/multiviewer/widgets/{widgetId}/source
  params:
    - name: widgetId
      type: integer
      in: path
      description: "Widget number (1-16)"
  response:
    fields:
      - name: sourceType
        type: string
        description: "none, input, screen-program, screen-preview, or timer"
      - name: sourceId
        type: integer

- id: multiviewer_widget_status_get
  label: Get Multiviewer Widget Status
  kind: query
  method: GET
  path: /api/tpp/v1/multiviewer/widgets/{widgetId}
  params:
    - name: widgetId
      type: integer
      in: path
      description: "Widget number (1-16)"
  response:
    fields:
      - name: isEnabled
        type: boolean

- id: multiviewer_widget_source_set
  label: Set Multiviewer Widget Source
  kind: action
  method: POST
  path: /api/tpp/v1/multiviewer/widgets/{widgetId}/source
  params:
    - name: widgetId
      type: integer
      in: path
      description: "Widget number (1-16)"
    - name: sourceType
      type: string
      required: true
      description: "none, input, screen-program, screen-preview, or timer"
    - name: sourceId
      type: integer
      required: true
      description: Source number

- id: output_audio_mode_get
  label: Get Output Audio Mode
  kind: query
  method: GET
  path: /api/tpp/v1/outputs/{outputId}/audio/mode
  params:
    - name: outputId
      type: integer
      in: path
      description: "Output number (1 or 2)"
  response:
    fields:
      - name: mode
        type: string
        description: "none, auto, or direct routing"
      - name: sourceType
        type: string
        description: "none, input, custom, dante in, or line in (direct routing only)"
      - name: sourceId
        type: integer

- id: output_audio_mode_set
  label: Set Output Audio Mode
  kind: action
  method: POST
  path: /api/tpp/v1/outputs/{outputId}/audio/mode
  params:
    - name: outputId
      type: integer
      in: path
      description: "Output number (1 or 2)"
    - name: mode
      type: string
      required: true
      description: "none, auto, or direct routing"
    - name: sourceType
      type: string
      required: false
      description: "Mandatory for direct routing mode"
    - name: sourceId
      type: integer
      required: false
      description: "Mandatory for direct routing mode"

- id: output_audio_source_get
  label: Get Output Audio Source
  kind: query
  method: GET
  path: /api/tpp/v1/outputs/{outputId}/audio/source
  params:
    - name: outputId
      type: integer
      in: path
      description: "Output number (1 or 2)"
  response:
    fields:
      - name: sourceType
        type: string
        description: "none, input, custom, dante in, or line in"
      - name: sourceId
        type: integer

- id: screen_audio_mode_get
  label: Get Screen Audio Mode
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}/audio/mode
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
  response:
    fields:
      - name: mode
        type: string
        description: "direct routing, follow audio layer, or follow live layer content"
      - name: sourceType
        type: string
      - name: sourceId
        type: integer
      - name: layerId
        type: integer

- id: screen_audio_mode_set
  label: Set Screen Audio Mode
  kind: action
  method: POST
  path: /api/tpp/v1/screens/{screenId}/audio/mode
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1 or 2)"
    - name: mode
      type: string
      required: true
      description: "direct routing, follow audio layer, or follow live layer content"
    - name: layerId
      type: integer
      required: false
      description: "Mandatory for follow live layer content mode"

- id: screen_audio_preset_get
  label: Get Screen Audio Preset Status
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}/audio/presets/{presetId}
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: presetId
      type: string
      in: path
      description: "program or preview"
  response:
    fields:
      - name: target
        type: string
      - name: sourceType
        type: string
      - name: sourceId
        type: integer

- id: screen_audio_layer_source_get
  label: Get Screen Audio Layer Source
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}/audio-layer/presets/{presetId}/source
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: presetId
      type: string
      in: path
      description: "program or preview"
  response:
    fields:
      - name: sourceType
        type: string
        description: "none, input, custom, dante in, or line in"
      - name: sourceId
        type: integer

- id: screen_audio_layer_source_set
  label: Set Screen Audio Layer Source
  kind: action
  method: POST
  path: /api/tpp/v1/screens/{screenId}/audio-layer/presets/{presetId}/source
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1 or 2)"
    - name: presetId
      type: string
      in: path
      description: "program or preview"
    - name: sourceType
      type: string
      required: true
      description: "none, input, custom, dante in, or line in"
    - name: sourceId
      type: integer
      required: true

- id: aux_screen_audio_mode_get
  label: Get Auxiliary Screen Audio Mode
  kind: query
  method: GET
  path: /api/tpp/v1/auxiliary-screens/{auxScreenId}/audio/mode
  params:
    - name: auxScreenId
      type: integer
      in: path
      description: "Auxiliary screen number (always 1)"
  response:
    fields:
      - name: mode
        type: string
        description: "direct routing, follow audio layer, or follow content"
      - name: sourceType
        type: string
      - name: sourceId
        type: integer

- id: aux_screen_audio_mode_set
  label: Set Auxiliary Screen Audio Mode
  kind: action
  method: POST
  path: /api/tpp/v1/auxiliary-screens/{auxScreenId}/audio/mode
  params:
    - name: auxScreenId
      type: integer
      in: path
      description: "Auxiliary screen number (always 1)"
    - name: mode
      type: string
      required: true
      description: "direct routing, follow audio layer, or follow content"

- id: aux_screen_audio_preset_get
  label: Get Auxiliary Screen Audio Preset Status
  kind: query
  method: GET
  path: /api/tpp/v1/auxiliary-screens/{auxScreenId}/audio/presets/{presetId}
  params:
    - name: auxScreenId
      type: integer
      in: path
      description: "Auxiliary screen number (always 1)"
    - name: presetId
      type: string
      in: path
      description: "program or preview"
  response:
    fields:
      - name: target
        type: string
      - name: sourceType
        type: string
      - name: sourceId
        type: integer

- id: aux_screen_audio_layer_source_get
  label: Get Auxiliary Screen Audio Layer Source
  kind: query
  method: GET
  path: /api/tpp/v1/auxiliary-screens/{auxScreenId}/audio-layer/presets/{presetId}/source
  params:
    - name: auxScreenId
      type: integer
      in: path
      description: "Auxiliary screen number (always 1)"
    - name: presetId
      type: string
      in: path
      description: "program or preview"
  response:
    fields:
      - name: sourceType
        type: string
        description: "none, input, custom, dante in, or line in"
      - name: sourceId
        type: integer

- id: aux_screen_audio_layer_source_set
  label: Set Auxiliary Screen Audio Layer Source
  kind: action
  method: POST
  path: /api/tpp/v1/auxiliary-screens/{auxScreenId}/audio-layer/presets/{presetId}/source
  params:
    - name: auxScreenId
      type: integer
      in: path
      description: "Auxiliary screen number (always 1)"
    - name: presetId
      type: string
      in: path
      description: "program or preview"
    - name: sourceType
      type: string
      required: true
      description: "none, input, custom, dante in, or line in"
    - name: sourceId
      type: integer
      required: true

- id: dante_output_mode_get
  label: Get Dante Output Audio Mode
  kind: query
  method: GET
  path: /api/tpp/v1/dante/output-groups/{groupId}/mode
  params:
    - name: groupId
      type: integer
      in: path
      description: "Output group number (1-4)"
  response:
    fields:
      - name: mode
        type: string
        description: "direct routing or follow screen"
      - name: sourceType
        type: string
      - name: sourceId
        type: integer
      - name: screenId
        type: integer

- id: dante_output_mode_set
  label: Set Dante Output Audio Mode
  kind: action
  method: POST
  path: /api/tpp/v1/dante/output-groups/{groupId}/mode
  params:
    - name: groupId
      type: integer
      in: path
      description: "Output group number (1-4)"
    - name: mode
      type: string
      required: true
      description: "follow screen or direct routing"
    - name: screenId
      type: integer
      required: false
      description: "Mandatory for follow screen mode"

- id: dante_output_source_get
  label: Get Dante Output Audio Source
  kind: query
  method: GET
  path: /api/tpp/v1/dante/output-groups/{groupId}/source
  params:
    - name: groupId
      type: integer
      in: path
      description: "Output group number (1-4)"
  response:
    fields:
      - name: sourceType
        type: string
        description: "none, input, custom, dante in, or line in"
      - name: sourceId
        type: integer

- id: lineout_mode_get
  label: Get Line-Out Audio Mode
  kind: query
  method: GET
  path: /api/tpp/v1/line-outs/{outputId}/mode
  params:
    - name: outputId
      type: integer
      in: path
      description: "Line-out number (1-2)"
  response:
    fields:
      - name: mode
        type: string
        description: "direct routing or follow screen"
      - name: channelPair
        type: string
        description: "channels 1&2, channels 3&4, channels 5&6, or channels 7&8"
      - name: sourceType
        type: string
      - name: sourceId
        type: integer
      - name: screenId
        type: integer

- id: lineout_mode_set
  label: Set Line-Out Audio Mode
  kind: action
  method: POST
  path: /api/tpp/v1/line-outs/{outputId}/mode
  params:
    - name: outputId
      type: integer
      in: path
      description: "Line-out number (1-2)"
    - name: mode
      type: string
      required: true
      description: "follow screen or direct routing"
    - name: screenId
      type: integer
      required: false
      description: "Mandatory for follow screen mode"
    - name: channelPair
      type: string
      required: true
      description: "Audio channel pair"

- id: lineout_source_get
  label: Get Line-Out Audio Source
  kind: query
  method: GET
  path: /api/tpp/v1/line-outs/{outputId}/source
  params:
    - name: outputId
      type: integer
      in: path
      description: "Line-out number (1-2)"
  response:
    fields:
      - name: sourceType
        type: string
        description: "none, input, custom, dante in, or line in"
      - name: sourceId
        type: integer

- id: input_info_get
  label: Get Input Information
  kind: query
  method: GET
  path: /api/tpp/v1/inputs/{inputId}
  params:
    - name: inputId
      type: integer
      in: path
      description: "Input number (1-10)"
  response:
    fields:
      - name: isEnabled
        type: boolean
      - name: label
        type: string
      - name: plugType
        type: string
        description: "HDMI, DP, or SDI"
      - name: isValid
        type: boolean

- id: foreground_image_info_get
  label: Get Foreground Image Information
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}/foreground-images/{foregroundImageId}
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: foregroundImageId
      type: integer
      in: path
      description: "Image number (1-4)"
  response:
    fields:
      - name: isEmpty
        type: boolean
      - name: isValid
        type: boolean
      - name: label
        type: string
      - name: isEnabled
        type: boolean

- id: background_image_info_get
  label: Get Background Image Information
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}/background-images/{backgroundImageId}
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: backgroundImageId
      type: integer
      in: path
      description: "Image number (1-4)"
  response:
    fields:
      - name: isEmpty
        type: boolean
      - name: isValid
        type: boolean
      - name: label
        type: string
      - name: isEnabled
        type: boolean

- id: background_set_info_get
  label: Get Background Set Information
  kind: query
  method: GET
  path: /api/tpp/v1/screens/{screenId}/background-sets/{backgroundSetId}
  params:
    - name: screenId
      type: integer
      in: path
      description: "Screen number (1-2)"
    - name: backgroundSetId
      type: integer
      in: path
      description: "Background set number (1-8)"
  response:
    fields:
      - name: isEmpty
        type: boolean

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
      description: User identifier
    - name: password
      type: string
      in: query
      required: true
      description: User password
  response:
    fields:
      - name: Set-Cookie
        type: string
        description: auth-jwt token cookie for subsequent requests
```

## Feedbacks
```yaml
# UNRESOLVED: source does not define unsolicited event/push feedback; all state is polled via GET queries
```

## Variables
```yaml
# UNRESOLVED: no continuous variables (volume, gain, etc.) documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - system_reboot
  - system_shutdown
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- API is part of the Midra 4K family; the `system` endpoint returns device type including "PLS 4K".
- Thumbnails available at `/api/device/snapshots/` for inputs (1–10), outputs (1–2), foreground/background images, and multiviewer. PNG, 256×256 max. Refresh rate must not exceed 1 snapshot per second.
- Auth is optional — only required if Web RCS has been password-protected.
- All POST bodies are JSON (`Content-Type: application/json`).

<!-- UNRESOLVED: exact PLS 300 firmware version compatibility not stated -->
<!-- UNRESOLVED: whether PLS 300 supports all Midra 4K endpoints (some may be QVU/QMX/EKS-only) -->
<!-- UNRESOLVED: thumbnail URLs use /api/device/ path (different from /api/tpp/v1 control path) — base URL mapping unclear -->
<!-- UNRESOLVED: no port number stated for HTTP server -->

## Provenance

```yaml
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/Rest+API+Programmer%27s+Guide/midra4k_rest_api_programmers_guide_v3_0_13.pdf"
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LiveCore/Common/Programmer's+guide/livecore_tpp_commands_for_v04_02_23.zip"
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/Midra+4k/Common/AWJ+Protocol/midra_4k_awj_programmers_guide_v3.2.pdf
retrieved_at: 2026-05-31T17:57:58.040Z
last_checked_at: 2026-05-31T20:54:04.554Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T20:54:04.554Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions matched literally in source; transport parameters confirmed; bidirectional API coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact PLS 300 firmware version compatibility range not stated (doc references API v2.00.20+)"
- "whether PLS 300 supports all endpoints or a subset of the Midra 4K API"
- "default credentials not stated; source shows \"Admin\"/\"pass\" as example only"
- "source does not define unsolicited event/push feedback; all state is polled via GET queries"
- "no continuous variables (volume, gain, etc.) documented in source"
- "no unsolicited notification mechanism documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "exact PLS 300 firmware version compatibility not stated"
- "whether PLS 300 supports all Midra 4K endpoints (some may be QVU/QMX/EKS-only)"
- "thumbnail URLs use /api/device/ path (different from /api/tpp/v1 control path) — base URL mapping unclear"
- "no port number stated for HTTP server"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
