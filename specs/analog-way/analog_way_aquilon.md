---
spec_id: admin/analog-way-aquilon
schema_version: ai4av-public-spec-v1
revision: 1
title: "Analog Way Aquilon Control Spec"
manufacturer: "Analog Way"
model_family: "AQL RS alpha"
aliases: []
compatible_with:
  manufacturers:
    - "Analog Way"
  models:
    - "AQL RS alpha"
    - "AQL RS1"
    - "AQL RS2"
    - "AQL RS3"
    - "AQL RS4"
    - "AQL RS5"
    - "AQL RS6"
    - "AQL C"
    - "AQL C+"
    - "AQL CMAX"
  firmware: "\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/Rest+API+Programmer's+Guide/livepremier_rest_api_programmers_guide_v4.1.pdf"
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/AWJ+Protocol/AW_LivePremier_AWJ_ProgrammersGuide_V6.1.pdf
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/User+Manual/Aquilon_User_Manual_v6.1.pdf
retrieved_at: 2026-05-14T10:55:14.933Z
last_checked_at: 2026-06-23T09:24:06.532Z
generated_at: 2026-06-23T09:24:06.532Z
firmware_coverage: "\""
protocol_coverage: []
known_gaps:
  - "UDP port for Wake-on-LAN magic packet is 9 (noted in source); no TCP port stated for the REST API (standard HTTP port 80 implied by examples but not explicitly declared)"
  - "port not explicitly stated; examples use default HTTP (80)"
verification:
  verdict: verified
  checked_at: 2026-06-23T09:24:06.532Z
  matched_actions: 94
  action_count: 94
  confidence: medium
  summary: "All 94 spec actions (69 Actions + 25 Feedbacks with query_command) map exactly to documented endpoints; transport base_url and JWT auth confirmed verbatim. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Analog Way Aquilon Control Spec

## Summary

The Analog Way Aquilon (LivePremier™ series) is a high-end multi-screen presentation system. This spec covers the REST HTTP API documented in the LivePremier™ REST API Programmer's Guide for firmware v4.0 or higher. Control is via HTTP GET and POST requests to the base URL `http://<ipaddress>/api/tpp/v1`, covering system control, screen preset recall and TAKE, auxiliary screen control, multiviewer management, audio routing and muting, source/input queries, thumbnail retrieval, and optional JWT-based authentication.

<!-- UNRESOLVED: UDP port for Wake-on-LAN magic packet is 9 (noted in source); no TCP port stated for the REST API (standard HTTP port 80 implied by examples but not explicitly declared) -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{ipaddress}/api/tpp/v1"
  port: null  # UNRESOLVED: port not explicitly stated; examples use default HTTP (80)
auth:
  type: jwt  # optional; if Web RCS password is set, POST /auth/login returns auth-jwt cookie required on subsequent requests
```

## Traits
```yaml
- routable    # input/output routing commands present (layer source assignment, audio routing)
- queryable   # GET queries returning state present throughout
- powerable   # system reboot and shutdown commands present
```

## Actions
```yaml
- id: system_get_info
  label: Read System Information
  kind: query
  method: "GET /api/tpp/v1/system"
  params: []

- id: system_reboot
  label: Reboot System
  kind: action
  method: "POST /api/tpp/v1/system/reboot"
  params: []

- id: system_shutdown
  label: Shutdown System
  kind: action
  method: "POST /api/tpp/v1/system/shutdown"
  params:
    - name: enableWakeOnLAN
      type: boolean
      description: "true to enable Wake-on-LAN on shutdown (optional, default false)"

- id: screen_get_info
  label: Read Screen Information
  kind: query
  method: "GET /api/tpp/v1/screens/{screenId}"
  params:
    - name: screenId
      type: integer
      description: "Screen number (1 to 24)"

- id: screen_load_memory
  label: Recall Preset from Memory to Single Screen
  kind: action
  method: "POST /api/tpp/v1/screens/{screenId}/load-memory"
  params:
    - name: screenId
      type: integer
      description: "Screen number (1 to 24)"
    - name: memoryId
      type: integer
      description: "Memory index (1 to 1000)"
    - name: target
      type: string
      description: "Destination: 'program' or 'preview' (default 'preview')"

- id: load_master_memory
  label: Recall Master Preset from Memory
  kind: action
  method: "POST /api/tpp/v1/load-master-memory"
  params:
    - name: memoryId
      type: integer
      description: "Memory index (1 to 500)"
    - name: target
      type: string
      description: "Destination: 'program' or 'preview' (default 'preview')"

- id: screen_get_layer_info
  label: Read Layer Information on Screen
  kind: query
  method: "GET /api/tpp/v1/screens/{screenId}/layers/{layerId}"
  params:
    - name: screenId
      type: integer
      description: "Screen number (1 to 24)"
    - name: layerId
      type: integer
      description: "Layer number (1 to 128)"

- id: screen_get_layer_status
  label: Read Layer Status on Screen
  kind: query
  method: "GET /api/tpp/v1/screens/{screenId}/layers/{layerId}/presets/{target}"
  params:
    - name: screenId
      type: integer
      description: "Screen number (1 to 24)"
    - name: layerId
      type: integer
      description: "Layer number (1 to 128)"
    - name: target
      type: string
      description: "'program' or 'preview'"

- id: screen_set_layer_source
  label: Set Layer Source on Screen
  kind: action
  method: "POST /api/tpp/v1/screens/{screenId}/layers/{layerId}/presets/{target}/source"
  params:
    - name: screenId
      type: integer
      description: "Screen number (1 to 24)"
    - name: layerId
      type: integer
      description: "Layer number (1 to 128)"
    - name: target
      type: string
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
      description: "Source type: 'none', 'color', 'input', 'image' or 'screen'"
    - name: sourceId
      type: integer
      description: "Source number (optional)"

- id: screen_get_background_layer_status
  label: Read Background Layer Status on Screen
  kind: query
  method: "GET /api/tpp/v1/screens/{screenId}/background-layer/presets/{target}"
  params:
    - name: screenId
      type: integer
      description: "Screen number (1 to 24)"
    - name: target
      type: string
      description: "'program' or 'preview'"

- id: screen_set_background_layer_source
  label: Set Background Layer Source on Screen
  kind: action
  method: "POST /api/tpp/v1/screens/{screenId}/background-layer/presets/{target}/source"
  params:
    - name: screenId
      type: integer
      description: "Screen number (1 to 24)"
    - name: target
      type: string
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
      description: "Source type: 'background-set' or 'none'"
    - name: sourceId
      type: integer
      description: "Background source number (1 to 8, optional)"

- id: screen_take_single
  label: Single TAKE - Transition Preview to Program (single screen)
  kind: action
  method: "POST /api/tpp/v1/screens/{screenId}/take"
  params:
    - name: screenId
      type: integer
      description: "Screen number (1 to 24)"

- id: take_global
  label: Global TAKE - Transition Preview to Program (multiple screens)
  kind: action
  method: "POST /api/tpp/v1/take"
  params:
    - name: screenIds
      type: array
      description: "List of screen indexes to transition (optional)"
    - name: auxiliaryScreenIds
      type: array
      description: "List of auxiliary screen indexes to transition (optional)"

- id: aux_screen_get_info
  label: Read Auxiliary Screen Information
  kind: query
  method: "GET /api/tpp/v1/auxiliary-screens/{auxId}"
  params:
    - name: auxId
      type: integer
      description: "Auxiliary screen number (1 to 96)"

- id: aux_screen_load_memory
  label: Recall Preset from Memory to Auxiliary Screen
  kind: action
  method: "POST /api/tpp/v1/auxiliary-screens/{auxId}/load-memory"
  params:
    - name: auxId
      type: integer
      description: "Auxiliary screen number (1 to 96)"
    - name: memoryId
      type: integer
      description: "Memory index"
    - name: target
      type: string
      description: "Destination: 'program' or 'preview' (default 'preview')"

- id: aux_screen_get_layer_capacity
  label: Read Layer Capacity of Auxiliary Screen
  kind: query
  method: "GET /api/tpp/v1/auxiliary-screens/{auxId}/layers/{layerId}"
  params:
    - name: auxId
      type: integer
      description: "Auxiliary screen number (1 to 96)"
    - name: layerId
      type: integer
      description: "Layer number (1 to 8)"

- id: aux_screen_get_layer_source
  label: Read Layer Source of Auxiliary Screen
  kind: query
  method: "GET /api/tpp/v1/auxiliary-screens/{auxId}/layers/{layerId}/presets/{target}/source"
  params:
    - name: auxId
      type: integer
      description: "Auxiliary screen number (1 to 96)"
    - name: layerId
      type: integer
      description: "Layer number (1 to 8)"
    - name: target
      type: string
      description: "'program' or 'preview'"

- id: aux_screen_set_layer_source
  label: Set Layer Source of Auxiliary Screen
  kind: action
  method: "POST /api/tpp/v1/auxiliary-screens/{auxId}/layers/{layerId}/presets/{target}/source"
  params:
    - name: auxId
      type: integer
      description: "Auxiliary screen number (1 to 96)"
    - name: layerId
      type: integer
      description: "Layer number (1 to 8)"
    - name: target
      type: string
      description: "'program' or 'preview'"
    - name: sourceType
      type: string
      description: "Source type: 'none', 'input', 'image' or 'screen'"
    - name: sourceId
      type: integer
      description: "Source number (optional)"

- id: aux_screen_take
  label: TAKE Auxiliary Screen - Transition Preview to Program
  kind: action
  method: "POST /api/tpp/v1/auxiliary-screens/{auxId}/take"
  params:
    - name: auxId
      type: integer
      description: "Auxiliary screen number (1 to 96)"

- id: multiviewer_get_info
  label: Read Multiviewer Output Information
  kind: query
  method: "GET /api/tpp/v1/multiviewers/{mvwId}"
  params:
    - name: mvwId
      type: integer
      description: "Multiviewer output number (1 to 8)"

- id: multiviewer_load_memory
  label: Recall Preset from Memory to Multiviewer Output
  kind: action
  method: "POST /api/tpp/v1/multiviewers/{mvwId}/load-memory"
  params:
    - name: mvwId
      type: integer
      description: "Multiviewer output number (1 to 8)"
    - name: memoryId
      type: integer
      description: "Memory index (1 to 50)"

- id: multiviewer_get_widget_source
  label: Read Source of Multiviewer Output Widget
  kind: query
  method: "GET /api/tpp/v1/multiviewers/{mvwId}/widgets/{widgetId}/source"
  params:
    - name: mvwId
      type: integer
      description: "Multiviewer output number (1 to 8)"
    - name: widgetId
      type: integer
      description: "Widget number (1 to 64)"

- id: multiviewer_get_widget_status
  label: Read Status of Multiviewer Output Widget
  kind: query
  method: "GET /api/tpp/v1/multiviewers/{mvwId}/widgets/{widgetId}"
  params:
    - name: mvwId
      type: integer
      description: "Multiviewer output number (1 to 8)"
    - name: widgetId
      type: integer
      description: "Widget number (1 to 64)"

- id: multiviewer_set_widget_source
  label: Set Source of Multiviewer Output Widget
  kind: action
  method: "POST /api/tpp/v1/multiviewers/{mvwId}/widgets/{widgetId}/source"
  params:
    - name: mvwId
      type: integer
      description: "Multiviewer output number (1 to 8)"
    - name: widgetId
      type: integer
      description: "Widget number (1 to 64)"
    - name: sourceType
      type: string
      description: "Source type: 'none', 'input', 'image', 'screen-program', 'screen-preview', 'auxiliary-screen' or 'timer'"
    - name: sourceId
      type: integer
      description: "Source number (optional)"

- id: audio_input_get_channels
  label: Read Audio Channels Information of an Input
  kind: query
  method: "GET /api/tpp/v1/audio/receivers/inputs/{inputId}/channels"
  params:
    - name: inputId
      type: integer
      description: "Input number"

- id: audio_input_mute_all_channels
  label: Mute All Audio Channels of an Input
  kind: action
  method: "POST /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/mute"
  params:
    - name: inputId
      type: integer
      description: "Input number"

- id: audio_input_unmute_all_channels
  label: Unmute All Audio Channels of an Input
  kind: action
  method: "POST /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/unmute"
  params:
    - name: inputId
      type: integer
      description: "Input number"

- id: audio_input_get_channel
  label: Read Specific Audio Channel Information of an Input
  kind: query
  method: "GET /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/{channelId}"
  params:
    - name: inputId
      type: integer
      description: "Input number"
    - name: channelId
      type: integer
      description: "Input audio channel number"

- id: audio_input_mute_channel
  label: Mute Specific Audio Channel of an Input
  kind: action
  method: "POST /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/{channelId}/mute"
  params:
    - name: inputId
      type: integer
      description: "Input number"
    - name: channelId
      type: integer
      description: "Input audio channel number"

- id: audio_input_unmute_channel
  label: Unmute Specific Audio Channel of an Input
  kind: action
  method: "POST /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/{channelId}/unmute"
  params:
    - name: inputId
      type: integer
      description: "Input number"
    - name: channelId
      type: integer
      description: "Input audio channel number"

- id: audio_rx_dante_get_channels
  label: Read All Audio Rx Dante Channel Information
  kind: query
  method: "GET /api/tpp/v1/audio/receivers/dante/channels"
  params: []

- id: audio_rx_dante_mute_all
  label: Mute All Audio Rx Dante Channels
  kind: action
  method: "POST /api/tpp/v1/audio/receivers/dante/channels/mute"
  params: []

- id: audio_rx_dante_unmute_all
  label: Unmute All Audio Rx Dante Channels
  kind: action
  method: "POST /api/tpp/v1/audio/receivers/dante/channels/unmute"
  params: []

- id: audio_rx_dante_get_channel
  label: Read Specific Audio Rx Dante Channel Information
  kind: query
  method: "GET /api/tpp/v1/audio/receivers/dante/channels/{channelId}"
  params:
    - name: channelId
      type: integer
      description: "Rx Dante audio channel number (1 to 256)"

- id: audio_rx_dante_mute_channel
  label: Mute Specific Audio Rx Dante Channel
  kind: action
  method: "POST /api/tpp/v1/audio/receivers/dante/channels/{channelId}/mute"
  params:
    - name: channelId
      type: integer
      description: "Rx Dante audio channel number"

- id: audio_rx_dante_unmute_channel
  label: Unmute Specific Audio Rx Dante Channel
  kind: action
  method: "POST /api/tpp/v1/audio/receivers/dante/channels/{channelId}/unmute"
  params:
    - name: channelId
      type: integer
      description: "Rx Dante audio channel number"

- id: audio_output_get_channels
  label: Read Audio Channels Information of an Output
  kind: query
  method: "GET /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels"
  params:
    - name: outputId
      type: integer
      description: "Output number"

- id: audio_output_mute_all_channels
  label: Mute All Audio Channels of an Output
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/mute"
  params:
    - name: outputId
      type: integer
      description: "Output number"

- id: audio_output_unmute_all_channels
  label: Unmute All Audio Channels of an Output
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/unmute"
  params:
    - name: outputId
      type: integer
      description: "Output number"

- id: audio_output_get_channel
  label: Read Specific Audio Channel Information of an Output
  kind: query
  method: "GET /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}"
  params:
    - name: outputId
      type: integer
      description: "Output number"
    - name: channelId
      type: integer
      description: "Output audio channel number"

- id: audio_output_mute_channel
  label: Mute Specific Output Audio Channel
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}/mute"
  params:
    - name: outputId
      type: integer
      description: "Output number"
    - name: channelId
      type: integer
      description: "Output audio channel number"

- id: audio_output_unmute_channel
  label: Unmute Specific Output Audio Channel
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}/unmute"
  params:
    - name: outputId
      type: integer
      description: "Output number"
    - name: channelId
      type: integer
      description: "Output audio channel number"

- id: audio_output_get_channel_source
  label: Read Source of an Output Audio Channel
  kind: query
  method: "GET /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}/source"
  params:
    - name: outputId
      type: integer
      description: "Output number"
    - name: channelId
      type: integer
      description: "Output audio channel number"

- id: audio_output_set_channel_source
  label: Set Source of an Output Audio Channel
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}/source"
  params:
    - name: outputId
      type: integer
      description: "Output number"
    - name: channelId
      type: integer
      description: "Output audio channel number"
    - name: sourceType
      type: string
      description: "Source type: 'none', 'input' or 'dante'"
    - name: sourceId
      type: integer
      description: "Source number (only for 'input' source, optional)"
    - name: sourceChannelId
      type: integer
      description: "Source channel number (optional)"

- id: audio_tx_dante_get_channels
  label: Read All Audio Tx Dante Channel Information
  kind: query
  method: "GET /api/tpp/v1/audio/transmitters/dante/channels"
  params: []

- id: audio_tx_dante_mute_all
  label: Mute All Audio Tx Dante Channels
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/dante/channels/mute"
  params: []

- id: audio_tx_dante_unmute_all
  label: Unmute All Audio Tx Dante Channels
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/dante/channels/unmute"
  params: []

- id: audio_tx_dante_get_channel
  label: Read Specific Audio Tx Dante Channel Information
  kind: query
  method: "GET /api/tpp/v1/audio/transmitters/dante/channels/{channelId}"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante audio channel number (1 to 256)"

- id: audio_tx_dante_mute_channel
  label: Mute Specific Audio Tx Dante Channel
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/dante/channels/{channelId}/mute"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante audio channel number"

- id: audio_tx_dante_unmute_channel
  label: Unmute Specific Audio Tx Dante Channel
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/dante/channels/{channelId}/unmute"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante audio channel number"

- id: audio_tx_dante_get_channel_source
  label: Read Source of an Audio Tx Dante Channel
  kind: query
  method: "GET /api/tpp/v1/audio/transmitters/dante/channels/{channelId}/source"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante audio channel number"

- id: audio_tx_dante_set_channel_source
  label: Set Source of an Audio Tx Dante Channel
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/dante/channels/{channelId}/source"
  params:
    - name: channelId
      type: integer
      description: "Tx Dante audio channel number"
    - name: sourceType
      type: string
      description: "Source type: 'none', 'input' or 'dante'"
    - name: sourceId
      type: integer
      description: "Source number (only for 'input' source, optional)"
    - name: sourceChannelId
      type: integer
      description: "Source channel number (optional)"

- id: audio_multiviewer_get_channels
  label: Read Audio Channels Information of a Multiviewer Output
  kind: query
  method: "GET /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"

- id: audio_multiviewer_mute_all_channels
  label: Mute All Audio Channels of a Multiviewer Output
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/mute"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"

- id: audio_multiviewer_unmute_all_channels
  label: Unmute All Audio Channels of a Multiviewer Output
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/unmute"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"

- id: audio_multiviewer_get_channel
  label: Read Specific Audio Channel Information of a Multiviewer Output
  kind: query
  method: "GET /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"

- id: audio_multiviewer_mute_channel
  label: Mute Specific Audio Channel of a Multiviewer Output
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}/mute"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"

- id: audio_multiviewer_unmute_channel
  label: Unmute Specific Audio Channel of a Multiviewer Output
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}/unmute"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"

- id: audio_multiviewer_get_channel_source
  label: Read Source of an Audio Channel of a Multiviewer Output
  kind: query
  method: "GET /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}/source"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"

- id: audio_multiviewer_set_channel_source
  label: Set Source of an Audio Channel of a Multiviewer Output
  kind: action
  method: "POST /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}/source"
  params:
    - name: multiviewerId
      type: integer
      description: "Multiviewer output number"
    - name: channelId
      type: integer
      description: "Multiviewer output audio channel number"
    - name: sourceType
      type: string
      description: "Source type: 'none', 'input' or 'dante'"
    - name: sourceId
      type: integer
      description: "Source number (only for 'input' source, optional)"
    - name: sourceChannelId
      type: integer
      description: "Source channel number (optional)"

- id: input_get_info
  label: Read Input Information
  kind: query
  method: "GET /api/tpp/v1/inputs/{inputId}"
  params:
    - name: inputId
      type: integer
      description: "Input number (1 to 256)"

- id: image_get_info
  label: Read Still Image Information
  kind: query
  method: "GET /api/tpp/v1/images/{imageId}"
  params:
    - name: imageId
      type: integer
      description: "Image number (1 to 192 depending on number of IPUs)"

- id: screen_get_background_set_info
  label: Read Background Set Information for a Screen
  kind: query
  method: "GET /api/tpp/v1/screens/{screenId}/background-sets/{backgroundSetId}"
  params:
    - name: screenId
      type: integer
      description: "Screen number (1 to 24)"
    - name: backgroundSetId
      type: integer
      description: "Background set number (1 to 8)"

- id: thumbnail_get_input
  label: Get Thumbnail of a Live Input
  kind: query
  method: "GET /api/device/snapshots/inputs/{inputId}"
  params:
    - name: inputId
      type: integer
      description: "Input number (1 to 256)"

- id: thumbnail_get_image
  label: Get Thumbnail of a Still Image
  kind: query
  method: "GET /api/device/snapshots/images/{imageId}"
  params:
    - name: imageId
      type: integer
      description: "Image number (1 to 192)"

- id: thumbnail_get_output
  label: Get Thumbnail of an Output
  kind: query
  method: "GET /api/device/snapshots/outputs/{outputId}"
  params:
    - name: outputId
      type: integer
      description: "Output number (1 to 96)"

- id: thumbnail_get_multiviewer
  label: Get Thumbnail of a Multiviewer Output
  kind: query
  method: "GET /api/device/snapshots/multiviewers/{mvwId}"
  params:
    - name: mvwId
      type: integer
      description: "Multiviewer output number (1 to 8)"

- id: thumbnail_get_timer
  label: Get Thumbnail of a Timer
  kind: query
  method: "GET /api/device/snapshots/timers/{timerId}"
  params:
    - name: timerId
      type: integer
      description: "Timer number (1 to 4)"

- id: auth_login
  label: Authenticate (Login)
  kind: action
  method: "POST /auth/login"
  params:
    - name: identifier
      type: string
      description: "User identifier (e.g. 'Admin') passed as query string parameter"
    - name: password
      type: string
      description: "User password passed as query string parameter"
```

## Feedbacks
```yaml
- id: fb_system_info
  label: System Information
  query_command: "GET /api/tpp/v1/system"

- id: fb_screen_info
  label: Screen Information
  query_command: "GET /api/tpp/v1/screens/{screenId}"

- id: fb_screen_layer_status
  label: Screen Layer Status
  query_command: "GET /api/tpp/v1/screens/{screenId}/layers/{layerId}/presets/{target}"

- id: fb_screen_background_layer_status
  label: Screen Background Layer Status
  query_command: "GET /api/tpp/v1/screens/{screenId}/background-layer/presets/{target}"

- id: fb_aux_screen_info
  label: Auxiliary Screen Information
  query_command: "GET /api/tpp/v1/auxiliary-screens/{auxId}"

- id: fb_aux_screen_layer_source
  label: Auxiliary Screen Layer Source
  query_command: "GET /api/tpp/v1/auxiliary-screens/{auxId}/layers/{layerId}/presets/{target}/source"

- id: fb_multiviewer_info
  label: Multiviewer Output Information
  query_command: "GET /api/tpp/v1/multiviewers/{mvwId}"

- id: fb_multiviewer_widget_source
  label: Multiviewer Widget Source
  query_command: "GET /api/tpp/v1/multiviewers/{mvwId}/widgets/{widgetId}/source"

- id: fb_multiviewer_widget_status
  label: Multiviewer Widget Status
  query_command: "GET /api/tpp/v1/multiviewers/{mvwId}/widgets/{widgetId}"

- id: fb_audio_input_channels
  label: Audio Input Channels State
  query_command: "GET /api/tpp/v1/audio/receivers/inputs/{inputId}/channels"

- id: fb_audio_input_channel
  label: Audio Input Specific Channel State
  query_command: "GET /api/tpp/v1/audio/receivers/inputs/{inputId}/channels/{channelId}"

- id: fb_audio_rx_dante_channels
  label: Audio Rx Dante Channels State
  query_command: "GET /api/tpp/v1/audio/receivers/dante/channels"

- id: fb_audio_rx_dante_channel
  label: Audio Rx Dante Specific Channel State
  query_command: "GET /api/tpp/v1/audio/receivers/dante/channels/{channelId}"

- id: fb_audio_output_channels
  label: Audio Output Channels State
  query_command: "GET /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels"

- id: fb_audio_output_channel
  label: Audio Output Specific Channel State
  query_command: "GET /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}"

- id: fb_audio_output_channel_source
  label: Audio Output Channel Source
  query_command: "GET /api/tpp/v1/audio/transmitters/outputs/{outputId}/channels/{channelId}/source"

- id: fb_audio_tx_dante_channels
  label: Audio Tx Dante Channels State
  query_command: "GET /api/tpp/v1/audio/transmitters/dante/channels"

- id: fb_audio_tx_dante_channel
  label: Audio Tx Dante Specific Channel State
  query_command: "GET /api/tpp/v1/audio/transmitters/dante/channels/{channelId}"

- id: fb_audio_tx_dante_channel_source
  label: Audio Tx Dante Channel Source
  query_command: "GET /api/tpp/v1/audio/transmitters/dante/channels/{channelId}/source"

- id: fb_audio_multiviewer_channels
  label: Audio Multiviewer Output Channels State
  query_command: "GET /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels"

- id: fb_audio_multiviewer_channel
  label: Audio Multiviewer Output Specific Channel State
  query_command: "GET /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}"

- id: fb_audio_multiviewer_channel_source
  label: Audio Multiviewer Output Channel Source
  query_command: "GET /api/tpp/v1/audio/transmitters/multiviewers/{multiviewerId}/channels/{channelId}/source"

- id: fb_input_info
  label: Input Information
  query_command: "GET /api/tpp/v1/inputs/{inputId}"

- id: fb_image_info
  label: Still Image Information
  query_command: "GET /api/tpp/v1/images/{imageId}"

- id: fb_background_set_info
  label: Screen Background Set Information
  query_command: "GET /api/tpp/v1/screens/{screenId}/background-sets/{backgroundSetId}"
```

## Variables
[]

## Events
[]

## Macros
[]

## Safety
```yaml
confirmation_required_for:
  - system_reboot
  - system_shutdown
interlocks: []
```

## Notes
- Authentication is optional; if the Web RCS password is set, POST /auth/login returns an `auth-jwt` cookie that must be included in the `Cookie:` header of all subsequent requests.
- The API uses standard HTTP with no special terminator; responses are JSON-formatted (200 with body or 204 no content on success).
- Transport is HTTP over the default port (80 implied by all examples); no explicit port declaration in the source document.

## Provenance

```yaml
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - "https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/Rest+API+Programmer's+Guide/livepremier_rest_api_programmers_guide_v4.1.pdf"
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/AWJ+Protocol/AW_LivePremier_AWJ_ProgrammersGuide_V6.1.pdf
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/LivePremier/Common/User+Manual/Aquilon_User_Manual_v6.1.pdf
retrieved_at: 2026-05-14T10:55:14.933Z
last_checked_at: 2026-06-23T09:24:06.532Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:24:06.532Z
matched_actions: 94
action_count: 94
confidence: medium
summary: "All 94 spec actions (69 Actions + 25 Feedbacks with query_command) map exactly to documented endpoints; transport base_url and JWT auth confirmed verbatim. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "UDP port for Wake-on-LAN magic packet is 9 (noted in source); no TCP port stated for the REST API (standard HTTP port 80 implied by examples but not explicitly declared)"
- "port not explicitly stated; examples use default HTTP (80)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
