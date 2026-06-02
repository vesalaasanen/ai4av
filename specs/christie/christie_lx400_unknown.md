---
spec_id: admin/christie-lx400
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie LX400 Control Spec"
manufacturer: Christie
model_family: LX380
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - LX380
    - LX450
    - LX500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000033-01-christe-lx500-rs232-basic-codes.pdf
  - https://www.manualslib.com/manual/766245/Christie-Lx400.html
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-14T22:31:21.318Z
last_checked_at: 2026-06-02T22:05:13.022Z
generated_at: 2026-06-02T22:05:13.022Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document title references LX380/450/500; LX400 not explicitly listed in compatibility table"
  - "no IP/TCP/HTTP control documented — serial only"
  - "no continuous settable variables documented; brightness/volume/zoom/focus/keystone/lens-shift are relative step commands only"
  - "no multi-step sequences described in source"
  - "LX400 not listed in source compatibility table; source covers LX380, LX450, LX500"
  - "no pinout diagram for the dedicated serial cable"
  - "C22, C26, C2C-C2F, C35-C39, C3E, C40-C42, C45, C48-C49, C4C-C4F, C55-C5C, C80-C88, C8B-C8D, C90-C9F marked as no function in source"
  - "baud rate changeable in \"service mode\" — no details on accessing service mode"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:05:13.022Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Christie LX400 Control Spec

## Summary

RS-232 serial control spec for Christie LX-series projectors (LX380, LX450, LX500). Covers functional execution commands (power, input selection, volume, lens, keystone, zoom, focus, mute, OSD navigation) and status read commands (operating status, input mode, lamp time, temperature, screen setting, lamp mode). Commands use a simple text protocol: `"C" + 2-char hex code + CR` for actions, `"CR" + 1-char hex code + CR` for queries.

<!-- UNRESOLVED: source document title references LX380/450/500; LX400 not explicitly listed in compatibility table -->
<!-- UNRESOLVED: no IP/TCP/HTTP control documented — serial only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands present
  - routable     # input selection commands present
  - queryable    # status read commands present
  - levelable    # volume +/-, brightness +/- commands present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "C00"
    params: []

  - id: power_off_quick
    label: Power Off (Quick)
    kind: action
    command: "C01"
    params: []
    notes: Immediate power off without confirmation prompt

  - id: power_off
    label: Power Off
    kind: action
    command: "C02"
    params: []
    notes: First send displays "Power Off?"; second send executes power off

  - id: select_input_1
    label: Select Input 1
    kind: action
    command: "C05"
    params: []

  - id: select_input_2
    label: Select Input 2
    kind: action
    command: "C06"
    params: []

  - id: select_input_3
    label: Select Input 3
    kind: action
    command: "C07"
    params: []

  - id: select_network
    label: Select Network Input
    kind: action
    command: "C08"
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    command: "C09"
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: "C0A"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "C0B"
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "C0C"
    params: []

  - id: video_mute_on
    label: Video Mute On
    kind: action
    command: "C0D"
    params: []

  - id: video_mute_off
    label: Video Mute Off
    kind: action
    command: "C0E"
    params: []

  - id: screen_normal
    label: Screen Normal (4:3)
    kind: action
    command: "C0F"
    params: []

  - id: screen_wide
    label: Screen Wide (16:9)
    kind: action
    command: "C10"
    params: []

  - id: menu_on
    label: Menu On
    kind: action
    command: "C1C"
    params: []

  - id: menu_off
    label: Menu Off
    kind: action
    command: "C1D"
    params: []

  - id: display_clear
    label: Display Clear
    kind: action
    command: "C1E"
    params: []
    notes: Clears OSD unconditionally

  - id: brightness_up
    label: Brightness Up
    kind: action
    command: "C20"
    params: []

  - id: brightness_down
    label: Brightness Down
    kind: action
    command: "C21"
    params: []

  - id: input_2_video
    label: Input 2 Video
    kind: action
    command: "C23"
    params: []

  - id: input_2_component
    label: Input 2 Y,Pb/Cb,Pr/Cr
    kind: action
    command: "C24"
    params: []

  - id: input_2_rgb
    label: Input 2 RGB
    kind: action
    command: "C25"
    params: []

  - id: image_cycle
    label: Image Setting Cycle
    kind: action
    command: "C27"
    params: []

  - id: on_start_enable
    label: On Start Enable
    kind: action
    command: "C28"
    params: []
    notes: Stored in EEPROM, retained across power cycles

  - id: on_start_disable
    label: On Start Disable
    kind: action
    command: "C29"
    params: []
    notes: Stored in EEPROM, retained across power cycles

  - id: power_mgmt_ready
    label: Power Management Ready
    kind: action
    command: "C2A"
    params: []
    notes: Stored in EEPROM

  - id: power_mgmt_off
    label: Power Management Off
    kind: action
    command: "C2B"
    params: []
    notes: Stored in EEPROM

  - id: power_mgmt_shutdown
    label: Power Management Shutdown
    kind: action
    command: "C2E"
    params: []
    notes: Stored in EEPROM

  - id: digital_zoom_in
    label: Digital Zoom In
    kind: action
    command: "C30"
    params: []

  - id: digital_zoom_out
    label: Digital Zoom Out
    kind: action
    command: "C31"
    params: []

  - id: input_3_auto
    label: Input 3 Auto
    kind: action
    command: "C32"
    params: []

  - id: input_3_video
    label: Input 3 Video
    kind: action
    command: "C33"
    params: []

  - id: input_3_svideo
    label: Input 3 S-Video
    kind: action
    command: "C34"
    params: []

  - id: pointer_right
    label: Pointer Right
    kind: action
    command: "C3A"
    params: []

  - id: pointer_left
    label: Pointer Left
    kind: action
    command: "C3B"
    params: []

  - id: pointer_up
    label: Pointer Up
    kind: action
    command: "C3C"
    params: []

  - id: pointer_down
    label: Pointer Down
    kind: action
    command: "C3D"
    params: []

  - id: enter
    label: Enter
    kind: action
    command: "C3F"
    params: []

  - id: freeze_on
    label: Freeze On
    kind: action
    command: "C43"
    params: []

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "C44"
    params: []

  - id: zoom_out
    label: Zoom Out
    kind: action
    command: "C46"
    params: []

  - id: zoom_in
    label: Zoom In
    kind: action
    command: "C47"
    params: []

  - id: focus_out
    label: Focus Out
    kind: action
    command: "C4A"
    params: []
    notes: Shortens focal length, lens moves forward

  - id: focus_in
    label: Focus In
    kind: action
    command: "C4B"
    params: []
    notes: Lengthens focal length, lens moves backward

  - id: input_1_analog_rgb
    label: Input 1 Analog RGB
    kind: action
    command: "C50"
    params: []

  - id: input_1_scart
    label: Input 1 SCART
    kind: action
    command: "C51"
    params: []

  - id: input_1_dvi_pc
    label: Input 1 DVI (PC Digital)
    kind: action
    command: "C52"
    params: []

  - id: input_1_dvi_hdcp
    label: Input 1 DVI (AV HDCP)
    kind: action
    command: "C53"
    params: []

  - id: computer_component
    label: Computer Component
    kind: action
    command: "C54"
    params: []

  - id: lens_shift_up
    label: Lens Shift Up
    kind: action
    command: "C5D"
    params: []

  - id: lens_shift_down
    label: Lens Shift Down
    kind: action
    command: "C5E"
    params: []

  - id: lens_shift_left
    label: Lens Shift Left
    kind: action
    command: "C5F"
    params: []

  - id: lens_shift_right
    label: Lens Shift Right
    kind: action
    command: "C60"
    params: []

  - id: auto_pc_adj
    label: Auto PC Adjust
    kind: action
    command: "C89"
    params: []
    notes: Sending during active auto-adjust terminates the operation

  - id: presentation_timer
    label: Presentation Timer
    kind: action
    command: "C8A"
    params: []

  - id: keystone_up
    label: Keystone Up
    kind: action
    command: "C8E"
    params: []

  - id: keystone_down
    label: Keystone Down
    kind: action
    command: "C8F"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: operating_status
    label: Operating Status
    query_command: "CR0"
    type: enum
    values:
      - "00"  # Power ON
      - "80"  # Standby
      - "40"  # Countdown in process
      - "20"  # Cooling Down in process
      - "10"  # Power Failure
      - "28"  # Cooling Down due to Temperature Anomaly
      - "88"  # Recovering after Temperature Anomaly
      - "24"  # Power Save / Cooling Down in process
      - "04"  # Power Save
      - "21"  # Cooling Down due to Lamp Failure
      - "81"  # Standby after Lamp Failure

  - id: input_mode
    label: Input Mode
    query_command: "CR1"
    type: enum
    values:
      - "1"  # Input 1
      - "2"  # Input 2
      - "3"  # Input 3
      - "4"  # Input 4 (Network card models only)

  - id: lamp_time
    label: Lamp Time
    query_command: "CR3"
    type: integer
    unit: hours
    description: Total lamp running hours as 5-digit number

  - id: screen_setting
    label: Screen Setting
    query_command: "CR4"
    type: enum
    values:
      - "11"  # Normal
      - "10"  # Rear and Ceiling ON
      - "01"  # Rear ON
      - "00"  # Ceiling ON

  - id: temperature
    label: Temperature
    query_command: "CR6"
    type: string
    description: Three sensor readings as "XX.X_XX.X_XX.X" format; "E" prefix indicates hardware error

  - id: lamp_mode
    label: Lamp Mode
    query_command: "CR7"
    type: enum
    values:
      - "00"  # Lamp OFF
      - "01"  # Lamp ON
```

## Variables
```yaml
# UNRESOLVED: no continuous settable variables documented; brightness/volume/zoom/focus/keystone/lens-shift are relative step commands only
```

## Events
```yaml
# No unsolicited notifications documented; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # C02 requires double-send; C01 is immediate quick-off
interlocks:
  - 7-second initialization after AC power connection; no commands accepted during this period
  - Countdown period after Power ON; limited command set accepted
  - Cooling down period (~90s) after Power OFF; no functional commands accepted
  - Temperature anomaly triggers automatic cooling down; no functional commands accepted
  - Power Save / Cooling Down states block functional commands
  - Lamp failure triggers automatic cooling down; no functional commands accepted
```

## Notes

- Command format: `"C" + 2-char hex code + CR (0x0D)`. All command characters must be uppercase A-Z.
- Status read format: `"CR" + 1-char hex code + CR`.
- Response to valid functional command: `ACK (0x06) + CR`. Response to invalid command: `? + CR`.
- Response to valid status read: data string + CR. Response to invalid: `? + CR`.
- Buffer clears on receiving LF (0x0A), EOF (0x1A), or 1-second command timeout.
- Pipelining intervals: 100ms for volume/zoom/focus/lens-shift commands; 500ms for all others.
- Issuing a command before receiving the previous response causes malfunction, except if no response after 5 seconds.
- Baud rate initial setting is 19200; 9600 also supported. Changeable in service mode.
- Input select commands (C05-C08) skip execution if the target input is already selected.
- C54 (Computer Component) documented in command table but no dedicated section in source.

<!-- UNRESOLVED: LX400 not listed in source compatibility table; source covers LX380, LX450, LX500 -->
<!-- UNRESOLVED: no pinout diagram for the dedicated serial cable -->
<!-- UNRESOLVED: C22, C26, C2C-C2F, C35-C39, C3E, C40-C42, C45, C48-C49, C4C-C4F, C55-C5C, C80-C88, C8B-C8D, C90-C9F marked as no function in source -->
<!-- UNRESOLVED: baud rate changeable in "service mode" — no details on accessing service mode -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000033-01-christe-lx500-rs232-basic-codes.pdf
  - https://www.manualslib.com/manual/766245/Christie-Lx400.html
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-14T22:31:21.318Z
last_checked_at: 2026-06-02T22:05:13.022Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:05:13.022Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document title references LX380/450/500; LX400 not explicitly listed in compatibility table"
- "no IP/TCP/HTTP control documented — serial only"
- "no continuous settable variables documented; brightness/volume/zoom/focus/keystone/lens-shift are relative step commands only"
- "no multi-step sequences described in source"
- "LX400 not listed in source compatibility table; source covers LX380, LX450, LX500"
- "no pinout diagram for the dedicated serial cable"
- "C22, C26, C2C-C2F, C35-C39, C3E, C40-C42, C45, C48-C49, C4C-C4F, C55-C5C, C80-C88, C8B-C8D, C90-C9F marked as no function in source"
- "baud rate changeable in \"service mode\" — no details on accessing service mode"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
