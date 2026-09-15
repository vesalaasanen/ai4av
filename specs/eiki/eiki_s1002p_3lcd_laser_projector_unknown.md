---
spec_id: admin/eiki-s1002p-3lcd-laser-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki S1002P 3LCD Laser Projector Control Spec"
manufacturer: Eiki
model_family: S1002P
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - S1002P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/s1002p-rs232-commands/?wpdmdl=9695&ind=1787763802030&refresh=ab06dbe7&filename=S1002P-RS232-Commands.pdf"
  - https://www.eiki.com/download/s1002p-rs232-commands/
retrieved_at: 2026-09-02T20:34:21.227Z
last_checked_at: 2026-09-07T22:16:43.799Z
generated_at: 2026-09-07T22:16:43.799Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "no settable numeric parameters documented beyond UP/DOWN increment commands"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlocks, or power-on sequencing requirements stated in source"
  - "CR ALLPFAIL exact response encoding not fully specified in source; CR3 return format not specified in source"
verification:
  verdict: verified
  checked_at: 2026-09-07T22:16:43.799Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec actions map verbatim to source tokens and transport matches; source has no extra commands beyond the spec. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Eiki S1002P 3LCD Laser Projector Control Spec

## Summary
RS-232 control spec for the Eiki S1002P 3LCD laser projector. Uses a simple ASCII command protocol: each command is one line starting with "C", terminated by CR (0x0D). Source documents power, input source selection, keystone, image mode, volume, mute, freeze, blank, timer, menu, pointer, brightness, zoom, and direct-power/power-management settings, plus status query commands for operation state, input source, screen setting, internal temperature, lamp mode, light-source timer, and power-failure detail.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "C00"
  command_hex: "43 30 30 0D"
  params: []

- id: power_off_immediate
  label: Power Off (immediate)
  kind: action
  command: "C01"
  command_hex: "43 30 31 0D"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "C02"
  command_hex: "43 30 32 0D"
  params: []

- id: select_vga_in
  label: Select VGA Input
  kind: action
  command: "C05"
  command_hex: "43 30 35 0D"
  params: []

- id: select_video_in
  label: Select Video Input
  kind: action
  command: "C07"
  command_hex: "43 30 37 0D"
  params: []

- id: select_hdmi_1
  label: Select HDMI 1
  kind: action
  command: "C36"
  command_hex: "43 33 36 0D"
  params: []

- id: select_hdmi_2
  label: Select HDMI 2
  kind: action
  command: "C37"
  command_hex: "43 33 37 0D"
  params: []

- id: select_hdbaset
  label: Select HDBaseT
  kind: action
  command: "C38"
  command_hex: "43 33 38 0D"
  params: []

- id: select_network
  label: Select Network
  kind: action
  command: "C15"
  command_hex: "43 31 35 0D"
  params: []

- id: select_memory_viewer
  label: Select Memory Viewer
  kind: action
  command: "C16"
  command_hex: "43 31 36 0D"
  params: []

- id: select_usb_display
  label: Select USB Display
  kind: action
  command: "C17"
  command_hex: "43 31 37 0D"
  params: []

- id: keystone_up
  label: Keystone Up
  kind: action
  command: "C8E"
  command_hex: "43 38 45 0D"
  params: []

- id: keystone_down
  label: Keystone Down
  kind: action
  command: "C8F"
  command_hex: "43 38 46 0D"
  params: []

- id: menu_on
  label: Menu On
  kind: action
  command: "C1C"
  command_hex: "43 31 43 0D"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "C1D"
  command_hex: "43 31 44 0D"
  params: []

- id: keystone_right
  label: Keystone Right
  kind: action
  command: "C90"
  command_hex: "43 39 30 0D"
  params: []

- id: keystone_left
  label: Keystone Left
  kind: action
  command: "C91"
  command_hex: "43 39 31 0D"
  params: []

- id: keystone_corner
  label: Keystone Corner
  kind: action
  command: "C98"
  command_hex: "43 39 38 0D"
  params: []

- id: keystone_barrel
  label: Keystone Barrel
  kind: action
  command: "C99"
  command_hex: "43 39 39 0D"
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  command: "C43"
  command_hex: "43 34 33 0D"
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "C44"
  command_hex: "43 34 34 0D"
  params: []

- id: blank_on
  label: Blank On
  kind: action
  command: "C0D"
  command_hex: "43 30 44 0D"
  params: []

- id: blank_off
  label: Blank Off
  kind: action
  command: "C0E"
  command_hex: "43 30 45 0D"
  params: []

- id: timer
  label: Timer
  kind: action
  command: "C8A"
  command_hex: "43 38 41 0D"
  params: []

- id: timer_exit
  label: Timer Exit
  kind: action
  command: "C8B"
  command_hex: "43 38 42 0D"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "C0B"
  command_hex: "43 30 42 0D"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "C0C"
  command_hex: "43 30 43 0D"
  params: []

- id: digital_zoom_in
  label: Digital Zoom In
  kind: action
  command: "C30"
  command_hex: "43 33 30 0D"
  params: []

- id: digital_zoom_out
  label: Digital Zoom Out
  kind: action
  command: "C31"
  command_hex: "43 33 31 0D"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "C09"
  command_hex: "43 30 39 0D"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "C0A"
  command_hex: "43 30 41 0D"
  params: []

- id: image_mode_dynamic
  label: Image Mode Dynamic
  kind: action
  command: "C19"
  command_hex: "43 31 39 0D"
  params: []

- id: image_mode_standard
  label: Image Mode Standard
  kind: action
  command: "C11"
  command_hex: "43 31 31 0D"
  params: []

- id: image_mode_colorboard
  label: Image Mode Colorboard
  kind: action
  command: "C39"
  command_hex: "43 33 39 0D"
  params: []

- id: screen_normal
  label: Screen Normal Size
  kind: action
  command: "C0F"
  command_hex: "43 30 46 0D"
  params: []

- id: screen_wide
  label: Screen Wide Size
  kind: action
  command: "C10"
  command_hex: "43 31 30 0D"
  params: []

- id: image_mode_cinema
  label: Image Mode Cinema
  kind: action
  command: "C13"
  command_hex: "43 31 33 0D"
  params: []

- id: image_mode_user
  label: Image Mode User
  kind: action
  command: "C14"
  command_hex: "43 31 34 0D"
  params: []

- id: image_mode_blackboard
  label: Image Mode Blackboard
  kind: action
  command: "C18"
  command_hex: "43 31 38 00"
  params: []

- id: display_clear
  label: Display Clear
  kind: action
  command: "C1E"
  command_hex: "43 31 45 0D"
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  command: "C20"
  command_hex: "43 32 30 0D"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "C21"
  command_hex: "43 32 31 0D"
  params: []

- id: image_toggle
  label: Image Toggle
  kind: action
  command: "C27"
  command_hex: "43 32 37 0D"
  params: []

- id: direct_power_on_enable
  label: Direct Power On Enable
  kind: action
  command: "C28"
  command_hex: "43 32 38 0D"
  params: []

- id: direct_power_on_disable
  label: Direct Power On Disable
  kind: action
  command: "C29"
  command_hex: "43 32 39 0D"
  params: []

- id: power_management_ready
  label: Power Management Ready
  kind: action
  command: "C2A"
  command_hex: "43 32 41 0D"
  params: []

- id: power_management_off
  label: Power Management Off
  kind: action
  command: "C2B"
  command_hex: "43 32 42 0D"
  params: []

- id: power_management_shut_down
  label: Power Management Shut Down
  kind: action
  command: "C2E"
  command_hex: "43 32 45 0D"
  params: []

- id: pointer_right
  label: Pointer Right
  kind: action
  command: "C3A"
  command_hex: "43 33 41 0D"
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  command: "C3B"
  command_hex: "43 33 42 0D"
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  command: "C3C"
  command_hex: "43 33 43 0D"
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  command: "C3D"
  command_hex: "43 33 44 0D"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "C3F"
  command_hex: "43 33 46 0D"
  params: []

- id: auto_pc_adj
  label: Auto PC Adjust
  kind: action
  command: "C89"
  command_hex: "43 38 39 0D"
  params: []

- id: operation_status_query
  label: Get Operation Status
  kind: query
  command: "CR0"
  command_hex: "43 52 30 0D"
  params: []

- id: input_source_query
  label: Get Input Source
  kind: query
  command: "CR1"
  command_hex: "43 52 31 0D"
  params: []

- id: screen_setting_query
  label: Get Screen Setting Status
  kind: query
  command: "CR4"
  command_hex: "43 52 34 00"
  params: []

- id: temperature_query
  label: Get Internal Temperatures
  kind: query
  command: "CR6"
  command_hex: "43 52 36 0D"
  params: []

- id: lamp_mode_query
  label: Get Lamp Mode Status
  kind: query
  command: "CR7"
  command_hex: "43 52 37 0D"
  params: []

- id: light_source_timer_query
  label: Get Light Source Timer
  kind: query
  command: "CR3"
  command_hex: "43 52 33 0D"
  params: []

- id: power_failure_detail_query
  label: Detect Power Failure Detail
  kind: query
  command: "CR ALLPFAIL"
  params: []
```

## Feedbacks
```yaml
- id: operation_status
  type: enum
  values:
    - "00"  # Power on
    - "80"  # standby
    - "40"  # Countdown in process
    - "20"  # Cooling Down in process
    - "10"  # Power Failure
    - "28-0"  # TempA Cooling Down (Temperature Anomaly)
    - "28-1"  # TempB Cooling Down (Temperature Anomaly)
    - "88-0"  # Standby after TempA Cooling Down (light off)
    - "88-1"  # Standby after TempB Cooling Down (light off)
    - "24"  # Power Management cooling
    - "04"  # Suspend (Power management Ready)
    - "21"  # Cooling Down after light off
    - "81"  # Standby after Cooling Down (light off)

- id: input_source
  type: enum
  values:
    - VGA
    - HDMI 1
    - HDMI 2
    - HDBaseT
    - NETWORK
    - Memory Viewer
    - USB Display

- id: screen_setting
  type: enum
  values:
    - "11"  # Normal screen setting
    - "10"  # Rear & Ceiling ON
    - "01"  # Rear ON
    - "00"  # Ceiling ON
    - "20"  # Auto Ceiling & Rear ON
    - "21"  # Auto Ceiling & Rear OFF

- id: internal_temperature
  type: string
  description: Three sensor readings "%1_%2_%3" formatted as "00.0" each (sensor1_sensor2_sensor3)

- id: lamp_mode
  type: enum
  values:
    - "00"  # Light is out
    - "01"  # Light is on
```

## Variables
```yaml
<!-- UNRESOLVED: no settable numeric parameters documented beyond UP/DOWN increment commands -->
```

## Events
```yaml
<!-- UNRESOLVED: no unsolicited notification events documented in source -->
```

## Macros
```yaml
<!-- UNRESOLVED: no multi-step sequences described in source -->
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements stated in source -->
```

## Notes
- Protocol: each command is one line starting with "C" and terminated by carriage return (CR / 0x0D).
- Two command categories: functional execution (return ACK or NAK) and status read (return value or NAK).
- CR3 (Light Source Timer Read) returns accumulated light-source hours — exact return format not stated in source.
- CR ALLFAIL/CR ALLPFAIL response format (table of MAIN/FAN1..FAN5 status codes) is documented only partially in source — codes are all "000 / ALL OK" in the visible rows.
- C02 (Power Off) and C01 (Power Off immediate) are distinct — source describes C01 as "POWER OFF immediately" and C02 as standard power-off.
- C18 (Blackboard) is documented with terminator 0x00 rather than 0x0D — likely a source typo (other commands use CR).
<!-- UNRESOLVED: CR ALLPFAIL exact response encoding not fully specified in source; CR3 return format not specified in source -->

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/s1002p-rs232-commands/?wpdmdl=9695&ind=1787763802030&refresh=ab06dbe7&filename=S1002P-RS232-Commands.pdf"
  - https://www.eiki.com/download/s1002p-rs232-commands/
retrieved_at: 2026-09-02T20:34:21.227Z
last_checked_at: 2026-09-07T22:16:43.799Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-07T22:16:43.799Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec actions map verbatim to source tokens and transport matches; source has no extra commands beyond the spec. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "no settable numeric parameters documented beyond UP/DOWN increment commands"
- "no unsolicited notification events documented in source"
- "no multi-step sequences described in source"
- "no safety warnings, interlocks, or power-on sequencing requirements stated in source"
- "CR ALLPFAIL exact response encoding not fully specified in source; CR3 return format not specified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
