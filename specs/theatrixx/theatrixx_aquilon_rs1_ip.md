---
spec_id: admin/theatrixx-aquilon-rs1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Theatrixx Aquilon RS1 Control Spec"
manufacturer: Theatrixx
model_family: "AQL RS1"
aliases: []
compatible_with:
  manufacturers:
    - Theatrixx
  models:
    - "AQL RS1"
  firmware: "\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/Rest+API+Programmer's+Guide/livepremier_rest_api_programmers_guide_v4.1.pdf"
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/AWJ+Protocol/livepremier_awj_programmers_guide_v2.4.pdf
retrieved_at: 2026-06-30T05:35:27.810Z
last_checked_at: 2026-06-30T07:14:27.811Z
generated_at: 2026-06-30T07:14:27.811Z
firmware_coverage: "\""
protocol_coverage: []
known_gaps:
  - "HTTP TCP port not numerically stated (only `http://<ipaddress>/...` given). Device input/output counts vary by configuration; ranges quoted from source."
  - "HTTP port not numerically stated in source"
  - "no continuous settable parameter documented in this source."
  - "no event subscription / webhook / keepalive channel described."
  - "no explicit multi-step macro/preset-sequence described in source."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "HTTP port not numerically stated."
  - "device firmware compatibility version not pinned (only API doc version \"v4.0 or higher\")."
  - "no event/feedback push channel documented."
  - "no explicit safety/interlock text in source."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:14:27.811Z
  matched_actions: 65
  action_count: 65
  confidence: medium
  summary: "All 65 spec actions have verbatim endpoint matches in the source; transport base URL, WoL UDP port 9, and auth cookie mechanism all confirmed; source documents exactly these 65 endpoints with no uncovered functional commands. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Theatrixx Aquilon RS1 Control Spec

## Summary
Theatrixx Aquilon RS1 (LivePremier™ "AQL RS1") is a multi-window presentation processor / screen controller. This spec covers its HTTP/REST control API (base `/api/tpp/v1`) plus the Wake-on-LAN UDP wake mechanism. Control spans system power, per-screen and auxiliary-screen layer/source routing, preset recall, single/global TAKE transitions, multiviewer widgets, and Dante/analog audio routing & mute.

<!-- UNRESOLVED: HTTP TCP port not numerically stated (only `http://<ipaddress>/...` given). Device input/output counts vary by configuration; ranges quoted from source. -->

## Transport
```yaml
protocols:
  - http
  - udp  # Wake-on-LAN magic packet only
addressing:
  base_url: "http://<ipaddress>/api/tpp/v1"
  port: null  # UNRESOLVED: HTTP port not numerically stated in source
udp:
  port: 9  # Wake-on-LAN magic packet UDP broadcast (Discard port), stated verbatim in source §9.4
auth:
  type: cookie  # conditional: JWT cookie (`auth-jwt`) required only when the Web RCS is password-protected (§10). Login: POST /auth/login?identifier={id}&password={pwd}
```

## Traits
```yaml
traits:
  - powerable  # inferred: reboot / shutdown (with WoL) / wake-on-LAN commands present (§2.2, 2.3, 9)
  - routable  # inferred: layer/background/widget/audio source routing commands present (§3.7, 3.9, 4.5, 5.5, 6.3.8, 6.4.8, 6.5.8)
  - queryable  # inferred: extensive GET status/info queries present (§2.1, 3.1, 3.5, 3.6, etc.)
```

## Actions
```yaml
# All HTTP commands are "METHOD <path>" against base_url http://<ipaddress>/api/tpp/v1.
# Path params ({screenId}, {layerId}, ...) are URL path variables; body params are JSON keys.
# Source notes: POSTs require Content-Type: application/json + correct Content-Length; line
# breaks in payloads must be trimmed. CR=0x0D LF=0x0A terminate raw HTTP requests.

# ---- System (§2) ----
- id: read_system
  label: Read System Information
  kind: query
  command: "GET /api/tpp/v1/system"
  params: []

- id: system_reboot
  label: Reboot System
  kind: action
  command: "POST /api/tpp/v1/system/reboot"
  params: []

- id: system_shutdown
  label: Shutdown System
  kind: action
  command: "POST /api/tpp/v1/system/shutdown"
  params:
    - name: enableWakeOnLAN
      type: boolean
      optional: true
      description: "true to shut down with Wake-on-LAN enabled; default false (§2.3)"
  body_template: '{"enableWakeOnLAN": false}'

- id: wake_on_lan
  label: Wake on LAN (Magic Packet)
  kind: action
  command: "UDP broadcast port 9: 0xFF 0xFF 0xFF 0xFF 0xFF 0xFF + 16 × [MAC 6 bytes] (102 bytes total)"
  params:
    - name: mac_address
      type: string
      description: "Target NIC MAC address (e.g. 00:25:90:3D:11:4A). Retrieve via front panel CONTROL -> Network (§9.3)"

# ---- Screens (§3) ----
- id: read_screen
  label: Read Screen Information
  kind: query
  command: "GET /api/tpp/v1/screens/{screenId}"
  params:
    - name: screenId
      type: integer
      description: "screen number (1 to 24)"

- id: screen_load_memory
  label: Recall Preset to Screen
  kind: action
  command: "POST /api/tpp/v1/screens/{screenId}/load-memory"
  params:
    - name: screenId
      type: integer
      description: "screen number (1 to 24)"
    - name: memoryId
      type: integer
      description: "memory index (1 to 1000)"
    - name: target
      type: string
      optional: true
      description: '"program" or "preview"; default "preview"'
  body_template: '{"memoryId": 30, "target": "preview"}'

- id: load_master_memory
  label: Recall Master Preset
  kind: action
  command: "POST /api/tpp/v1/load-master-memory"
  params:
    - name: memoryId
      type: integer
      description: "master memory index (1 to 500)"
    - name: target
      type: string
      optional: true
      description: '"program" or "preview"; default "preview"'
  body_template: '{"memoryId": 10, "target": "preview"}'

- id: read_layer_info
  label: Read Layer Information
  kind: query
  command: "GET /api/tpp/v1/screens/{screenId}/layers/{layerId}"
  params:
    - name: screenId
      type: integer
      description: "screen number (1 to 24)"
    - name: layerId
      type: integer
      description: "layer number (1 to 128)"

- id: read_layer_status
  label: Read Layer Status
  kind: query
  command: "GET /api/tpp/v1/screens/{screenId}/layers/{layerId}/presets/{target}"
  params:
    - name: screenId
      type: integer
      description: "screen number (1 to 24)"
    - name: layerId
      type: integer
      description: "layer number (1 to 128)"
    - name: target
      type: string
      description: '"program" or "preview"'

- id: set_layer_source
  label: Set Layer Source
  kind: action
  command: "POST /api/tpp/v1/screens/{screenId}/layers/{layerId}/presets/{target}/source"
  params:
    - name: screenId
      type: integer
      description: "screen number (1 to 24)"
    - name: layerId
      type: integer
      description: "layer number (1 to 128)"
    - name: target
      type: string
      description: '"program" or "preview"'
    - name: sourceType
      type: string
      description: '"none", "color", "input", "image" or "screen"'
    - name: sourceId
      type: integer
      optional: true
      description: "source number"
  body_template: '{"sourceType": "input", "sourceId": 3}'

- id: read_background_layer_status
  label: Read Background Layer Status
  kind: query
  command: "GET /api/tpp/v1/screens/{screenId}/background-layer/presets/{target}"
  params:
    - name: screenId
      type: integer
      description: "screen number (1 to 24)"
    - name: target
      type: string
      description: '"program" or "preview"'

- id: set_background_layer_source
  label: Set Background Layer Source
  kind: action
  command: "POST /api/tpp/v1/screens/{screenId}/background-layer/presets/{target}/source"
  params:
    - name: screenId
      type: integer
      description: "screen number (1 to 24)"
    - name: target
      type: string
      description: '"program" or "preview"'
    - name: sourceType
      type: string
      description: '"background-set" or "none"'
    - name: sourceId
      type: integer
      optional: true
      description: "background source number (1 to 8)"
  body_template: '{"sourceType": "background-set", "sourceId": 8}'

- id: screen_take
  label: Single TAKE (Screen)
  kind: action
  command: "POST /api/tpp/v1/screens/{screenId}/take"
  params:
    - name: screenId
      type: integer
      description: "screen number (1 to 24)"

- id: global_take
  label: Global TAKE (Multiple Screens)
  kind: action
  command: "POST /api/tpp/v1/take"
  params:
    - name: screenIds
      type: list
      optional: true
      description: "list of screen indexes to transition"
    - name: auxiliaryScreenIds
      type: list
      optional: true
      description: "list of auxiliary screen indexes to transition"
  body_template: '{"screenIds": [1, 3], "auxiliaryScreenIds": [5]}'

# ---- Auxiliary screens (§4) ----
- id: read_aux_screen
  label: Read Auxiliary Screen Information
  kind: query
  command: "GET /api/tpp/v1/auxiliary-screens/{auxId}"
  params:
    - name: auxId
      type: integer
      description: "auxiliary screen number (1 to 96)"

- id: aux_screen_load_memory
  label: Recall Preset to Auxiliary Screen
  kind: action
  command: "POST /api/tpp/v1/auxiliary-screens/{auxId}/load-memory"
  params:
    - name: auxId
      type: integer
      description: "auxiliary screen number (1 to 96)"
    - name: memoryId
      type: integer
      description: "memory index"
    - name: target
      type: string
      optional: true
      description: '"program" or "preview"; default "preview"'
  body_template: '{"memoryId": 5}'

- id: read_aux_layer_capacity
  label: Read Auxiliary Screen Layer Capacity
  kind: query
  command: "GET /api/tpp/v1/auxiliary-screens/{auxId}/layers/{layerId}"
  params:
    - name: auxId
      type: integer
      description: "auxiliary screen number (1 to 96)"
    - name: layerId
      type: integer
      description: "layer number (1 to 8)"

- id: read_aux_layer_source
  label: Read Auxiliary Screen Layer Source
  kind: query
  command: "GET /api/tpp/v1/auxiliary-screens/{auxId}/layers/{layerId}/presets/{target}/source"
  params:
    - name: auxId
      type: integer
      description: "auxiliary screen number (1 to 96)"
    - name: layerId
      type: integer
      description: "layer number (1 to 8)"
    - name: target
      type: string
      description: '"program" or "preview"'

- id: set_aux_layer_source
  label: Set Auxiliary Screen Layer Source
  kind: action
  command: "POST /api/tpp/v1/auxiliary-screens/{auxId}/layers/{layerId}/presets/{target}/source"
  params:
    - name: auxId
      type: integer
      description: "auxiliary screen number (1 to 96)"
    - name: layerId
      type: integer
      description: "layer number (1 to 8)"
    - name: target
      type: string
      description: '"program" or "preview"'
    - name: sourceType
      type: string
      description: '"none", "input", "image" or "screen"'
    - name: sourceId
      type: integer
      optional: true
      description: "source number"
  body_template: '{"sourceType": "image", "sourceId": 24}'

- id: aux_screen_take
  label: TAKE (Auxiliary Screen)
  kind: action
  command: "POST /api/tpp/v1/auxiliary-screens/{auxId}/take"
  params:
    - name: auxId
      type: integer
      description: "auxiliary screen number (1 to 96)"

# ---- Multiviewers (§5) ----
- id: read_multiviewer
  label: Read Multiviewer Output Information
  kind: query
  command: "GET /api/tpp/v1/multiviewers/{mvwId}"
  params:
    - name: mvwId
      type: integer
      description: "multiviewer output number (1 to 8)"

- id: multiviewer_load_memory
  label: Recall Preset to Multiviewer Output
  kind: action
  command: "POST /api/tpp/v1/multiviewers/{mvwId}/load-memory"
  params:
    - name: mvwId
      type: integer
      description: "multiviewer output number (1 to 8)"
    - name: memoryId
      type: integer
      description: "memory index (1 to 50)"
  body_template: '{"memoryId": 20}'

- id: read_widget_source
  label: Read Multiviewer Widget Source
  kind: query
  command: "GET /api/tpp/v1/multiviewers/{mvwId}/widgets/{widgetId}/source"
  params:
    - name: mvwId
      type: integer
      description: "multiviewer output number (1 to 8)"
    - name: widgetId
      type: integer
      description: "widget number (1 to 64)"

- id: read_widget_status
  label: Read Multiviewer Widget Status
  kind: query
  command: "GET /api/tpp/v1/multiviewers/{mvwId}/widgets/{widgetId}"
  params:
    - name: mvwId
      type: integer
      description: "multiviewer output number (1 to 8)"
    - name: widgetId
      type: integer
      description: "widget number (1 to 64)"

- id: set_widget_source
  label: Set Multiviewer Widget Source
  kind: action
  command: "POST /api/tpp/v1/multiviewers/{mvwId}/widgets/{widgetId}/source"
  params:
    - name: mvwId
      type: integer
      description: "multiviewer output number (1 to 8)"
    - name: widgetId
      type: integer
      description: "widget number (1 to 64)"
    - name: sourceType
      type: string
      description: '"none", "input", "image", "screen-program", "screen-preview", "auxiliary-screen-program" or "timer"'
    - name: sourceId
      type: integer
      optional: true
      description: "source number"
  body_template: '{"sourceType": "input", "sourceId": 7}'

# ---- Audio inputs (§6.1) ----
- id: read_input_audio_channels
  label: Read Input Audio Channels
  kind: query
  command: "GET /api/tpp/v1/audio/receivers/inputs/{inputId}/channels"
  params:
    - name: inputId
      type: integer
      description: "input number"

- id: mute_input_audio_all
  label: Mute All Input Audio Channels
  kind: action
  command: "POST /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/mute"
  params:
    - name: inputId
      type: integer
      description: "input number"

- id: unmute_input_audio_all
  label: Unmute All Input Audio Channels
  kind: action
  command: "POST /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/unmute"
  params:
    - name: inputId
      type: integer
      description: "input number"

- id: read_input_audio_channel
  label: Read Input Audio Channel
  kind: query
  command: "GET /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/{channelId}"
  params:
    - name: inputId
      type: integer
      description: "input number"
    - name: channelId
      type: integer
      description: "input audio channel number"

- id: mute_input_audio_channel
  label: Mute Input Audio Channel
  kind: action
  command: "POST /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/{channelId}/mute"
  params:
    - name: inputId
      type: integer
      description: "input number"
    - name: channelId
      type: integer
      description: "input audio channel number"

- id: unmute_input_audio_channel
  label: Unmute Input Audio Channel
  kind: action
  command: "POST /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/{channelId}/unmute"
  params:
    - name: inputId
      type: integer
      description: "input number"
    - name: channelId
      type: integer
      description: "input audio channel number"

# ---- Audio Rx Dante (§6.2) ----
- id: read_rxdante_channels
  label: Read Rx Dante Channels
  kind: query
  command: "GET /api/tpp/v1/audio/receivers/dante/channels"
  params: []

- id: mute_rxdante_all
  label: Mute All Rx Dante Channels
  kind: action
  command: "POST /api/tpp/v1/audio/receivers/dante/channels/mute"
  params: []

- id: unmute_rxdante_all
  label: Unmute All Rx Dante Channels
  kind: action
  command: "POST /api/tpp/v1/audio/receivers/dante/channels/unmute"
  params: []

- id: read_rxdante_channel
  label: Read Rx Dante Channel
  kind: query
  command: "GET /api/tpp/v1/audio/receivers/dante/channels/{channelId}"
  params:
    - name: channelId
      type: integer
      description: "Rx Dante channel number (1 to 256)"

- id: mute_rxdante_channel
  label: Mute Rx Dante Channel
  kind: action
  command: "POST /api/tpp/v1/audio/receivers/dante/channels/{channelId}/mute"
  params:
    - name: channelId
      type: integer
      description: "Rx Dante channel number"

  # NOTE: source §6.2.5 documents the path as "channels/{channelId}mute" (missing slash) in
  # the signature table; the worked example uses "channels/32/mute". Implementations should
  # follow the worked-example form.

- id: unmute_rxdante_channel
  label: Unmute Rx Dante Channel
  kind: action
  command: "POST /api/tpp/v1/audio/receivers/dante/channels/{channelId}/unmute"
  params:
    - name: channelId
      type: integer
      description: "Rx Dante channel number"

# ---- Audio outputs (§6.3) ----
- id: read_output_audio_channels
  label: Read Output Audio Channels
  kind: query
  command: "GET /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels"
  params:
    - name: outputId
      type: integer
      description: "output number"

- id: mute_output_audio_all
  label: Mute All Output Audio Channels
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/mute"
  params:
    - name: outputId
      type: integer
      description: "output number"

- id: unmute_output_audio_all
  label: Unmute All Output Audio Channels
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/unmute"
  params:
    - name: outputId
      type: integer
      description: "output number"

- id: read_output_audio_channel
  label: Read Output Audio Channel
  kind: query
  command: "GET /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}"
  params:
    - name: outputId
      type: integer
      description: "output number"
    - name: channelId
      type: integer
      description: "output audio channel number"

- id: mute_output_audio_channel
  label: Mute Output Audio Channel
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}/mute"
  params:
    - name: outputId
      type: integer
      description: "output number"
    - name: channelId
      type: integer
      description: "output audio channel number"

- id: unmute_output_audio_channel
  label: Unmute Output Audio Channel
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}/unmute"
  params:
    - name: outputId
      type: integer
      description: "output number"
    - name: channelId
      type: integer
      description: "output audio channel number"

- id: read_output_audio_source
  label: Read Output Audio Channel Source
  kind: query
  command: "GET /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}/source"
  params:
    - name: outputId
      type: integer
      description: "output number"
    - name: channelId
      type: integer
      description: "output audio channel number"

- id: set_output_audio_source
  label: Set Output Audio Channel Source
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}/source"
  params:
    - name: outputId
      type: integer
      description: "output number"
    - name: channelId
      type: integer
      description: "output audio channel number"
    - name: sourceType
      type: string
      description: '"none", "input" or "dante"'
    - name: sourceId
      type: integer
      optional: true
      description: "source number (only for input)"
    - name: channelId_body
      type: integer
      optional: true
      description: "source channel number"
  body_template: '{"sourceType": "input", "sourceId": 7, "channelId": 4}'

# ---- Audio Tx Dante (§6.4) ----
- id: read_txdante_channels
  label: Read Tx Dante Channels
  kind: query
  command: "GET /api/tpp/v1/audio/transmitters/dante/channels"
  params: []

- id: mute_txdante_all
  label: Mute All Tx Dante Channels
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/dante/channels/mute"
  params: []

- id: unmute_txdante_all
  label: Unmute All Tx Dante Channels
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/dante/channels/unmute"
  params: []

- id: read_txdante_channel
  label: Read Tx Dante Channel
  kind: query
  command: "GET /api/tpp/v1/audio/transmitters/dante/channels/{channelId}"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante channel number (1 to 256)"

- id: mute_txdante_channel
  label: Mute Tx Dante Channel
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/dante/channels/{channelId}/mute"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante channel number"

- id: unmute_txdante_channel
  label: Unmute Tx Dante Channel
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/dante/channels/{channelId}/unmute"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante channel number"

- id: read_txdante_source
  label: Read Tx Dante Channel Source
  kind: query
  command: "GET /api/tpp/v1/audio/transmitters/dante/channels/{channelId}/source"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante channel number"

- id: set_txdante_source
  label: Set Tx Dante Channel Source
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/dante/channels/{channelId}/source"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante channel number"
    - name: sourceType
      type: string
      description: '"none", "input" or "dante"'
    - name: sourceId
      type: integer
      optional: true
      description: "source number (only for input)"
    - name: channelId_body
      type: integer
      optional: true
      description: "source channel number"
  body_template: '{"sourceType": "input", "sourceId": 7, "channelId": 4}'

# ---- Audio Multiviewer (§6.5) ----
- id: read_mvw_audio_channels
  label: Read Multiviewer Audio Channels
  kind: query
  command: "GET /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"

- id: mute_mvw_audio_all
  label: Mute All Multiviewer Audio Channels
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/mute"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"

- id: unmute_mvw_audio_all
  label: Unmute All Multiviewer Audio Channels
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/unmute"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"

- id: read_mvw_audio_channel
  label: Read Multiviewer Audio Channel
  kind: query
  command: "GET /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"

- id: mute_mvw_audio_channel
  label: Mute Multiviewer Audio Channel
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}/mute"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"

- id: unmute_mvw_audio_channel
  label: Unmute Multiviewer Audio Channel
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}/unmute"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"

- id: read_mvw_audio_source
  label: Read Multiviewer Audio Channel Source
  kind: query
  command: "GET /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}/source"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"

- id: set_mvw_audio_source
  label: Set Multiviewer Audio Channel Source
  kind: action
  command: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}/source"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"
    - name: sourceType
      type: string
      description: '"none", "input" or "dante"'
    - name: sourceId
      type: integer
      optional: true
      description: "source number (only for input)"
    - name: channelId_body
      type: integer
      optional: true
      description: "source channel number"
  body_template: '{"sourceType": "input", "sourceId": 7, "channelId": 4}'

# ---- Sources (§7) ----
- id: read_input
  label: Read Input Information
  kind: query
  command: "GET /api/tpp/v1/inputs/{inputId}"
  params:
    - name: inputId
      type: integer
      description: "input number (1 to 256)"

- id: read_image
  label: Read Still Image Information
  kind: query
  command: "GET /api/tpp/v1/images/{imageId}"
  params:
    - name: imageId
      type: integer
      description: "image number (1 to 192)"

- id: read_background_set
  label: Read Background Set Information
  kind: query
  command: "GET /api/tpp/v1/screens/{screenId}/background-sets/{backgroundSetId}"
  params:
    - name: screenId
      type: integer
      description: "screen number (1 to 24)"
    - name: backgroundSetId
      type: integer
      description: "background set number (1 to 8)"

# ---- Authentication (§10) ----
- id: auth_login
  label: Authenticate (Login)
  kind: action
  command: "POST /auth/login?identifier={id}&password={pwd}"
  params:
    - name: id
      type: string
      description: 'user identifier (e.g. "Admin")'
    - name: pwd
      type: string
      description: "user password"
  response_note: "Returns Set-Cookie: auth-jwt=<JWT>; reuse as Cookie header on subsequent calls. Required only if Web RCS is password-protected (else 401)."
```

## Feedbacks
```yaml
- id: system_info
  type: object
  fields: [type, label, isLinked, linkName, version]
  description: "GET /system; type ∈ {AQL RS alpha, AQL RS1, AQL RS2, AQL RS3, AQL RS4, AQL RS5, AQL RS6, AQL C, AQL C+, AQL CMAX}"

- id: firmware_version
  type: object
  fields: [major, minor, patch, beta]
  description: "nested under system.version"

- id: screen_info
  type: object
  fields: [isEnabled, label]

- id: layer_info
  type: object
  fields: [capacity, canUseMask]

- id: layer_status
  type: object
  fields: [status, sourceType, sourceId]
  description: 'status ∈ {off, open, close, cross, flying, flying depth, preempted, mask, out of capacity}'

- id: background_layer_status
  type: object
  fields: [target, status, sourceType, sourceId]
  description: 'status ∈ {off, open, close, cross}; sourceType ∈ {background-set, none}'

- id: aux_screen_info
  type: object
  fields: [isEnabled, label]

- id: aux_layer_capacity
  type: object
  fields: [capacity]

- id: aux_layer_source
  type: object
  fields: [sourceType, sourceId]

- id: multiviewer_info
  type: object
  fields: [isEnabled, isDuplication, label]

- id: widget_status
  type: object
  fields: [isEnabled]

- id: widget_source
  type: object
  fields: [sourceType, sourceId]

- id: input_audio_channel_state
  type: object
  fields: [id, isEnabled, isLevelDetected, isMuted]

- id: rxdante_channel_state
  type: object
  fields: [id, isEnabled, isLevelDetected, isMuted, label]

- id: output_audio_channel_state
  type: object
  fields: [id, isEnabled, isLevelDetected, isMuted, sourceType, sourceId, channelId]

- id: output_audio_source
  type: object
  fields: [sourceType, sourceId, channelId]

- id: txdante_channel_state
  type: object
  fields: [id, isEnabled, isLevelDetected, isMuted, label, sourceType, sourceId, channelId]

- id: txdante_source
  type: object
  fields: [sourceType, sourceId, channelId]

- id: mvw_audio_channel_state
  type: object
  fields: [id, isEnabled, isLevelDetected, isMuted, sourceType, sourceId, channelId]

- id: input_info
  type: object
  fields: [isEnabled, capacity, label, isValid, isFrozen, isVisibleInSourceLists]

- id: image_info
  type: object
  fields: [isEnabled, capacity, label, isValid, isVisibleInSourceLists]

- id: background_set_info
  type: object
  fields: [isEmpty, isValid]
```

## Variables
```yaml
# Source exposes only discrete actions/queries (no scalar get/set level like volume/gain).
# target (program/preview) is a discrete enum on state-changing actions, not a free variable.
# UNRESOLVED: no continuous settable parameter documented in this source.
```

## Events
```yaml
# Source documents no unsolicited push/notification mechanism.
# UNRESOLVED: no event subscription / webhook / keepalive channel described.
```

## Macros
```yaml
# TAKE (single/global) is a one-shot transition command, not a multi-step sequence.
# UNRESOLVED: no explicit multi-step macro/preset-sequence described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Note (non-safety, operational): reboot, shutdown,
# and Wake-on-LAN affect device power state; shutdown with enableWakeOnLAN=true leaves
# the device in 'sleep' state reachable only via magic packet on UDP port 9.
```

## Notes
- HTTP is the documented transport (`http://<ipaddress>/api/tpp/v1`); raw examples terminate with `<CR><LF>` (0x0D 0x0A). The known-protocol hint "TCP/IP" maps to this HTTP API.
- POST bodies must declare correct `Content-Length` (byte count of payload) and `Content-Type: application/json`. Source warns that page-layout line breaks in examples must be trimmed or the request is invalid.
- Authentication is **conditional**: if the Web RCS is password-protected, API calls return `401` until `POST /auth/login` is called and the returned `auth-jwt` cookie is sent on every subsequent request.
- HTTP status codes documented: 200 OK, 204 No Content, 400 Bad Request, 404 Not Found, 405 Method Not Allowed, 409 Internal Server Error (per source §1.4 — note 409 is labeled "Internal Server Error" by the vendor).
- Capacity/index ranges per source: screens 1–24, layers 1–128 (screens) / 1–8 (aux), aux screens 1–96, multiviewer outputs 1–8, widgets 1–64, inputs 1–256, still images 1–192, background sets 1–8, Dante channels 1–256 (64×4 across up to 4 linked devices). Actual counts depend on machine type/configuration.
- Thumbnails (PNG, 256px wide) available at `http://<ipaddress>/api/device/snapshots/{inputs|images|outputs|multiviewers|timers}/{n}` — refresh rate must not exceed 1 snapshot/second (§8). These are media resources, not control commands.
- Source errata: §6.2.5 signature writes `channels/{channelId}mute` (missing slash); worked example uses `/channels/32/mute`. §6.3.7 example for "Reading the source of an output audio channel" uses `POST` (likely should be `GET`).
- Linked-device addressing: multiviewer/Dante numbering spans up to 4 linked devices (device1: 1–2/1–64, device2: 3–4/65–128, device3: 5–6/129–192, device4: 7–8/193–256).

<!-- UNRESOLVED: HTTP port not numerically stated. -->
<!-- UNRESOLVED: device firmware compatibility version not pinned (only API doc version "v4.0 or higher"). -->
<!-- UNRESOLVED: no event/feedback push channel documented. -->
<!-- UNRESOLVED: no explicit safety/interlock text in source. -->

## Provenance

```yaml
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/Rest+API+Programmer's+Guide/livepremier_rest_api_programmers_guide_v4.1.pdf"
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/AWJ+Protocol/livepremier_awj_programmers_guide_v2.4.pdf
retrieved_at: 2026-06-30T05:35:27.810Z
last_checked_at: 2026-06-30T07:14:27.811Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:14:27.811Z
matched_actions: 65
action_count: 65
confidence: medium
summary: "All 65 spec actions have verbatim endpoint matches in the source; transport base URL, WoL UDP port 9, and auth cookie mechanism all confirmed; source documents exactly these 65 endpoints with no uncovered functional commands. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP TCP port not numerically stated (only `http://<ipaddress>/...` given). Device input/output counts vary by configuration; ranges quoted from source."
- "HTTP port not numerically stated in source"
- "no continuous settable parameter documented in this source."
- "no event subscription / webhook / keepalive channel described."
- "no explicit multi-step macro/preset-sequence described in source."
- "source contains no explicit safety warnings, interlock procedures, or"
- "HTTP port not numerically stated."
- "device firmware compatibility version not pinned (only API doc version \"v4.0 or higher\")."
- "no event/feedback push channel documented."
- "no explicit safety/interlock text in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
