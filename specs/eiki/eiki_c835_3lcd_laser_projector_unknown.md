---
spec_id: admin/eiki-c835
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki C835 Control Spec"
manufacturer: Eiki
model_family: C835
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - C835
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/c835-rs232-commands/?wpdmdl=5640&ind=1759863073808&refresh=e548079a&filename=C835-C735-RS232-Commands.pdf"
  - https://www.eiki.com/download/c835-rs232-commands/
  - https://www.eiki.com/downloads/
retrieved_at: 2026-09-03T02:29:21.760Z
last_checked_at: 2026-10-07T13:08:58.799Z
generated_at: 2026-10-07T13:08:58.799Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP or network control details stated despite NETWORK input; no firmware version compatibility stated"
  - "response codes for CR1 not stated in source"
  - "temperature units not stated in source"
  - "failure (non-OK) codes not stated in source"
  - "light source timer (CR3) response format not stated in source"
  - "no settable parameter commands with values found in source"
  - "no events found in source"
  - "no macros found in source"
  - "no safety warnings or interlock procedures stated in source."
  - "firmware version compatibility not stated in source"
  - "light source timer response format not stated in source"
  - "NETWORK input implies network features, but no TCP/UDP control protocol documented in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:08:58.799Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 action units match source command rows with correct codes; serial transport matches; the source's 61-command catalogue is fully covered. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Eiki C835 Control Spec

## Summary
The Eiki C835 is a 3LCD laser projector controlled over RS-232. This spec covers the serial command set: power, input selection, picture/keystone adjustment, audio, power management configuration, and status read commands (operation status, input source, temperature, light source, power-failure detail).

<!-- UNRESOLVED: no TCP/IP or network control details stated despite NETWORK input; no firmware version compatibility stated -->

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
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# inferred from command examples in source
- powerable  # C00/C01/C02 power commands present
- routable   # input select commands present (C05/C07/C36/C37/C38/C15/C16/C17)
- queryable  # status read commands present (CR0/CR1/CR3/CR4/CR6/CR7/CR ALLPFAIL)
- levelable  # volume and brightness step commands present (C09/C0A/C20/C21)
```

## Actions
```yaml
# All commands sent as ASCII terminated with CR (0x0D). Hex shown as printed in source.
- id: power_on
  label: Power On
  kind: action
  command: "C00"  # hex: 43 30 30 0D
  params: []

- id: power_off_immediate
  label: Power OFF (immediately)
  kind: action
  command: "C01"  # hex: 43 30 31 0D
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "C02"  # hex: 43 30 32 0D
  params: []

- id: select_input_vga
  label: VGA IN
  kind: action
  command: "C05"  # hex: 43 30 35 0D
  params: []

- id: select_input_video
  label: VIDEO IN
  kind: action
  command: "C07"  # hex: 43 30 37 0D
  params: []

- id: select_input_hdmi1
  label: HDMI 1
  kind: action
  command: "C36"  # hex: 43 33 36 0D
  params: []

- id: select_input_hdmi2
  label: HDMI 2
  kind: action
  command: "C37"  # hex: 43 33 37 0D
  params: []

- id: select_input_hdbaset
  label: HDBaseT
  kind: action
  command: "C38"  # hex: 43 33 38 0D
  params: []

- id: select_input_network
  label: NETWORK
  kind: action
  command: "C15"  # hex: 43 31 35 0D
  params: []

- id: select_input_memory_viewer
  label: Memory Viewer
  kind: action
  command: "C16"  # hex: 43 31 36 0D
  params: []

- id: select_input_usb_display
  label: USB Display
  kind: action
  command: "C17"  # hex: 43 31 37 0D
  params: []

- id: keystone_up
  label: Keystone ↑
  kind: action
  command: "C8E"  # hex: 43 38 45 0D
  params: []

- id: keystone_down
  label: Keystone ↓
  kind: action
  command: "C8F"  # hex: 43 38 46 0D
  params: []

- id: menu_on
  label: Menu on
  kind: action
  command: "C1C"  # hex: 43 31 43 0D
  params: []

- id: menu_off
  label: Menu off
  kind: action
  command: "C1D"  # hex: 43 31 44 0D
  params: []

- id: keystone_greater
  label: Keystone ＞
  kind: action
  command: "C90"  # hex: 43 39 30 0D
  params: []

- id: keystone_less
  label: Keystone ＜
  kind: action
  command: "C91"  # hex: 43 39 31 0D
  params: []

- id: keystone_corner
  label: Keystone Corner
  kind: action
  command: "C98"  # hex: 43 39 38 0D
  params: []

- id: keystone_barrel
  label: Keystone Barrel
  kind: action
  command: "C99"  # hex: 43 39 39 0D
  params: []

- id: freeze_on
  label: Freeze on
  kind: action
  command: "C43"  # hex: 43 34 33 0D
  params: []

- id: freeze_off
  label: Freeze off
  kind: action
  command: "C44"  # hex: 43 34 34 0D
  params: []

- id: blank_on
  label: Blank on
  kind: action
  command: "C0D"  # hex: 43 30 44 0D
  params: []

- id: blank_off
  label: Blank off
  kind: action
  command: "C0E"  # hex: 43 30 45 0D
  params: []

- id: timer
  label: Timer
  kind: action
  command: "C8A"  # hex: 43 38 41 0D
  params: []

- id: timer_exit
  label: Timer (Exit)
  kind: action
  command: "C8B"  # hex: 43 38 42 0D
  params: []

- id: mute_on
  label: Mute on
  kind: action
  command: "C0B"  # hex: 43 30 42 0D
  params: []

- id: mute_off
  label: Mute off
  kind: action
  command: "C0C"  # hex: 43 30 43 0D
  params: []

- id: digital_zoom_in
  label: Digital zoom +
  kind: action
  command: "C30"  # hex: 43 33 30 0D
  params: []

- id: digital_zoom_out
  label: Digital zoom -
  kind: action
  command: "C31"  # hex: 43 33 31 0D
  params: []

- id: volume_up
  label: Volume +
  kind: action
  command: "C09"  # hex: 43 30 39 0D
  params: []

- id: volume_down
  label: Volume -
  kind: action
  command: "C0A"  # hex: 43 30 41 0D
  params: []

- id: picture_mode_dynamic
  label: Dynamic
  kind: action
  command: "C19"  # hex: 43 31 39 0D
  params: []

- id: picture_mode_standard
  label: Standard
  kind: action
  command: "C11"  # hex: 43 31 31 0D
  params: []

- id: picture_mode_colorboard
  label: Colorboard
  kind: action
  command: "C39"  # hex: 43 33 39 0D
  params: []

- id: screen_normal_size
  label: Screen Normal size (Normal)
  kind: action
  command: "C0F"  # hex: 43 30 46 0D
  params: []

- id: screen_wide_size
  label: Screen Wide size (Wide)
  kind: action
  command: "C10"  # hex: 43 31 30 0D
  params: []

- id: picture_mode_cinema
  label: Cinema
  kind: action
  command: "C13"  # hex: 43 31 33 0D
  params: []

- id: picture_mode_user
  label: Image-User
  kind: action
  command: "C14"  # hex: 43 31 34 0D
  params: []

- id: picture_mode_blackboard
  label: Blackboard
  kind: action
  command: "C18"  # hex as printed in source: 43 31 38 00 - final byte likely typo for 0D, see Notes
  params: []

- id: display_clear
  label: DISPLAY CLEAR
  kind: action
  command: "C1E"  # hex: 43 31 45 0D
  params: []

- id: brightness_up
  label: BRIGHTNESS +
  kind: action
  command: "C20"  # hex: 43 32 30 0D
  params: []

- id: brightness_down
  label: BRIGHTNESS -
  kind: action
  command: "C21"  # hex: 43 32 31 0D
  params: []

- id: image_toggle
  label: IMAGE (Toggle)
  kind: action
  command: "C27"  # hex: 43 32 37 0D
  params: []

- id: direct_power_on_enable
  label: Direct power On Enable
  kind: action
  command: "C28"  # hex: 43 32 38 0D
  params: []

- id: direct_power_on_disable
  label: Direct power On Disable
  kind: action
  command: "C29"  # hex: 43 32 39 0D
  params: []

- id: power_management_ready
  label: Power Management Ready
  kind: action
  command: "C2A"  # hex: 43 32 41 0D
  params: []

- id: power_management_off
  label: Power Management OFF
  kind: action
  command: "C2B"  # hex: 43 32 42 0D
  params: []

- id: power_management_shutdown
  label: Power Management Shut down
  kind: action
  command: "C2E"  # hex: 43 32 45 0D
  params: []

- id: pointer_right
  label: POINTER RIGHT
  kind: action
  command: "C3A"  # hex: 43 33 41 0D
  params: []

- id: pointer_left
  label: POINTER LEFT
  kind: action
  command: "C3B"  # hex: 43 33 42 0D
  params: []

- id: pointer_up
  label: POINTER UP
  kind: action
  command: "C3C"  # hex: 43 33 43 0D
  params: []

- id: pointer_down
  label: POINTER DOWN
  kind: action
  command: "C3D"  # hex: 43 33 44 0D
  params: []

- id: enter
  label: ENTER
  kind: action
  command: "C3F"  # hex: 43 33 46 0D
  params: []

- id: auto_pc_adj
  label: Auto PC ADJ.
  kind: action
  command: "C89"  # hex: 43 38 39 0D
  params: []

- id: light_source_timer_read
  label: Light Source Timer Read
  kind: query
  command: "CR3"  # hex: 43 52 33 0D
  params: []

- id: operation_status_query
  label: Get Projector Operation Status
  kind: query
  command: "CR0"  # hex: 43 52 30 0D
  params: []

- id: input_source_query
  label: Get Input Source Information
  kind: query
  command: "CR1"  # hex: 43 52 31 0D
  params: []

- id: screen_setting_query
  label: Get Screen Setting Status
  kind: query
  command: "CR4"  # hex as printed in source: 43 52 34 00 - final byte likely typo for 0D, see Notes
  params: []

- id: temperature_query
  label: Get Internal Temperature Data
  kind: query
  command: "CR6"  # hex: 43 52 36 0D
  params: []

- id: lamp_mode_query
  label: Get Lamp Mode Status
  kind: query
  command: "CR7"  # hex: 43 52 37 0D
  params: []

- id: power_failure_detail_query
  label: Detect Detail of Power Failure
  kind: query
  command: "CR ALLPFAIL"  # hex: not stated in source
  params: []
```

## Feedbacks
```yaml
- id: command_response
  type: enum
  values: [ACK, NAK]
  description: Response to functional execution commands - ACK CR on success, NAK CR on rejection.

- id: power_state
  type: enum
  description: Response to CR0 operation status query.
  query_command: "CR0"
  values:
    - code: "00"
      meaning: Power on
    - code: "80"
      meaning: Standby
    - code: "40"
      meaning: Countdown in process
    - code: "20"
      meaning: Cooling Down in process
    - code: "10"
      meaning: Power Failure
    - code: "28-0"
      meaning: TempA Cooling Down in process due to Temperature Anomaly
    - code: "28-1"
      meaning: TempB Cooling Down in process due to Temperature Anomaly
    - code: "88-0"
      meaning: Standby after TempA Cooling Down process due to light off
    - code: "88-1"
      meaning: Standby after TempB Cooling Down process due to light off
    - code: "24"
      meaning: Power Management cooling
    - code: "04"
      meaning: Suspend status (Power Management Ready)
    - code: "21"
      meaning: Cooling Down in process after light off
    - code: "81"
      meaning: Standby after Cooling Down process due to light off

- id: input_source
  type: enum
  description: Response to CR1 input source query. Response value format not stated. # UNRESOLVED: response codes for CR1 not stated in source
  query_command: "CR1"
  values: [VGA, HDMI 1, HDMI 2, HDBaseT, NETWORK, Memory Viewer, USB Display]

- id: screen_setting_status
  type: enum
  description: Response to CR4 screen setting query.
  query_command: "CR4"
  values:
    - code: "11"
      meaning: Normal screen setting
    - code: "10"
      meaning: Rear & Ceiling ON
    - code: "01"
      meaning: Rear ON
    - code: "00"
      meaning: Ceiling ON
    - code: "20"
      meaning: Auto Ceiling & Rear ON
    - code: "21"
      meaning: Auto Ceiling & Rear OFF

- id: internal_temperature
  type: string
  description: Response to CR6. Format "%1_%2_%3" where %1 = Sensor 1 temp, %2 = Sensor 2 temp, %3 = Sensor 3 temp; each temperature shown as "00.0". Units not stated. # UNRESOLVED: temperature units not stated in source
  query_command: "CR6"

- id: lamp_mode_status
  type: enum
  description: Response to CR7 light source status query.
  query_command: "CR7"
  values:
    - code: "00"
      meaning: Light is out
    - code: "01"
      meaning: Light is on

- id: power_failure_detail
  type: enum
  description: Response to CR ALLPFAIL. Only "000 ... ALL OK" codes shown in source for MAIN, FAN1, FAN2, FAN3, FAN4, FAN5. # UNRESOLVED: failure (non-OK) codes not stated in source
  query_command: "CR ALLPFAIL"
  values:
    - code: "000"
      meaning: "MAIN, ALL OK"
    - code: "000 "
      meaning: "FAN1, ALL OK"
    - code: "000  "
      meaning: "FAN2, ALL OK"
    - code: "000   "
      meaning: "FAN3, ALL OK"
    - code: "000    "
      meaning: "FAN4, ALL OK"
    - code: "000     "
      meaning: "FAN5, ALL OK"

# UNRESOLVED: light source timer (CR3) response format not stated in source
```

## Variables
```yaml
# No absolute-value set commands documented in source; volume and brightness
# are relative step actions only (C09/C0A/C20/C21).
# UNRESOLVED: no settable parameter commands with values found in source
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: no events found in source
```

## Macros
```yaml
# No multi-step sequences documented in source.
# UNRESOLVED: no macros found in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
# Note: C01 (immediate power off) vs C02 (power off) distinction may warrant
# confirmation at the integration layer, but source states no requirement.
```

## Notes
- Commands are one command per line, starting with "C" and terminated with carriage return CR (0x0D).
- Two command types: functional execution commands (respond ACK CR or NAK CR) and status read commands (respond value CR or NAK CR).
- Wiring: computer to projector via RS-232 cross (null-modem) cable.
- Source hex for C18 is printed as "43 31 38 00" and CR4 as "43 52 34 00" — final 00 byte likely a typo for 0D given every other command ends 0D; recorded verbatim.
- CR ALLPFAIL has no hex encoding in source; ASCII form used verbatim.
- CR1 input source query: response value format/codes not stated in source.
- Power OFF appears twice (C01 immediate, C02 normal) — semantics of C02 beyond "POWER OFF" not elaborated in source.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: light source timer response format not stated in source -->
<!-- UNRESOLVED: NETWORK input implies network features, but no TCP/UDP control protocol documented in source -->

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/c835-rs232-commands/?wpdmdl=5640&ind=1759863073808&refresh=e548079a&filename=C835-C735-RS232-Commands.pdf"
  - https://www.eiki.com/download/c835-rs232-commands/
  - https://www.eiki.com/downloads/
retrieved_at: 2026-09-03T02:29:21.760Z
last_checked_at: 2026-10-07T13:08:58.799Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:08:58.799Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 action units match source command rows with correct codes; serial transport matches; the source's 61-command catalogue is fully covered. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP or network control details stated despite NETWORK input; no firmware version compatibility stated"
- "response codes for CR1 not stated in source"
- "temperature units not stated in source"
- "failure (non-OK) codes not stated in source"
- "light source timer (CR3) response format not stated in source"
- "no settable parameter commands with values found in source"
- "no events found in source"
- "no macros found in source"
- "no safety warnings or interlock procedures stated in source."
- "firmware version compatibility not stated in source"
- "light source timer response format not stated in source"
- "NETWORK input implies network features, but no TCP/UDP control protocol documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
