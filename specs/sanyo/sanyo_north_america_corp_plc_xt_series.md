---
spec_id: admin/sanyo-north-america-corp-plc-xt-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sanyo North America Corp PLC-XT Series Control Spec"
manufacturer: Sanyo
model_family: PLC-XT25
aliases: []
compatible_with:
  manufacturers:
    - Sanyo
    - "Sanyo North America Corp"
  models:
    - PLC-XT25
    - PLC-XT20
    - PLC-XT21
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
source_urls:
  - https://www.audiogeneral.com/Sanyo/plcxt21_rs232_basic.pdf
retrieved_at: 2026-06-11T19:06:45.648Z
last_checked_at: 2026-06-12T19:38:24.737Z
generated_at: 2026-06-12T19:38:24.737Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PLC-XT16 not explicitly covered by this source doc; family ID lumps it in but no commands verified for that model."
  - "PLC-XT16 model coverage — source doc is XT25/XT20/XT21 only. Family ID includes XT16 but no commands verified for it."
  - "firmware version compatibility range not stated in source."
  - "IP/TCP control — Crestron help file references CNSP-615 cable and 19200/8/N/1 transport for PLC-XT20, but no TCP/REST command set documented in this source."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:38:24.737Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec actions (50 functional + 6 status + 8 parameter-variants) matched verbatim in source command tables; transport baud/bits/parity/flow all confirmed. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Sanyo North America Corp PLC-XT Series Control Spec

## Summary
RS-232C ASCII command set for Sanyo PLC-XT25 / PLC-XT20 / PLC-XT21 projectors. Commands are 2-character ASCII mnemonics prefixed with "C" (or "CR" for status read) and terminated by CR (0x0D). Document covers power, input selection, volume/mute, image controls, lens shift, keystone, freeze, and status queries.

<!-- UNRESOLVED: PLC-XT16 not explicitly covered by this source doc; family ID lumps it in but no commands verified for that model. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # initial; 9600 also supported (selectable in service mode)
  data_bits: 8
  parity: none
  flow_control: none
  stop_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from C00/C01/C02 power commands
- routable  # inferred from input selection commands (C05-C08, C23-C25, C32-C34, C50-C54)
- queryable  # inferred from CR0-CR7 status read commands
- levelable  # inferred from C09/C0A (volume) and C20/C21 (brightness) commands
```

## Actions
```yaml
# Functional Execution Commands - ASCII "C{xx}" + [CR]
- id: power_on
  label: Power ON
  kind: action
  command: "C00\r"
  params: []

- id: power_off_quick
  label: Power OFF (Quick)
  kind: action
  command: "C01\r"
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "C02\r"
  params: []

- id: input_1
  label: INPUT 1
  kind: action
  command: "C05\r"
  params: []

- id: input_2
  label: INPUT 2
  kind: action
  command: "C06\r"
  params: []

- id: input_3
  label: INPUT 3
  kind: action
  command: "C07\r"
  params: []

- id: input_network
  label: NETWORK
  kind: action
  command: "C08\r"
  params: []

- id: volume_up
  label: Volume +
  kind: action
  command: "C09\r"
  params: []

- id: volume_down
  label: Volume -
  kind: action
  command: "C0A\r"
  params: []

- id: sound_mute_on
  label: Sound Mute ON
  kind: action
  command: "C0B\r"
  params: []

- id: sound_mute_off
  label: Sound Mute OFF
  kind: action
  command: "C0C\r"
  params: []

- id: video_mute_on
  label: Video Mute ON
  kind: action
  command: "C0D\r"
  params: []

- id: video_mute_off
  label: Video Mute OFF
  kind: action
  command: "C0E\r"
  params: []

- id: screen_normal_4_3
  label: Screen Normal Size (4:3)
  kind: action
  command: "C0F\r"
  params: []

- id: screen_wide_16_9
  label: Screen Wide Size (16:9)
  kind: action
  command: "C10\r"
  params: []

- id: menu_on
  label: Menu ON
  kind: action
  command: "C1C\r"
  params: []

- id: menu_off
  label: Menu OFF
  kind: action
  command: "C1D\r"
  params: []

- id: display_clear
  label: Display Clear
  kind: action
  command: "C1E\r"
  params: []

- id: brightness_up
  label: Brightness +
  kind: action
  command: "C20\r"
  params: []

- id: brightness_down
  label: Brightness -
  kind: action
  command: "C21\r"
  params: []

- id: input_2_video
  label: INPUT 2 VIDEO
  kind: action
  command: "C23\r"
  params: []

- id: input_2_component
  label: INPUT 2 Y,Pb/Cb,Pr/Cr
  kind: action
  command: "C24\r"
  params: []

- id: input_2_rgb
  label: INPUT 2 RGB
  kind: action
  command: "C25\r"
  params: []

- id: image
  label: Image
  kind: action
  command: "C27\r"
  params: []

- id: onstart_enable
  label: ON START Enable
  kind: action
  command: "C28\r"
  params: []

- id: onstart_disable
  label: ON START Disable
  kind: action
  command: "C29\r"
  params: []

- id: power_mgmt_ready
  label: Power Management Ready
  kind: action
  command: "C2A\r"
  params: []

- id: power_mgmt_off
  label: Power Management OFF
  kind: action
  command: "C2B\r"
  params: []

- id: power_mgmt_shutdown
  label: Power Management Shut Down
  kind: action
  command: "C2E\r"
  params: []

- id: dzoom_up
  label: D.Zoom +
  kind: action
  command: "C30\r"
  params: []

- id: dzoom_down
  label: D.Zoom -
  kind: action
  command: "C31\r"
  params: []

- id: input_3_auto
  label: INPUT 3 AUTO
  kind: action
  command: "C32\r"
  params: []

- id: input_3_video
  label: INPUT 3 VIDEO
  kind: action
  command: "C33\r"
  params: []

- id: input_3_svideo
  label: INPUT 3 S-VIDEO
  kind: action
  command: "C34\r"
  params: []

- id: pointer_right
  label: Pointer Right
  kind: action
  command: "C3A\r"
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  command: "C3B\r"
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  command: "C3C\r"
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  command: "C3D\r"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "C3F\r"
  params: []

- id: freeze_on
  label: Freeze ON
  kind: action
  command: "C43\r"
  params: []

- id: freeze_off
  label: Freeze OFF
  kind: action
  command: "C44\r"
  params: []

- id: zoom_down
  label: Zoom -
  kind: action
  command: "C46\r"
  params: []

- id: zoom_up
  label: Zoom +
  kind: action
  command: "C47\r"
  params: []

- id: focus_down
  label: Focus -
  kind: action
  command: "C4A\r"
  params: []

- id: focus_up
  label: Focus +
  kind: action
  command: "C4B\r"
  params: []

- id: input_1_analog_rgb
  label: INPUT 1 Analog RGB
  kind: action
  command: "C50\r"
  params: []

- id: input_1_scart
  label: INPUT 1 Scart
  kind: action
  command: "C51\r"
  params: []

- id: input_1_dvi_pc
  label: INPUT 1 DVI (PC Digital)
  kind: action
  command: "C52\r"
  params: []

- id: input_1_dvi_av_hdcp
  label: INPUT 1 DVI (AV HDCP)
  kind: action
  command: "C53\r"
  params: []

- id: input_1_component
  label: INPUT 1 Component
  kind: action
  command: "C54\r"
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "C5D\r"
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "C5E\r"
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "C5F\r"
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "C60\r"
  params: []

- id: auto_pc_adj
  label: Auto PC Adj.
  kind: action
  command: "C89\r"
  params: []

- id: presentation_timer
  label: Presentation Timer
  kind: action
  command: "C8A\r"
  params: []

- id: keystone_up
  label: Keystone ↑
  kind: action
  command: "C8E\r"
  params: []

- id: keystone_down
  label: Keystone ↓
  kind: action
  command: "C8F\r"
  params: []

# Status Read Commands - ASCII "CR{x}" + [CR]
- id: status_read
  label: Projector Status Read
  kind: query
  command: "CR0\r"
  params: []

- id: input_mode_read
  label: Input Mode Read
  kind: query
  command: "CR1\r"
  params: []

- id: lamp_time_read
  label: Lamp Time Read
  kind: query
  command: "CR3\r"
  params: []

- id: setting_read
  label: Setting Read (Ceiling/Rear)
  kind: query
  command: "CR4\r"
  params: []

- id: temp_read
  label: Temperature Read
  kind: query
  command: "CR6\r"
  params: []

- id: lamp_mode_read
  label: Lamp Mode Read
  kind: query
  command: "CR7\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "00"  # Power ON
    - "80"  # Standby
    - "40"  # Countdown in process
    - "20"  # Cooling Down in process
    - "10"  # Power Failure
    - "28"  # Cooling Down due to Temperature Anomaly
    - "88"  # Coming back after Temperature Anomaly
    - "24"  # Power Save / Cooling Down in process
    - "04"  # Power Save
    - "21"  # Cooling Down due to lamp failure
    - "81"  # Standby after Cooling Down due to lamp failure

- id: input_mode
  type: enum
  values:
    - "1"  # Input 1
    - "2"  # Input 2
    - "3"  # Input 3
    - "4"  # Input 4

- id: lamp_hours
  type: integer
  description: Total lamp running hours, 5-digit zero-padded (e.g. "00410" = 410 hours)

- id: setting_ceiling_rear
  type: enum
  values:
    - "11"  # Normal Screen
    - "10"  # Rear & Ceiling ON
    - "01"  # Rear ON
    - "00"  # Ceiling ON

- id: temperature_sensors
  type: string
  description: Three space-separated readings: sensor1_sensor2_sensor3 (format "00.0", negative as "-05.5", error as "E00.0")

- id: lamp_mode
  type: enum
  values:
    - "00"  # Lamp OFF
    - "01"  # Lamp ON
```

## Variables
```yaml
# No settable numeric/state variables beyond discrete commands.
# Baud rate is settable in service mode (9600 or 19200) but is not a runtime-controllable variable.
```

## Events
```yaml
# Source does not document unsolicited event/notification messages from projector.
```

## Macros
```yaml
# Source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # C02 displays "Power OFF?" and requires second send to execute
interlocks: []
# Source notes: 7-second internal initialization after AC plug-in (no commands accepted).
# Power management and temperature-anomaly states disable functional commands.
# Lamp-failure and power-failure cooling periods disable all functional commands.
```

## Notes
Serial cable: D-Sub 9-pin (PC) to Mini 8-pin (projector Control Port). Initial baud 19200; 9600 selectable only via service mode. Frame: 8N1, no flow control.

Command termination: every command line must end with CR (0x0D); decoder starts on CR. Buffer is cleared on LF (0x0A), EOF (0x1A), or inter-character gap > 1s. Commands must be uppercase A-Z.

Inter-command delays after ACK: 100 ms for VOLUME+/- , ZOOM UP/DOWN, FOCUS UP/DOWN, LENS-SHIFT UP/DOWN/LEFT/RIGHT; 500 ms for all other functional commands. 500 ms minimum between status read commands. Issuing a new command before ACK (or >5s without response) is dropped.

ACK response: 0x06 0x0D. Decode error response: "?" 0x0D.

C02 (Power OFF) is two-step: first send displays "Power OFF?", second send during that prompt executes the actual power-off. C01 (Quick Power OFF) skips the confirmation.

Status Read Commands (CR0–CR7) remain valid during states (countdown, cooling, abnormal temp) where Functional Execution Commands are disabled.

C28/C29, C2A/C2B/C2E (ON START, Power Management settings) are stored in EEPROM and persist across power cycles.

<!-- UNRESOLVED: PLC-XT16 model coverage — source doc is XT25/XT20/XT21 only. Family ID includes XT16 but no commands verified for it. -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: IP/TCP control — Crestron help file references CNSP-615 cable and 19200/8/N/1 transport for PLC-XT20, but no TCP/REST command set documented in this source. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
source_urls:
  - https://www.audiogeneral.com/Sanyo/plcxt21_rs232_basic.pdf
retrieved_at: 2026-06-11T19:06:45.648Z
last_checked_at: 2026-06-12T19:38:24.737Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:38:24.737Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec actions (50 functional + 6 status + 8 parameter-variants) matched verbatim in source command tables; transport baud/bits/parity/flow all confirmed. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PLC-XT16 not explicitly covered by this source doc; family ID lumps it in but no commands verified for that model."
- "PLC-XT16 model coverage — source doc is XT25/XT20/XT21 only. Family ID includes XT16 but no commands verified for it."
- "firmware version compatibility range not stated in source."
- "IP/TCP control — Crestron help file references CNSP-615 cable and 19200/8/N/1 transport for PLC-XT20, but no TCP/REST command set documented in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
