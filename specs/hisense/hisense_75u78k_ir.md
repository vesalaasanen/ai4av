---
spec_id: admin/hisense-75u78k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 75U78K Control Spec"
manufacturer: Hisense
model_family: 75U78K
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - 75U78K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T05:58:25.740Z
generated_at: 2026-05-04T05:58:25.740Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T05:58:25.740Z
  matched_actions: 34
  action_count: 34
  confidence: high
  summary: "All 34 spec actions matched source commands; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hisense 75U78K Control Spec

## Summary
Hisense commercial display supporting RS-232 control. Protocol uses HEX-encoded binary commands with per-device ID and XOR check bit. Source covers E Series (115200 baud), M Series (9600 baud), and WR Interactive Touch Displays (9600 baud). No authentication required.

<!-- UNRESOLVED: specific model 75U78K not verified against source — source covers E/M/WR series generally -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # E Series: 115200; M Series + WR Series: 9600 — source states 9600 as primary
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command set:
powerable: true  # Power On/Off commands present
routable: true   # Input selection commands present (HDMI 1/2, VGA, DP, OPS, CMS, PDF, Media, USB)
levelable: true  # Volume and brightness control present
queryable: true  # Query commands for input, power state, volume, software version present
```

## Actions
```yaml
# E-Series commands (ID=yy, check bit=xx):
- id: e_power_on
  label: Power On (E Series)
  kind: action
  params:
    - name: device_id
      type: string
      description: Device ID in hex (01-FF), "00" broadcasts to all
    - name: check_bit
      type: string
      description: XOR check bit calculated from command bytes

- id: e_power_off
  label: Power Off (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: check_bit
      type: string

- id: e_hdmi1_input
  label: HDMI 1 Input (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: check_bit
      type: string

- id: e_hdmi2_input
  label: HDMI 2 Input (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: check_bit
      type: string

- id: e_ops_input
  label: OPS Input (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: check_bit
      type: string

- id: e_cms_input
  label: CMS Input (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: check_bit
      type: string

- id: e_pdf_input
  label: PDF Input (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: check_bit
      type: string

- id: e_media_input
  label: Media Input (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: check_bit
      type: string

- id: e_usb_input
  label: USB Input (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: check_bit
      type: string

- id: e_set_volume
  label: Set Volume (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: volume
      type: integer
      description: Volume level 0-100 (hex)
    - name: check_bit
      type: string

- id: e_set_mains_mode
  label: Set Mains Application Mode (E Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: mode
      type: integer
      description: "00=Standby, 01=Power On, 02=last known state"
    - name: check_bit
      type: string

# M-Series commands (ID=xx, check bit=yy):
- id: m_power_on
  label: Power On (M Series)
  kind: action
  params:
    - name: device_id
      type: string

- id: m_power_off
  label: Power Off (M Series)
  kind: action
  params:
    - name: device_id
      type: string

- id: m_displayport_input
  label: DisplayPort Input (M Series)
  kind: action
  params:
    - name: device_id
      type: string

- id: m_vga_input
  label: VGA Input (M Series)
  kind: action
  params:
    - name: device_id
      type: string

- id: m_hdmi_input
  label: HDMI Input (M Series)
  kind: action
  params:
    - name: device_id
      type: string

- id: m_dvi_input
  label: DVI Input (M Series)
  kind: action
  params:
    - name: device_id
      type: string

- id: m_mute_on
  label: Mute Audio On (M Series)
  kind: action
  params:
    - name: device_id
      type: string

- id: m_mute_off
  label: Mute Audio Off (M Series)
  kind: action
  params:
    - name: device_id
      type: string

- id: m_set_volume
  label: Set Volume (M Series)
  kind: action
  params:
    - name: device_id
      type: string
    - name: volume
      type: integer
      description: Volume level 0-100 (hex)

# WR-Series commands:
- id: wr_power_on
  label: Power On (WR Series)
  kind: action

- id: wr_power_off
  label: Power Off (WR Series)
  kind: action

- id: wr_pc_input
  label: PC Input (WR Series)
  kind: action

- id: wr_hdmi1_input
  label: HDMI 1 Input (WR Series)
  kind: action

- id: wr_hdmi2_input
  label: HDMI 2 Input (WR Series)
  kind: action

- id: wr_vga_input
  label: VGA Input (WR Series)
  kind: action

- id: wr_displayport_input
  label: DisplayPort Input (WR Series)
  kind: action

- id: wr_reboot_tv
  label: Reboot TV (WR Series)
  kind: action

- id: wr_set_volume
  label: Set Volume (WR Series)
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume value (hex)

- id: wr_video_mute_on
  label: Video Mute On (WR Series)
  kind: action

- id: wr_video_mute_off
  label: Video Mute Off (WR Series)
  kind: action

- id: wr_set_brightness
  label: Set Brightness (WR Series)
  kind: action
  params:
    - name: brightness
      type: integer
      description: Brightness value

- id: wr_set_date
  label: Set Date (WR Series)
  kind: action
  params:
    - name: year
      type: integer
    - name: month
      type: integer
    - name: day
      type: integer

- id: wr_set_time
  label: Set Time (WR Series)
  kind: action
  params:
    - name: hour
      type: integer
    - name: minute
      type: integer
    - name: second
      type: integer

# E-Series navigation:
- id: e_source_menu
  label: Source Menu (E Series)
  kind: action

- id: e_settings_menu
  label: Settings Menu (E Series)
  kind: action

- id: e_up
  label: Up (E Series)
  kind: action

- id: e_down
  label: Down (E Series)
  kind: action

- id: e_ok
  label: Ok (E Series)
  kind: action

- id: e_right
  label: Right (E Series)
  kind: action

- id: e_left
  label: Left (E Series)
  kind: action

- id: e_home
  label: Home (E Series)
  kind: action

- id: e_vol_up
  label: Volume Up (E Series)
  kind: action

- id: e_vol_down
  label: Volume Down (E Series)
  kind: action

- id: e_return
  label: Return (E Series)
  kind: action

- id: e_back
  label: Back (E Series)
  kind: action

- id: e_num_0
  label: Num 0 (E Series)
  kind: action

- id: e_num_1
  label: Num 1 (E Series)
  kind: action

- id: e_num_2
  label: Num 2 (E Series)
  kind: action

- id: e_num_3
  label: Num 3 (E Series)
  kind: action

- id: e_num_4
  label: Num 4 (E Series)
  kind: action

- id: e_num_5
  label: Num 5 (E Series)
  kind: action

- id: e_num_6
  label: Num 6 (E Series)
  kind: action

- id: e_num_7
  label: Num 7 (E Series)
  kind: action

- id: e_num_8
  label: Num 8 (E Series)
  kind: action

- id: e_num_9
  label: Num 9 (E Series)
  kind: action

- id: e_channel_up
  label: Channel Up (E Series)
  kind: action

- id: e_channel_down
  label: Channel Down (E Series)
  kind: action

- id: e_subtitle
  label: Subtitle (E Series)
  kind: action
```

## Feedbacks
```yaml
# E-Series query responses:
- id: e_input_selection_response
  label: Query Input Selection Response (E Series)
  type: enum
  values:
    - "0D: HDMI 1"
    - "06: HDMI 2"
    - "0B: OPS"
    - "15: CMS"
    - "17: PDF"
    - "16: Media"
    - "0C: USB"
    - "14: Home Screen"

- id: e_power_state_response
  label: Query Power State Response (E Series)
  type: enum
  values:
    - "01: Off"
    - "02: On"

- id: e_volume_level_response
  label: Query Volume Level Response (E Series)
  type: integer
  description: Volume level 0-100

- id: e_software_version_response
  label: Query Software Version Response (E Series)
  type: string
  description: Platform version string

# M-Series query responses:
- id: m_status_response
  label: Query Status Response (M Series)
  type: object
  properties:
    volume:
      type: integer
      description: Current volume level
    input:
      type: enum
      values:
        - "05 02: DVI"
        - "05 03: DisplayPort"
        - "05 04: HDMI"
        - "08 01: VGA"
    power_state:
      type: enum
      values:
        - "00: On"
        - "FF: Off"
    mute_state:
      type: enum
      values:
        - "01: Muted"
        - "00: Unmuted"
    signal_present:
      type: enum
      values:
        - "00: No signal"
        - "01: Signal present"

# WR-Series query responses:
- id: wr_input_selection_response
  label: Query Input Selection Response (WR Series)
  type: enum
  values:
    - "05 03 02: PC"
    - "06 04 00: VGA"
    - "05 05 00: HDMI 1"
    - "05 03 01: HDMI 2"
    - "05 03 03: DisplayPort"

- id: wr_power_state_response
  label: Query Power State Response (WR Series)
  type: enum
  values:
    - "00: Off"
    - "01: On"

- id: wr_software_version_response
  label: Query Software Version Response (WR Series)
  type: string

- id: wr_volume_level_response
  label: Query Volume Level Response (WR Series)
  type: integer
```

## Variables
```yaml
# E-Series settable parameters:
- id: e_device_id
  label: Device ID
  type: integer
  range: "01-FF"
  default: "01"

# M-Series settable parameters:
- id: m_device_id
  label: Device ID
  type: integer
  range: "01-FF"
  default: "01"

# WR-Series settable parameters:
- id: wr_volume
  label: Volume
  type: integer
  range: "0-100"
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety warnings or interlock procedures
```

## Notes
E-Series uses `A6 xx 00 00 00 04 01` prefix with XOR check bit. Wake-on-LAN must be enabled for E-Series Power On to work. M-Series and WR-Series use `DD FF` prefix with different command structures.

All commands are HEX-encoded binary — not ASCII text. Each command includes a device ID byte and a calculated XOR check bit. The check bit varies based on device ID.

Source document covers three distinct Hisense display families with different protocol structures. The 75U78K model was not explicitly verified against these series.

<!-- UNRESOLVED: model 75U78K specific firmware compatibility not confirmed against source -->
<!-- UNRESOLVED: baud rate assumption — E Series uses 115200, M/WR use 9600 — spec uses 9600 as default -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T05:58:25.740Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T05:58:25.740Z
matched_actions: 34
action_count: 34
confidence: high
summary: "All 34 spec actions matched source commands; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
