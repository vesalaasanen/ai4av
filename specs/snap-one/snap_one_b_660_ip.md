---
spec_id: admin/snap-one-b-660-mtrx-8x8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Snap One B-660-MTRX-8x8 Control Spec"
manufacturer: "Snap One"
model_family: B-660-MTRX-8x8
aliases: []
compatible_with:
  manufacturers:
    - "Snap One"
  models:
    - B-660-MTRX-8x8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
  - docs.control4.com
  - digitalautomation.us
  - snapone.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/SupportDocuments/B-660-MTRX-8x8-API-Command-Set_V1.0.1.pdf
  - https://docs.control4.com/docs/product/binary-660-series-matrix-4x2/user-guide/english/latest/binary-660-series-matrix-4x2-user-guide-rev-b.pdf
  - https://digitalautomation.us/wp-content/uploads/2022/06/Binary-B-660-MTRX-4x4-Manual.pdf
  - https://www.snapone.com/
retrieved_at: 2026-06-01T22:56:43.271Z
last_checked_at: 2026-06-04T06:30:20.294Z
generated_at: 2026-06-04T06:30:20.294Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "default IP address / DHCP vs static not stated in source"
  - "remove this comment and populate from source"
  - "source exposes no settable scalar parameters outside the"
  - "source documents no unsolicited notifications. Section omitted."
  - "source documents no multi-step sequences. Section omitted."
  - "source contains no safety warnings, interlock procedures, or"
  - "EDID preset 27 meaning not stated in source"
  - "output of `help` command not specified in source"
verification:
  verdict: verified
  checked_at: 2026-06-04T06:30:20.294Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions matched verbatim in source; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Snap One B-660-MTRX-8x8 Control Spec

## Summary
8x8 HDMI 2.0 matrix switcher with HDBaseT VLC OUT and audio matrix. ASCII command set served over both RS-232 (115200 8N1, no flow control) and Telnet (default TCP port 23). One set of keywords (`SET`, `GET`, `RESET`, `REBOOT`, `STANDBY`, `WAKE`, `HW_REBOOT`, `help`) covers video routing, audio routing, CEC, HDCP, EDID, IR system code, presets, and system info.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default IP address / DHCP vs static not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # source: "port number is 23 by default"
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from STANDBY / WAKE / GET STANDBY commands
- routable   # inferred from SET SW / SET AUDIOSW routing commands
- queryable  # inferred from GET MP / GET AUDIOMP / GET EDID / GET HDCP / GET IPADDR / GET VER / GET STANDBY / GET IR_SC / GET AUTOCEC_FN / GET AUTOCEC_D / GET HDCP_S commands
```

## Actions
```yaml
- id: video_switch
  label: Video Switch (one input to one output)
  kind: action
  command: "SET SW {in} {out}\r\n"
  params:
    - name: in
      type: string
      description: Input source (in1..in8) or in0 to power down output
    - name: out
      type: string
      description: Output sink (out1..out8)

- id: video_switch_all
  label: Video Switch (one input to all outputs)
  kind: action
  command: "SET SW {in} all\r\n"
  params:
    - name: in
      type: string
      description: Input source (in1..in8) or in0 to power down output

- id: get_video_mapping
  label: Get Input Mapping for Output
  kind: query
  command: "GET MP {out}\r\n"
  params:
    - name: out
      type: string
      description: Output (out1..out8)

- id: get_video_mapping_all
  label: Get Input Mapping for All Outputs
  kind: query
  command: "GET MP all\r\n"
  params: []

- id: audio_switch
  label: Audio Switch (input to audio output)
  kind: action
  command: "SET AUDIOSW {in} {out}\r\n"
  params:
    - name: in
      type: string
      description: Audio source (hdmi or arc)
    - name: out
      type: string
      description: Audio output (audioout1..audioout8)

- id: get_audio_mapping
  label: Get Audio Input Mapping for Audio Output
  kind: query
  command: "GET AUDIOMP {out}\r\n"
  params:
    - name: out
      type: string
      description: Audio output (audioout1..audioout8)

- id: cec_power
  label: Set CEC Power On/Off
  kind: action
  command: "SET CEC_PWR {out} {prm}\r\n"
  params:
    - name: out
      type: string
      description: HDMI output (out1..out8) or all
    - name: prm
      type: string
      description: on or off

- id: cec_auto_power_fn
  label: Set CEC Auto Power On/Off
  kind: action
  command: "SET AUTOCEC_FN {out} {prm}\r\n"
  params:
    - name: out
      type: string
      description: HDMI output (out1..out8)
    - name: prm
      type: string
      description: on or off

- id: get_cec_auto_power_fn
  label: Get CEC Auto Power On/Off Status
  kind: query
  command: "GET AUTOCEC_FN {out}\r\n"
  params:
    - name: out
      type: string
      description: HDMI output (out1..out8)

- id: cec_auto_power_delay
  label: Set CEC Power Delay Time
  kind: action
  command: "SET AUTOCEC_D {out} {prm}\r\n"
  params:
    - name: out
      type: string
      description: HDMI output (out1..out8)
    - name: prm
      type: integer
      description: Delay in minutes (0 = immediate auto-off, default 2, max 30)

- id: get_cec_auto_power_delay
  label: Get CEC Power Delay Time Status
  kind: query
  command: "GET AUTOCEC_D {out}\r\n"
  params:
    - name: out
      type: string
      description: HDMI output (out1..out8)

- id: set_hdcp_input
  label: Set Input HDCP Support On/Off
  kind: action
  command: "SET HDCP_S {in} {prm}\r\n"
  params:
    - name: in
      type: string
      description: HDMI input (in1..in8)
    - name: prm
      type: string
      description: on or off

- id: get_hdcp_input
  label: Get Input HDCP Support Status
  kind: query
  command: "GET HDCP_S {in}\r\n"
  params:
    - name: in
      type: string
      description: HDMI input (in1..in8)

- id: set_edid
  label: Set Input EDID
  kind: action
  command: "SET EDID {in} {prm}\r\n"
  params:
    - name: in
      type: string
      description: HDMI input (in1..in8)
    - name: prm
      type: integer
      description: EDID index 1-27 (1-8: copy from HDMI output N; 9-26: fixed presets; 27: not listed in source excerpt)

- id: get_edid_all
  label: Get All Input EDID Status
  kind: query
  command: "GET EDID all\r\n"
  params: []

- id: get_edid
  label: Get One Input EDID Status
  kind: query
  command: "GET EDID {in}\r\n"
  params:
    - name: in
      type: string
      description: HDMI input (in1..in8)

- id: write_edid
  label: Write Input EDID Block
  kind: action
  command: "SET EDID_W {in} {prm1} {prm2}\r\n"
  params:
    - name: in
      type: string
      description: HDMI input (in1..in8)
    - name: prm1
      type: string
      description: Block selector (block0 or block1)
    - name: prm2
      type: string
      description: 256 bytes of EDID data (hex converted to ASCII, space-separated)

- id: read_edid
  label: Read Output EDID
  kind: query
  command: "GET EDID_R {out}\r\n"
  params:
    - name: out
      type: string
      description: HDMI output (out1..out8)

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "RESET\r\n"
  params: []

- id: system_reboot
  label: System Reboot
  kind: action
  command: "REBOOT\r\n"
  params: []

- id: set_ir_system_code
  label: Set IR System Code
  kind: action
  command: "Set IR_SC {prm}\r\n"
  params:
    - name: prm
      type: string
      description: all, mode1 (0x00), or mode2 (0x4e)

- id: get_ir_system_code
  label: Get IR System Code
  kind: query
  command: "Get IR_SC\r\n"
  params: []

- id: help
  label: Get API List
  kind: query
  command: "help\r\n"
  params: []

- id: get_ip_address
  label: Get IP Address
  kind: query
  command: "GET IPADDR\r\n"
  params: []

- id: standby
  label: Set Standby
  kind: action
  command: "STANDBY\r\n"
  params: []

- id: wake
  label: Set Wake
  kind: action
  command: "WAKE\r\n"
  params: []

- id: get_standby
  label: Get Standby/Wake Status
  kind: query
  command: "GET STANDBY\r\n"
  params: []

- id: hardware_reboot
  label: Hardware Reboot
  kind: action
  command: "HW_REBOOT\r\n"
  params: []

- id: get_firmware_version
  label: Get Firmware Version
  kind: query
  command: "GET VER\r\n"
  params: []

- id: save_preset
  label: Save Preset Scene
  kind: action
  command: "SAVE PRESET {prm}\r\n"
  params:
    - name: prm
      type: integer
      description: Preset number (1, 2, or 3)

- id: restore_preset
  label: Restore Preset Scene
  kind: action
  command: "RESTORE PRESET {prm}\r\n"
  params:
    - name: prm
      type: integer
      description: Preset number (1, 2, or 3)

- id: set_hdcp_output
  label: Set Output HDCP
  kind: action
  command: "SET HDCP {out} {prm}\r\n"
  params:
    - name: out
      type: string
      description: HDMI output (out1..out8 or all)
    - name: prm
      type: string
      description: follow, hdcp1.4, or off

- id: get_hdcp_output
  label: Get Output HDCP
  kind: query
  command: "GET HDCP {out}\r\n"
  params:
    - name: out
      type: string
      description: HDMI output (out1..out8 or all)
```

## Feedbacks
```yaml
# UNRESOLVED: remove this comment and populate from source
```

## Variables
```yaml
# UNRESOLVED: source exposes no settable scalar parameters outside the
# discrete Actions above. Section omitted.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. Section omitted.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences. Section omitted.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Command keywords are case insensitive per source.
- Every command and response is terminated with `<CR><LF>`.
- Telnet port 23 is the stated default; some control tools/platforms omit the port. No auth on either RS-232 or Telnet.
- `SET SW` and `GET MP` use the same parameter set; `in0` means "power down the indicated output".
- EDID preset 27 is referenced in the source (prm range listed as 1-27) but the 27th preset's meaning is not in the provided excerpt — left as `UNRESOLVED` payload detail.
- `help` returns a free-form `xxxx` placeholder in the source — actual response contents not specified.
<!-- UNRESOLVED: EDID preset 27 meaning not stated in source -->
<!-- UNRESOLVED: output of `help` command not specified in source -->

## Provenance

```yaml
source_domains:
  - snapav.com
  - docs.control4.com
  - digitalautomation.us
  - snapone.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/SupportDocuments/B-660-MTRX-8x8-API-Command-Set_V1.0.1.pdf
  - https://docs.control4.com/docs/product/binary-660-series-matrix-4x2/user-guide/english/latest/binary-660-series-matrix-4x2-user-guide-rev-b.pdf
  - https://digitalautomation.us/wp-content/uploads/2022/06/Binary-B-660-MTRX-4x4-Manual.pdf
  - https://www.snapone.com/
retrieved_at: 2026-06-01T22:56:43.271Z
last_checked_at: 2026-06-04T06:30:20.294Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:30:20.294Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions matched verbatim in source; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "default IP address / DHCP vs static not stated in source"
- "remove this comment and populate from source"
- "source exposes no settable scalar parameters outside the"
- "source documents no unsolicited notifications. Section omitted."
- "source documents no multi-step sequences. Section omitted."
- "source contains no safety warnings, interlock procedures, or"
- "EDID preset 27 meaning not stated in source"
- "output of `help` command not specified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
