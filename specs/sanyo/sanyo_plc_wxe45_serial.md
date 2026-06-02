---
spec_id: admin/sanyo-plc-wxe45
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sanyo PLC-WXE45 Control Spec"
manufacturer: Sanyo
model_family: PLC-WXE45
aliases: []
compatible_with:
  manufacturers:
    - Sanyo
  models:
    - PLC-WXE45
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/sanyo/plc-wxe45_rs232basiccommand.pdf"
retrieved_at: 2026-05-21T21:13:48.850Z
last_checked_at: 2026-06-02T05:46:11.599Z
generated_at: 2026-06-02T05:46:11.599Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "cable pinout is referenced (D-Sub 9 pin ↔ Mini 8 pin) but the exact wiring is not described in the refined source."
  - "source does not describe unsolicited notifications; projector only returns responses to commands."
  - "source does not describe multi-step sequences."
  - "source describes operational gating (commands disabled in Cooling Down / Abnormal Temperature / Power Save states) but not formal safety interlocks."
  - "D-Sub 9 ↔ Mini 8 pin cable pinout is referenced but the wiring is not in the refined source."
  - "firmware version compatibility range not stated."
  - "service-mode baud rate change procedure not documented in refined source."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:11.599Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec actions matched literally in source command tables; all transport parameters (19200 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sanyo PLC-WXE45 Control Spec

## Summary
RS-232C serial control spec for the Sanyo PLC-WXE45 projector. Commands are 2-character ASCII mnemonics sent as `"C" COMMAND [CR]`; status queries are `"CR" COMMAND [CR]`. One command per line, capital letters only, terminated by carriage return (0x0D).

<!-- UNRESOLVED: cable pinout is referenced (D-Sub 9 pin ↔ Mini 8 pin) but the exact wiring is not described in the refined source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # initial setting; 9600 also supported per source, switchable in service mode
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from C00/C01/C02 power commands
- routable        # inferred from C05/C06/C07 input select and C32/C33/C34/C50/C51/C54 sub-input commands
- queryable       # inferred from CR0/CR1/CR3/CR4/CR6/CR7 status read commands
- levelable       # inferred from C09/C0A volume and C20/C21 brightness commands
```

## Actions
```yaml
# All functional execution commands from source. Format: "C<hh>\r" where <hh> is two hex chars.
- id: power_on
  label: POWER ON
  kind: action
  command: "C00\r"
  params: []

- id: power_off_quick
  label: POWER OFF (Quick)
  kind: action
  command: "C01\r"
  params: []

- id: power_off
  label: POWER OFF
  kind: action
  command: "C02\r"
  params: []

- id: select_computer_1
  label: Computer 1
  kind: action
  command: "C05\r"
  params: []

- id: select_computer_2
  label: Computer 2
  kind: action
  command: "C06\r"
  params: []

- id: select_video
  label: Video
  kind: action
  command: "C07\r"
  params: []

- id: volume_up
  label: VOLUME +
  kind: action
  command: "C09\r"
  params: []

- id: volume_down
  label: VOLUME -
  kind: action
  command: "C0A\r"
  params: []

- id: audio_mute_on
  label: AUDIO MUTE ON
  kind: action
  command: "C0B\r"
  params: []

- id: audio_mute_off
  label: AUDIO MUTE OFF
  kind: action
  command: "C0C\r"
  params: []

- id: video_mute_on
  label: VIDEO MUTE ON
  kind: action
  command: "C0D\r"
  params: []

- id: video_mute_off
  label: VIDEO MUTE OFF
  kind: action
  command: "C0E\r"
  params: []

- id: screen_normal
  label: Screen Normal (4:3)
  kind: action
  command: "C0F\r"
  params: []

- id: screen_full
  label: Screen Full
  kind: action
  command: "C10\r"
  params: []

- id: image_standard
  label: Image Standard
  kind: action
  command: "C11\r"
  params: []

- id: image_real
  label: Image Real
  kind: action
  command: "C12\r"
  params: []

- id: image_cinema
  label: Image Cinema
  kind: action
  command: "C13\r"
  params: []

- id: image_1
  label: Image 1
  kind: action
  command: "C14\r"
  params: []

- id: image_2
  label: Image 2
  kind: action
  command: "C15\r"
  params: []

- id: image_3
  label: Image 3
  kind: action
  command: "C16\r"
  params: []

- id: image_4
  label: Image 4
  kind: action
  command: "C17\r"
  params: []

- id: image_blackboard
  label: Image Blackboard (Green)
  kind: action
  command: "C18\r"
  params: []

- id: image_dynamic
  label: Image Dynamic
  kind: action
  command: "C19\r"
  params: []

- id: menu_on
  label: MENU ON
  kind: action
  command: "C1C\r"
  params: []

- id: menu_off
  label: MENU OFF
  kind: action
  command: "C1D\r"
  params: []

- id: display_clear
  label: DISPLAY CLEAR
  kind: action
  command: "C1E\r"
  params: []

- id: brightness_up
  label: BRIGHTNESS +
  kind: action
  command: "C20\r"
  params: []

- id: brightness_down
  label: BRIGHTNESS -
  kind: action
  command: "C21\r"
  params: []

- id: image_toggle
  label: IMAGE (Toggle)
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
  label: Power Management Shut down
  kind: action
  command: "C2E\r"
  params: []

- id: dzoom_up
  label: D.ZOOM +
  kind: action
  command: "C30\r"
  params: []

- id: dzoom_down
  label: D.ZOOM -
  kind: action
  command: "C31\r"
  params: []

- id: video_auto
  label: Video Auto
  kind: action
  command: "C32\r"
  params: []

- id: video_video
  label: Video Video
  kind: action
  command: "C33\r"
  params: []

- id: video_svideo
  label: Video S-Video
  kind: action
  command: "C34\r"
  params: []

- id: image_colorboard
  label: Image Colorboard
  kind: action
  command: "C39\r"
  params: []

- id: pointer_right
  label: POINTER RIGHT
  kind: action
  command: "C3A\r"
  params: []

- id: pointer_left
  label: POINTER LEFT
  kind: action
  command: "C3B\r"
  params: []

- id: pointer_up
  label: POINTER UP
  kind: action
  command: "C3C\r"
  params: []

- id: pointer_down
  label: POINTER DOWN
  kind: action
  command: "C3D\r"
  params: []

- id: enter
  label: ENTER
  kind: action
  command: "C3F\r"
  params: []

- id: freeze_on
  label: FREEZE ON
  kind: action
  command: "C43\r"
  params: []

- id: freeze_off
  label: FREEZE OFF
  kind: action
  command: "C44\r"
  params: []

- id: computer1_analog_rgb
  label: Computer 1 Analog RGB
  kind: action
  command: "C50\r"
  params: []

- id: computer1_scart
  label: Computer 1 SCART
  kind: action
  command: "C51\r"
  params: []

- id: computer1_component
  label: Computer 1 Component
  kind: action
  command: "C54\r"
  params: []

- id: auto_pc_adj
  label: AUTO PC ADJ.
  kind: action
  command: "C89\r"
  params: []

- id: presentation_timer
  label: PRESENTATION TIMER
  kind: action
  command: "C8A\r"
  params: []

- id: keystone_up
  label: KEYSTONE ↑
  kind: action
  command: "C8E\r"
  params: []

- id: keystone_down
  label: KEYSTONE ↓
  kind: action
  command: "C8F\r"
  params: []

# Status read commands
- id: status_read
  label: Status Read
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
  label: Setting Read (Ceiling / Rear)
  kind: query
  command: "CR4\r"
  params: []

- id: temp_read
  label: Temp Read
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
# Status Read response values per source.
# Each Feedback corresponds to one status read command's acceptable response.
- id: status
  type: enum
  values:
    - "00"   # Power ON
    - "80"   # Standby
    - "40"   # Countdown in process
    - "20"   # Cooling Down in process
    - "10"   # Power Failure
    - "28"   # Cooling Down in process due to Temperature Anomaly
    - "88"   # Coming back after Temperature Anomaly
    - "24"   # Power Save / Cooling Down in process
    - "04"   # Power Save
    - "21"   # Cooling Down in process after Power off due to lamp failure
    - "81"   # Standby after Cooling Down due to lamp failure

- id: input_mode
  type: enum
  values:
    - "1"    # Computer 1 selected
    - "2"    # Computer 2 selected
    - "3"    # Video selected

- id: setting
  type: enum
  values:
    - "11"   # Normal Screen Setting
    - "10"   # Rear & Ceiling ON
    - "01"   # Rear ON
    - "00"   # Ceiling ON

- id: lamp_mode
  type: enum
  values:
    - "00"   # Light is out
    - "01"   # Light is on
```

## Variables
```yaml
# Free-form numeric/string readouts (not enum).
- id: lamp_time_hours
  type: integer
  description: Total lamp running hours (5-digit zero-padded, e.g. "00410" = 410 hours). Not actual hours, but Eco-mode-corresponding value.

- id: temperature_sensors
  type: string
  description: Three temperatures in form "%1_%2_%3" where each field is "00.0" or "-00.0" or "E00.0" (E prefix on sensor hardware error). Example: "_31.5_35.2_33.4".
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications; projector only returns responses to commands.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # C02 displays "Power OFF?" and must be sent a second time to actually shut down
interlocks: []
# UNRESOLVED: source describes operational gating (commands disabled in Cooling Down / Abnormal Temperature / Power Save states) but not formal safety interlocks.
```

## Notes
- Baud rate: initial 19200, switchable to 9600 in service mode. Source supports both values.
- Command framing: every command is a single line starting with "C" (functional) or "CR" (status read) and terminated by CR (0x0D). Commands must be capital A-Z.
- Inter-command delay: 100 ms minimum; wait for ACK before issuing next command.
- Initialization: ~5 seconds after AC plug-in during which the projector ignores all commands.
- Timeout: if a single command line takes >1 s to arrive, the buffer is cleared and the command is not executed.
- Acceptable response: ACK (0x06) + CR. Undecodable response: "?" + CR.
- Status response length varies by command (see CR0/CR1/CR3/CR4/CR6/CR7 in source).
- C02 power off is a two-step: first send displays "Power OFF?", second send executes shutdown. C01 is the quick power off variant (no confirmation).
- D.Zoom mode must be exited before screen-size commands (C0F/C10) are accepted.

<!-- UNRESOLVED: D-Sub 9 ↔ Mini 8 pin cable pinout is referenced but the wiring is not in the refined source. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: service-mode baud rate change procedure not documented in refined source. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/sanyo/plc-wxe45_rs232basiccommand.pdf"
retrieved_at: 2026-05-21T21:13:48.850Z
last_checked_at: 2026-06-02T05:46:11.599Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:11.599Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec actions matched literally in source command tables; all transport parameters (19200 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "cable pinout is referenced (D-Sub 9 pin ↔ Mini 8 pin) but the exact wiring is not described in the refined source."
- "source does not describe unsolicited notifications; projector only returns responses to commands."
- "source does not describe multi-step sequences."
- "source describes operational gating (commands disabled in Cooling Down / Abnormal Temperature / Power Save states) but not formal safety interlocks."
- "D-Sub 9 ↔ Mini 8 pin cable pinout is referenced but the wiring is not in the refined source."
- "firmware version compatibility range not stated."
- "service-mode baud rate change procedure not documented in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
