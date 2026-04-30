---
schema_version: ai4av-public-spec-v1
device_id: binary/b-660-mtrx-8x8
entity_id: binary_binary_b_series
spec_id: admin/binary-b-660-mtrx-8x8
revision: 1
author: admin
title: "Binary B-660-MTRX-8x8 Control Spec"
status: published
manufacturer: Binary
manufacturer_key: binary
model_family: B-660-MTRX-8x8
aliases: []
compatible_with:
  manufacturers:
    - Binary
  models:
    - B-660-MTRX-8x8
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
  - https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/SnapAV_Binary_MoIP_API_V1.9.pdf
  - "https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/SupportDocuments/B-900-MoIP-Serial_IR_Control%20Info_190124.pdf"
source_documents:
  - title: "Binary public source"
    url: https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T08:59:54.680Z
  - title: "Binary public source"
    url: https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T09:00:10.238Z
  - title: "Binary public source"
    url: https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:02:31.413Z
  - title: "Binary public source"
    url: https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/SnapAV_Binary_MoIP_API_V1.9.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:03:24.450Z
  - title: "Binary public source"
    url: "https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/SupportDocuments/B-900-MoIP-Serial_IR_Control%20Info_190124.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:03:24.656Z
retrieved_at: 2026-04-29T09:03:24.656Z
last_checked_at: 2026-04-23T15:20:57.524Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:20:57.524Z
  matched_actions: 32
  action_count: 32
  confidence: high
  summary: "All 32 spec actions matched literally in source; transport parameters verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Binary B-660-MTRX-8x8 Control Spec

## Summary
The Binary B-660-MTRX-8x8 is an 8x8 HDMI 2.0 matrix switcher with HDBaseT VLC output and audio matrix capabilities. It supports RS-232 serial control and Telnet (TCP port 23) connections. Commands are ASCII text terminated with `<CR><LF>` and are case insensitive.

<!-- UNRESOLVED: exact product family scope unclear — source title says "B-660-MTRX-8x8" but user refers to "Binary B Series"; other B-Series models may share this command set -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # stated default for Telnet
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # STANDBY / WAKE commands present
  - routable     # SET SW in out — video and audio routing commands
  - queryable    # GET MP, GET EDID, GET STANDBY, GET IPADDR, GET VER — query commands returning state
```

## Actions
```yaml
actions:
  - id: switch_video
    label: Switch Video Input to Output
    kind: action
    command: "SET SW {in} {out}"
    response: "SW {in} {out}"
    params:
      - name: in
        type: enum
        values: [in1, in2, in3, in4, in5, in6, in7, in8, in0]
        description: "Input source; in0 = power down output"
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8]
        description: Output sink
    description: Switch one input source for one output

  - id: switch_video_all
    label: Switch Video Input for All Outputs
    kind: action
    command: "SET SW {in} all"
    response: "SW {in} all"
    params:
      - name: in
        type: enum
        values: [in1, in2, in3, in4, in5, in6, in7, in8, in0]
        description: "Input source; in0 = power down all outputs"
    description: Switch one input source for all output sinks

  - id: switch_audio
    label: Switch Audio Input for Output
    kind: action
    command: "SET AUDIOSW {in} {out}"
    response: "AUDIOSW {in} {out}"
    params:
      - name: in
        type: enum
        values: [hdmi, arc]
        description: "hdmi = audio extracted from HDMI OUT; arc = audio from HDMI ARC"
      - name: out
        type: enum
        values: [audioout1, audioout2, audioout3, audioout4, audioout5, audioout6, audioout7, audioout8]
        description: Audio output
    description: Set audio switch from one input source to one audio output

  - id: set_cec_power
    label: Set CEC Power On/Off
    kind: action
    command: "SET CEC_PWR {out} {state}"
    response: "CEC_PWR {out} {state}"
    params:
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8, all]
        description: Output or all
      - name: state
        type: enum
        values: [on, off]
    description: Set sink power on or off via CEC

  - id: set_auto_cec
    label: Set CEC Auto Power On/Off
    kind: action
    command: "SET AUTOCEC_FN {out} {state}"
    response: "AUTOCEC_FN {out} {state}"
    params:
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8]
      - name: state
        type: enum
        values: [on, off]
    description: Set sink auto power function on or off

  - id: set_cec_delay
    label: Set CEC Auto Power Delay
    kind: action
    command: "SET AUTOCEC_D {out} {minutes}"
    response: "AUTOCEC_D {out} {minutes}"
    params:
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8]
      - name: minutes
        type: integer
        min: 0
        max: 30
        description: "Delay in minutes; 0 = immediate power off; default is 2"
    description: Set auto power-off delay when no active signal

  - id: set_input_hdcp
    label: Set Input HDCP Support
    kind: action
    command: "SET HDCP_S {in} {state}"
    response: "HDCP_S {in} {state}"
    params:
      - name: in
        type: enum
        values: [in1, in2, in3, in4, in5, in6, in7, in8]
      - name: state
        type: enum
        values: [on, off]
    description: Enable or disable HDCP support on an input

  - id: set_input_edid
    label: Set Input EDID
    kind: action
    command: "SET EDID {in} {preset}"
    response: "EDID {in} {preset}"
    params:
      - name: in
        type: enum
        values: [in1, in2, in3, in4, in5, in6, in7, in8]
      - name: preset
        type: integer
        min: 1
        max: 27
        description: "1-8 = copy from HDMI output N; 9-27 = fixed EDID presets (4K60/4K30/1080p with various audio/HDR/SDR combos)"
    description: Set EDID for a given input

  - id: write_input_edid
    label: Write Custom EDID Block
    kind: action
    command: "SET EDID_W {in} {block} {data}"
    response: "EDID_W {in} {block} {status}"
    params:
      - name: in
        type: enum
        values: [in1, in2, in3, in4, in5, in6, in7, in8]
      - name: block
        type: enum
        values: [block0, block1]
      - name: data
        type: string
        description: "256 bytes of EDID ASCII data with spaces (hex converted to ASCII)"
    description: Write custom EDID content to input; returns ok or error (checksum)

  - id: set_output_hdcp
    label: Set Output HDCP Mode
    kind: action
    command: "SET HDCP {out} {mode}"
    response: "HDCP {out} {mode}"
    params:
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8, all]
      - name: mode
        type: enum
        values: [follow, "hdcp1.4", off]
        description: "follow = match source HDCP version; off = no HDCP"
    description: Set output HDCP mode

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "RESET"
    response: "RESET"
    params: []
    description: Factory reset all boards

  - id: system_reboot
    label: System Reboot
    kind: action
    command: "REBOOT"
    response: "REBOOT"
    params: []
    description: Software reboot of the system

  - id: hardware_reboot
    label: Hardware Reboot
    kind: action
    command: "HW_REBOOT"
    response: "HW_REBOOT"
    params: []
    description: Hardware reboot

  - id: standby
    label: Standby
    kind: action
    command: "STANDBY"
    response: "STANDBY!"
    params: []
    description: Put device into standby mode

  - id: wake
    label: Wake
    kind: action
    command: "WAKE"
    response: "WAKE!"
    params: []
    description: Wake device from standby

  - id: set_ir_system_code
    label: Set IR System Code
    kind: action
    command: "Set IR_SC {mode}"
    response: "IR_SC {mode}"
    params:
      - name: mode
        type: enum
        values: [all, mode1, mode2]
        description: "mode1 = 0x00; mode2 = 0x4E"
    description: Set IR system code mode

  - id: save_preset
    label: Save Preset Scene
    kind: action
    command: "SAVE PRESET {preset}"
    response: "PRESET {preset}"
    params:
      - name: preset
        type: enum
        values: ["1", "2", "3"]
    description: Save current routing state as a preset scene

  - id: restore_preset
    label: Restore Preset Scene
    kind: action
    command: "RESTORE PRESET {preset}"
    response: "PRESET {preset}"
    params:
      - name: preset
        type: enum
        values: ["1", "2", "3"]
    description: Restore a saved preset scene
```

## Feedbacks
```yaml
feedbacks:
  - id: video_mapping
    label: Video Input Mapping for Output
    type: query
    command: "GET MP {out}"
    response: "MP {in} {out}"
    params:
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8, all]
    return_values:
      - name: in
        type: enum
        values: [in1, in2, in3, in4, in5, in6, in7, in8, in0]
    description: "Get which input is mapped to an output; in0 = output powered down. Use 'all' to get all mappings."

  - id: audio_mapping
    label: Audio Input Mapping for Output
    type: query
    command: "GET AUDIOMP {out}"
    response: "AUDIOMP {in} {out}"
    params:
      - name: out
        type: enum
        values: [audioout1, audioout2, audioout3, audioout4, audioout5, audioout6, audioout7, audioout8]
    return_values:
      - name: in
        type: enum
        values: [hdmi, arc]
    description: Get audio input mapping for an audio output

  - id: auto_cec_status
    label: CEC Auto Power Status
    type: query
    command: "GET AUTOCEC_FN {out}"
    response: "AUTOCEC_FN {out} {state}"
    params:
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8]
    return_values:
      - name: state
        type: enum
        values: [on, off]

  - id: cec_delay_status
    label: CEC Auto Power Delay
    type: query
    command: "GET AUTOCEC_D {out}"
    response: "AUTOCEC_D {out} {minutes}"
    params:
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8]
    return_values:
      - name: minutes
        type: integer
        description: "Delay in minutes (0-30)"

  - id: input_hdcp_status
    label: Input HDCP Support Status
    type: query
    command: "GET HDCP_S {in}"
    response: "HDCP_S {in} {state}"
    params:
      - name: in
        type: enum
        values: [in1, in2, in3, in4, in5, in6, in7, in8]
    return_values:
      - name: state
        type: enum
        values: [on, off]

  - id: all_input_edid
    label: All Input EDID Status
    type: query
    command: "GET EDID all"
    response: "EDID {in} {preset} (multiple lines)"
    return_values:
      - name: preset
        type: integer
        min: 1
        max: 27

  - id: single_input_edid
    label: Single Input EDID Status
    type: query
    command: "GET EDID {in}"
    response: "EDID {in} {preset}"
    params:
      - name: in
        type: enum
        values: [in1, in2, in3, in4, in5, in6, in7, in8]
    return_values:
      - name: preset
        type: integer
        min: 1
        max: 27

  - id: output_edid_read
    label: Read Output EDID
    type: query
    command: "GET EDID_R {out}"
    response: "EDID_R {out} {block} {data_or_status}"
    params:
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8]
    return_values:
      - name: data_or_status
        type: string
        description: "256-byte EDID ASCII block data, 'error' (checksum), or 'unconnect' (no sink)"

  - id: output_hdcp
    label: Output HDCP Mode
    type: query
    command: "GET HDCP {out}"
    response: "HDCP {out} {mode}"
    params:
      - name: out
        type: enum
        values: [out1, out2, out3, out4, out5, out6, out7, out8, all]
    return_values:
      - name: mode
        type: enum
        values: [follow, "hdcp1.4", off]

  - id: standby_status
    label: Standby Status
    type: query
    command: "GET STANDBY"
    response: "STANDBY! or WAKE!"
    return_values:
      - name: state
        type: enum
        values: [standby, wake]

  - id: ip_address
    label: IP Address
    type: query
    command: "GET IPADDR"
    response: "IPADDR {ip}"
    return_values:
      - name: ip
        type: string

  - id: firmware_version
    label: Firmware Version
    type: query
    command: "GET VER"
    response: "VER {version}"
    return_values:
      - name: version
        type: string

  - id: ir_system_code
    label: IR System Code
    type: query
    command: "Get IR_SC"
    response: "IR_SC {mode}"
    return_values:
      - name: mode
        type: enum
        values: [all, mode1, mode2]

  - id: api_list
    label: API Command List
    type: query
    command: "help"
    response: "List of available commands"
```

## Variables
```yaml
# No continuous/settable parameters beyond discrete actions identified in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source; all responses appear to be command-reply only
```

## Macros
```yaml
# Preset save/restore is covered under Actions (save_preset, restore_preset). No multi-step sequences described beyond that.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- All commands are case insensitive and must be terminated with `<CR><LF>`.
- The device supports both RS-232 serial and Telnet (TCP) control with the same command set.
- Video routing uses inputs `in1`–`in8` and outputs `out1`–`out8`; `in0` means power down the output.
- Audio routing uses `hdmi` or `arc` as input sources and `audioout1`–`audioout8` as outputs.
- EDID preset values 1–8 copy from HDMI outputs; values 9–27 are fixed EDID tables with various resolution/audio/HDR combinations.
- EDID preset values 21–27 are mentioned in parameter lists but not fully enumerated in the source (only values up to 20 are described in detail in some tables).
- Three preset scene slots (1, 2, 3) for saving/restoring routing configurations.
- CEC auto power-off delay default is 2 minutes, max 30 minutes; 0 = immediate.
- Output HDCP `follow` mode mirrors the source's HDCP version automatically.
<!-- UNRESOLVED: EDID presets 21-27 descriptions incomplete in source — only listed in parameter range but details not fully documented -->
<!-- UNRESOLVED: no information on command timing, rate limiting, or connection keep-alive for Telnet -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_urls:
  - https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
  - https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/SnapAV_Binary_MoIP_API_V1.9.pdf
  - "https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/SupportDocuments/B-900-MoIP-Serial_IR_Control%20Info_190124.pdf"
source_documents:
  - title: "Binary public source"
    url: https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T08:59:54.680Z
  - title: "Binary public source"
    url: https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T09:00:10.238Z
  - title: "Binary public source"
    url: https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:02:31.413Z
  - title: "Binary public source"
    url: https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/SnapAV_Binary_MoIP_API_V1.9.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:03:24.450Z
  - title: "Binary public source"
    url: "https://snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/SupportDocuments/B-900-MoIP-Serial_IR_Control%20Info_190124.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T09:03:24.656Z
retrieved_at: 2026-04-29T09:03:24.656Z
last_checked_at: 2026-04-23T15:20:57.524Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:20:57.524Z
matched_actions: 32
action_count: 32
confidence: high
summary: "All 32 spec actions matched literally in source; transport parameters verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```
