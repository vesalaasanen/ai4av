---
spec_id: admin/hisense-hl7nultra
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense HL7NULTRA Control Spec"
manufacturer: Hisense
model_family: HL7NULTRA
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - HL7NULTRA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-22T22:15:57.734Z
last_checked_at: 2026-06-26T00:52:04.870Z
generated_at: 2026-06-26T00:52:04.870Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated in source — user indicates TCP/IP supported but source only documents RS-232 serial physical layer"
  - "TCP port not stated in source"
  - "no unsolicited notification protocol documented in source"
  - "no explicit safety interlocks documented in source"
  - "TCP/IP port number not stated in source"
  - "firmware version compatibility not stated in source"
  - "power state query command not explicitly documented (POWR query not listed)"
  - "HDMI5 input index not documented in serial command table (present only in IR codes)"
  - "Power On Command Setting (PWRE) noted as \"not available in STANDBY mode\" per revision notes"
verification:
  verdict: verified
  checked_at: 2026-06-26T00:52:04.870Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "deterministic presence proof: 39/39 payloads verbatim in source; stratified Sonnet sample corroborated (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-23
---

# Hisense HL7NULTRA Control Spec

## Summary
Hisense Prosumer TV controllable via RS-232 serial (DB9) and optionally TCP/IP using a fixed-length ASCII command protocol. Supports power control, input routing, picture/audio adjustments, channel tuning, and hospitality/lockout settings.

<!-- UNRESOLVED: TCP port number not stated in source — user indicates TCP/IP supported but source only documents RS-232 serial physical layer -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: user-stated protocol; source references network MAC addressing
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands present
  - queryable    # extensive query commands returning state
  - routable     # input source selection commands present
  - levelable    # volume, brightness, contrast, backlight, etc.
```

## Actions
```yaml
actions:
  - id: power_remote_enable
    label: Enable Remote Power On
    kind: action
    command: PWRE
    params:
      - name: enable
        type: integer
        values: [0, 1]
        description: "0=disable, 1=enable RS-232 remote power on"

  - id: power_set
    label: Set Power
    kind: action
    command: POWR
    params:
      - name: state
        type: integer
        values: [0, 1]
        description: "0=standby, 1=power on"

  - id: input_select
    label: Select Input Source
    kind: action
    command: INPT
    params:
      - name: source
        type: integer
        values: [0, 1, 3, 4, 6, 9, 10, 11, 12]
        description: "0=cycle, 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"

  - id: picture_mode_set
    label: Set Picture Mode
    kind: action
    command: PMOD
    params:
      - name: mode
        type: integer
        values: [0, 2, 3, 4, 5, 6]
        description: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"

  - id: brightness_set
    label: Set Brightness
    kind: action
    command: BRIT
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: contrast_set
    label: Set Contrast
    kind: action
    command: CONT
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: color_set
    label: Set Color Saturation
    kind: action
    command: COLR
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: tint_set
    label: Set Tint
    kind: action
    command: TINT
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: sharpness_set
    label: Set Sharpness
    kind: action
    command: SHRP
    params:
      - name: value
        type: integer
        min: 0
        max: 20

  - id: aspect_ratio_set
    label: Set Aspect Ratio
    kind: action
    command: ASPT
    params:
      - name: mode
        type: integer
        values: [0, 2, 3, 4, 5, 6, 7, 8]
        description: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema"

  - id: overscan_set
    label: Set Overscan
    kind: action
    command: OVSN
    params:
      - name: state
        type: integer
        values: [0, 2]
        description: "0=On, 2=Off"

  - id: reset_picture
    label: Reset Picture Settings
    kind: action
    command: RSTP
    params:
      - name: confirm
        type: integer
        values: [1000]

  - id: color_temp_set
    label: Set Color Temperature
    kind: action
    command: CTEM
    params:
      - name: mode
        type: integer
        values: [0, 2, 3, 4]
        description: "0=High, 2=Middle, 3=Mid-Low, 4=Low"

  - id: backlight_set
    label: Set Backlight
    kind: action
    command: BKLV
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: sound_mode_set
    label: Set Sound Mode
    kind: action
    command: AMOD
    params:
      - name: mode
        type: integer
        values: [0, 2, 3, 4, 5]
        description: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"

  - id: reset_audio
    label: Reset Audio Settings
    kind: action
    command: RSTA
    params:
      - name: confirm
        type: integer
        values: [2000]

  - id: volume_set
    label: Set Volume
    kind: action
    command: VOLM
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: mute_set
    label: Set Mute
    kind: action
    command: MUTE
    params:
      - name: state
        type: integer
        values: [0, 1]
        description: "0=Mute Off, 1=Mute On"

  - id: speaker_set
    label: Set TV Speaker
    kind: action
    command: ASPK
    params:
      - name: state
        type: integer
        values: [0, 2]
        description: "0=Off, 2=On"

  - id: tuner_mode_set
    label: Set Tuner Mode
    kind: action
    command: TUNR
    params:
      - name: mode
        type: integer
        values: [0, 2]
        description: "0=Antenna, 2=Cable"

  - id: auto_search
    label: Automatic Channel Search
    kind: action
    command: TSCN
    params:
      - name: confirm
        type: integer
        values: [1]

  - id: channel_step
    label: Channel Up/Down
    kind: action
    command: CHAN
    params:
      - name: direction
        type: integer
        values: [0, 1]
        description: "0=Channel Down, 1=Channel Up"

  - id: caption_set
    label: Set Caption
    kind: action
    command: CC##
    params:
      - name: mode
        type: integer
        values: [0, 2, 3]
        description: "0=Off, 2=On, 3=CC on when mute"

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: RSET
    params:
      - name: confirm
        type: integer
        values: [9999]

  - id: language_set
    label: Set OSD Language
    kind: action
    command: LANG
    params:
      - name: lang
        type: integer
        values: [0, 2, 3]
        description: "0=English, 2=Español, 3=Français"

  - id: standby_led_set
    label: Set Standby LED
    kind: action
    command: PLED
    params:
      - name: state
        type: integer
        values: [0, 2]
        description: "0=Off, 2=On"

  - id: button_simulate
    label: Simulate Remote Button
    kind: action
    command: BTTN
    params:
      - name: button_code
        type: string
        description: "Remote button code (e.g. 1012=Power, 1031=Mute, 1036=Input, 1040=OK, 1041=Up, 1042=Down, 1043=Left, 1044=Right)"

  - id: power_off_mode_set
    label: Set Power Off Control Mode
    kind: action
    command: PBTN
    params:
      - name: mode
        type: integer
        values: [0, 1]
        description: "0=AC Only, 1=All"

  - id: volume_range_set
    label: Set Max Volume
    kind: action
    command: MAVL
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: volume_control_set
    label: Set Volume Control Mode
    kind: action
    command: SVOL
    params:
      - name: mode
        type: integer
        values: [0, 1, 2, 3]
        description: "0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"

  - id: volume_lock_set
    label: Set Volume Locked Level
    kind: action
    command: VLFL
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: remote_key_set
    label: Set Remote Key Lock
    kind: action
    command: RMOT
    params:
      - name: mode
        type: integer
        values: [0, 1, 2]
        description: "0=Enable, 1=Disable, 2=Partial"

  - id: panel_key_set
    label: Set Panel Key Lock
    kind: action
    command: PANL
    params:
      - name: state
        type: integer
        values: [0, 1]
        description: "0=Enable, 1=Disable"

  - id: menu_access_set
    label: Set Menu Access
    kind: action
    command: MENU
    params:
      - name: state
        type: integer
        values: [0, 1]
        description: "0=Enable, 1=Disable"

  - id: av_menu_set
    label: Set AV Setting Menu
    kind: action
    command: AVMN
    params:
      - name: state
        type: integer
        values: [0, 1]
        description: "0=Disable, 1=Enable"

  - id: osd_mode_set
    label: Set OSD Mode
    kind: action
    command: OSD#
    params:
      - name: state
        type: integer
        values: [0, 1]
        description: "0=Enable, 1=Disable"

  - id: input_mode_set
    label: Set Input Mode
    kind: action
    command: INPM
    params:
      - name: mode
        type: integer
        values: [0, 1, 2, 3]
        description: "0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset"

  - id: power_on_input_set
    label: Set Power On Input
    kind: action
    command: POIS
    params:
      - name: source
        type: integer
        values: [0, 1, 2, 3]
        description: "0=Last, 1=Air, 2=AV, 3=Component"

  - id: input_cycle
    label: Cycle Input
    kind: action
    command: INPT
    params:
      - name: value
        type: integer
        values: [0]
        description: "Change input signal one at a time"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_remote_state
    type: enum
    command: PWRE????
    values: [0, 1]
    description: "RS-232 remote power on setting: 0=disabled, 1=enabled"

  - id: input_source
    type: enum
    command: INPT????
    values: [1, 3, 4, 6, 9, 10, 11, 12]
    description: "Current input: 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"

  - id: picture_mode
    type: enum
    command: PMOD????
    values: [0, 2, 3, 4, 5, 6]
    description: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"

  - id: brightness
    type: integer
    command: BRIT????
    min: 0
    max: 100

  - id: contrast
    type: integer
    command: CONT????
    min: 0
    max: 100

  - id: color_saturation
    type: integer
    command: COLR????
    min: 0
    max: 100

  - id: tint
    type: integer
    command: TINT????
    min: 0
    max: 100

  - id: sharpness
    type: integer
    command: SHRP????
    min: 0
    max: 20

  - id: aspect_ratio
    type: enum
    command: ASPT????
    values: [0, 2, 3, 4, 5, 6, 7, 8]
    description: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema"

  - id: overscan
    type: enum
    command: OVSN????
    values: [0, 2]
    description: "0=On, 2=Off"

  - id: color_temp
    type: enum
    command: CTEM????
    values: [0, 2, 3, 4]
    description: "0=High, 2=Middle, 3=Mid-Low, 4=Low"

  - id: backlight
    type: integer
    command: BKLV????
    min: 0
    max: 100

  - id: sound_mode
    type: enum
    command: AMOD????
    values: [0, 2, 3, 4, 5]
    description: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"

  - id: volume
    type: integer
    command: VOLM????
    min: 0
    max: 100

  - id: mute_state
    type: enum
    command: MUTE????
    values: [0, 1]
    description: "0=Not muted, 1=Muted"

  - id: speaker_state
    type: enum
    command: ASPK????
    values: [0, 2]
    description: "0=Off, 2=On"

  - id: tuner_mode
    type: enum
    command: TUNR????
    values: [0, 2]
    description: "0=Antenna, 2=Cable"

  - id: caption_state
    type: enum
    command: CC##????
    values: [0, 2, 3]
    description: "0=Off, 2=On, 3=CC on when mute"

  - id: language
    type: enum
    command: LANG????
    values: [0, 2, 3]
    description: "0=English, 2=Español, 3=Français"

  - id: standby_led
    type: enum
    command: PLED????
    values: [0, 2]
    description: "0=Off, 2=On"

  - id: power_off_mode
    type: enum
    command: PBTN????
    values: [0, 1]
    description: "0=AC Only, 1=All"

  - id: volume_range
    type: integer
    command: MAVL????
    min: 0
    max: 100

  - id: volume_control_mode
    type: enum
    command: SVOL????
    values: [0, 1, 2, 3]
    description: "0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"

  - id: volume_lock_level
    type: integer
    command: VLFL????
    min: 0
    max: 100

  - id: remote_key_mode
    type: enum
    command: RMOT????
    values: [0, 1, 2]
    description: "0=Enable, 1=Disable, 2=Partial"

  - id: panel_key_mode
    type: enum
    command: PANL????
    values: [0, 1]
    description: "0=Enable, 1=Disable"

  - id: menu_access
    type: enum
    command: MENU????
    values: [0, 1]
    description: "0=Enable, 1=Disable"

  - id: av_menu_state
    type: enum
    command: AVMN????
    values: [0, 1]
    description: "0=Disable, 1=Enable"

  - id: osd_mode
    type: enum
    command: OSD#????
    values: [0, 1]
    description: "0=Enable, 1=Disable"

  - id: input_mode
    type: enum
    command: INPM????
    values: [0, 1, 2, 3]
    description: "0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset"

  - id: power_on_input
    type: enum
    command: POIS????
    values: [0, 1, 2, 3]
    description: "0=Last, 1=Air, 2=AV, 3=Component"
```

## Variables
```yaml
# No continuous settable parameters beyond actions above - all values are discrete commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: PWRE (power remote enable) must be enabled before standby power-on works.
# Factory reset (RSET 9999) is destructive - source does not require confirmation.
# UNRESOLVED: no explicit safety interlocks documented in source
```

## Notes
- **Protocol format**: Fixed-length ASCII. Set: `S<ClientID><COMMAND><DATA><CHECKSUM><CR>`. Query: `Q<ClientID><COMMAND>????<CHECKSUM><CR>`. Ack: `<ClientID>:<ACK><DATA><CHECKSUM><CR>`.
- **Client ID**: Last 3 hex bytes of Ethernet MAC address. Use `ALL` for broadcast to all TVs.
- **Checksum**: 8-bit checksum over entire command string including checksum byte must equal zero.
- **Termination**: CR (0x0D). Protocol is case-sensitive.
- **ACK values**: OKAY, EROR, WAIT.
- **RS-232 setup**: Must enable "Custom Installation" via Quick Settings > enter "7310" on remote.
- **DB9 pinout (male)**: 1=N/C, 2=RXD, 3=TXD, 4=DTR, 5=GND, 6=DSR, 7=RTS, 8=CTS, 9=Power Input.
- **Multiple TV support**: Commands can target individual TVs by MAC suffix or broadcast via `ALL`.

<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: power state query command not explicitly documented (POWR query not listed) -->
<!-- UNRESOLVED: HDMI5 input index not documented in serial command table (present only in IR codes) -->
<!-- UNRESOLVED: Power On Command Setting (PWRE) noted as "not available in STANDBY mode" per revision notes -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://www.hisense-b2b.com
retrieved_at: 2026-05-22T22:15:57.734Z
last_checked_at: 2026-06-26T00:52:04.870Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-26T00:52:04.870Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "deterministic presence proof: 39/39 payloads verbatim in source; stratified Sonnet sample corroborated (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated in source — user indicates TCP/IP supported but source only documents RS-232 serial physical layer"
- "TCP port not stated in source"
- "no unsolicited notification protocol documented in source"
- "no explicit safety interlocks documented in source"
- "TCP/IP port number not stated in source"
- "firmware version compatibility not stated in source"
- "power state query command not explicitly documented (POWR query not listed)"
- "HDMI5 input index not documented in serial command table (present only in IR codes)"
- "Power On Command Setting (PWRE) noted as \"not available in STANDBY mode\" per revision notes"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
