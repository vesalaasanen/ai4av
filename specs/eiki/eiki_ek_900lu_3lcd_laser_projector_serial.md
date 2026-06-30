---
spec_id: admin/eiki-ek-900lu-3lcd-laser-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki EK 900LU 3LCD Laser Projector Control Spec"
manufacturer: Eiki
model_family: "EK 900LU 3LCD Laser Projector"
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - "EK 900LU 3LCD Laser Projector"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-850lu-ek-900lu-rs232-commands/?wpdmdl=3549"
  - https://www.eiki.com/downloads/
retrieved_at: 2026-06-29T19:51:42.113Z
last_checked_at: 2026-06-30T07:02:07.386Z
generated_at: 2026-06-30T07:02:07.386Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document title reads \"EK 850LU series RS232 Command List\" while requested device is \"EK 900LU 3LCD Laser Projector\" — command overlap not confirmed against the 900LU unit. Voltage/current/power specs not stated. Firmware compatibility not stated."
  - "source does not give a hex byte sequence for CR ALLPFAIL"
  - "source lists input source names but does not map each to a return code string"
  - "source does not state the numeric format/units of the returned timer value"
  - "unit not explicitly stated in source; values shown as \"00.0\""
  - "line ordering and parsing format not fully specified in source"
  - "not applicable"
  - "source lists temperature/fault status codes but does not state"
  - "source document title is \"EK 850LU series RS232 Command List\" while the requested device is \"EK 900LU 3LCD Laser Projector\" — applicability of this command set to the 900LU not confirmed by the source."
  - "firmware version compatibility not stated in source."
  - "response timing, inter-command delay, and command queue depth not stated."
  - "numeric units for light-source timer and internal-temperature queries not explicitly stated."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:02:07.386Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions matched to source commands; transport parameters verified; complete coverage of documented command catalogue. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Eiki EK 900LU 3LCD Laser Projector Control Spec

## Summary
Eiki EK 900LU 3LCD laser projector controlled over RS-232C serial. Command set covers power, input selection, image modes, lens shift, zoom/focus, keystone, menu/navigation, screen/blank/still, and status queries. Each command is one line starting "C" ending CR; functional commands return ACK/NAK CR, status-read commands return a value CR.

<!-- UNRESOLVED: source document title reads "EK 850LU series RS232 Command List" while requested device is "EK 900LU 3LCD Laser Projector" — command overlap not confirmed against the 900LU unit. Voltage/current/power specs not stated. Firmware compatibility not stated. -->

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
  - powerable    # inferred: power on/off commands present (C00/C01/C02)
  - queryable    # inferred: status read commands present (CR0/CR1/CR3/CR4/CR6/CR7/CR ALLPFAIL)
  - levelable    # inferred: brightness +/- and image-mode commands present
```

## Actions
```yaml
actions:
  # --- Power ---
  - id: power_on
    label: Power On
    kind: action
    command: "C00"
    payload_hex: "43 30 30 0D"
    params: []

  - id: power_off_immediate
    label: Power OFF (immediate)
    kind: action
    command: "C01"
    payload_hex: "43 30 31 0D"
    params: []

  - id: power_off
    label: Power OFF
    kind: action
    command: "C02"
    payload_hex: "43 30 32 0D"
    params: []

  # --- Input source selection ---
  - id: select_vga_in_1
    label: VGA IN 1
    kind: action
    command: "C05"
    payload_hex: "43 30 35 0D"
    params: []

  - id: select_hdmi_2
    label: HDMI 2
    kind: action
    command: "C37"
    payload_hex: "43 33 37 0D"
    params: []

  - id: select_sdi
    label: SDI
    kind: action
    command: "C35"
    payload_hex: "43 33 35 0D"
    params: []

  - id: select_hdbaset
    label: HDBaseT
    kind: action
    command: "C38"
    payload_hex: "43 33 38 0D"
    params: []

  - id: select_dvi
    label: DVI
    kind: action
    command: "C32"
    payload_hex: "43 33 32 0D"
    params: []

  - id: select_hdmi_1
    label: HDMI 1
    kind: action
    command: "C36"
    payload_hex: "43 33 36 0D"
    params: []

  - id: select_network
    label: NETWORK
    kind: action
    command: "C15"
    payload_hex: "43 31 35 0D"
    params: []

  - id: select_memory_viewer
    label: MEMORY VIEWER
    kind: action
    command: "C16"
    payload_hex: "43 31 36 0D"
    params: []

  - id: select_usb_display
    label: USB DISPLAY
    kind: action
    command: "C17"
    payload_hex: "43 31 37 0D"
    params: []

  # --- Keystone ---
  - id: keystone_up
    label: Keystone ↑
    kind: action
    command: "C8E"
    payload_hex: "43 38 45 0D"
    params: []

  - id: keystone_down
    label: Keystone ↓
    kind: action
    command: "C8F"
    payload_hex: "43 38 46 0D"
    params: []

  - id: keystone_right
    label: Keystone →
    kind: action
    command: "C90"
    payload_hex: "43 39 30 0D"
    params: []

  - id: keystone_left
    label: Keystone ←
    kind: action
    command: "C91"
    payload_hex: "43 39 31 0D"
    params: []

  - id: keystone_corner
    label: Keystone Corner
    kind: action
    command: "C98"
    payload_hex: "43 39 38 0D"
    params: []

  - id: keystone_barrel_pin
    label: Keystone Barrel / Pin
    kind: action
    command: "C99"
    payload_hex: "43 39 39 0D"
    params: []

  # --- Menu / navigation ---
  - id: menu_on
    label: Menu on
    kind: action
    command: "C1C"
    payload_hex: "43 31 43 0D"
    params: []

  - id: menu_off
    label: Menu off
    kind: action
    command: "C1D"
    payload_hex: "43 31 44 0D"
    params: []

  - id: enter
    label: ENTER
    kind: action
    command: "C3F"
    payload_hex: "43 33 46 0D"
    params: []

  - id: pointer_right
    label: POINTER RIGHT
    kind: action
    command: "C3A"
    payload_hex: "43 33 41 0D"
    params: []

  - id: pointer_left
    label: POINTER LEFT
    kind: action
    command: "C3B"
    payload_hex: "43 33 42 0D"
    params: []

  - id: pointer_up
    label: POINTER UP
    kind: action
    command: "C3C"
    payload_hex: "43 33 43 0D"
    params: []

  - id: pointer_down
    label: POINTER DOWN
    kind: action
    command: "C3D"
    payload_hex: "43 33 44 0D"
    params: []

  # --- Still / Blank / Display ---
  - id: still_on
    label: Still on
    kind: action
    command: "C43"
    payload_hex: "43 34 33 0D"
    params: []

  - id: still_off
    label: Still off
    kind: action
    command: "C44"
    payload_hex: "43 34 34 00"  # verbatim from source (terminator 00, not 0D)
    params: []

  - id: blank_on
    label: Blank on
    kind: action
    command: "C0D"
    payload_hex: "43 30 44 00"  # verbatim from source (terminator 00, not 0D)
    params: []

  - id: blank_off
    label: Blank off
    kind: action
    command: "C0E"
    payload_hex: "43 30 45 0D"
    params: []

  - id: display_clear
    label: DISPLAY CLEAR
    kind: action
    command: "C1E"
    payload_hex: "43 31 45 0D"
    params: []

  # --- Timer ---
  - id: timer
    label: Timer
    kind: action
    command: "C8A"
    payload_hex: "43 38 41 0D"
    params: []

  - id: timer_exit
    label: Timer (Exit)
    kind: action
    command: "C8B"
    payload_hex: "43 38 42 0D"
    params: []

  # --- Zoom ---
  - id: zoom_in
    label: ZOOM+
    kind: action
    command: "C46"
    payload_hex: "43 34 36 0D"
    params: []

  - id: zoom_out
    label: ZOOM-
    kind: action
    command: "C47"
    payload_hex: "43 34 37 0D"
    params: []

  - id: digital_zoom_in
    label: Digital zoom +
    kind: action
    command: "C30"
    payload_hex: "43 33 30 0D"
    params: []

  - id: digital_zoom_out
    label: Digital zoom -
    kind: action
    command: "C31"
    payload_hex: "43 33 31 0D"
    params: []

  # --- Focus ---
  - id: focus_up
    label: FOCUS UP
    kind: action
    command: "C4A"
    payload_hex: "43 34 41 0D"
    params: []

  - id: focus_down
    label: FOCUS DOWN
    kind: action
    command: "C4B"
    payload_hex: "43 34 42 0D"
    params: []

  - id: focus_left
    label: FOCUS LEFT
    kind: action
    command: "C4C"
    payload_hex: "43 34 43 0D"
    params: []

  - id: focus_right
    label: FOCUS RIGHT
    kind: action
    command: "C4D"
    payload_hex: "43 34 44 0D"
    params: []

  # --- Lens shift / calibration ---
  - id: lens_shift_up
    label: LENS SHIFT UP
    kind: action
    command: "C5D"
    payload_hex: "43 35 44 0D"
    params: []

  - id: lens_shift_down
    label: LENS SHIFT DOWN
    kind: action
    command: "C5E"
    payload_hex: "43 35 45 0D"
    params: []

  - id: lens_shift_left
    label: LENS SHIFT LEFT
    kind: action
    command: "C5F"
    payload_hex: "43 35 46 0D"
    params: []

  - id: lens_shift_right
    label: LENS SHIFT RIGHT
    kind: action
    command: "C60"
    payload_hex: "43 36 30 0D"
    params: []

  - id: lens_calibration
    label: LENS CALIBRATION
    kind: action
    command: "CEE"
    payload_hex: "43 45 45 0D"
    params: []

  - id: auto_lensshift_center
    label: AUTO LENSSHIFT CENTER
    kind: action
    command: "CEF"
    payload_hex: "43 45 46 0D"
    params: []

  # --- Image modes ---
  - id: image_dynamic
    label: Image / Dynamic
    kind: action
    command: "C19"
    payload_hex: "43 31 39 0D"
    params: []

  - id: image_standard
    label: Image / Standard
    kind: action
    command: "C11"
    payload_hex: "43 31 31 0D"
    params: []

  - id: image_colorboard
    label: Image / Colorboard
    kind: action
    command: "C39"
    payload_hex: "43 33 39 0D"
    params: []

  - id: image_cinema
    label: Image / Cinema
    kind: action
    command: "C13"
    payload_hex: "43 31 33 0D"
    params: []

  - id: image_blackboard
    label: Image / Blackboard
    kind: action
    command: "C18"
    payload_hex: "43 31 38 00"  # verbatim from source (terminator 00, not 0D)
    params: []

  - id: image_user
    label: Image / User
    kind: action
    command: "C14"
    payload_hex: "43 31 34 0D"
    params: []

  - id: image_toggle
    label: IMAGE (Toggle)
    kind: action
    command: "C27"
    payload_hex: "43 32 37 0D"
    params: []

  # --- Screen size ---
  - id: screen_normal
    label: Screen Normal size
    kind: action
    command: "C0F"
    payload_hex: "43 30 46 0D"
    params: []

  - id: screen_wide
    label: Screen Wide size
    kind: action
    command: "C10"
    payload_hex: "43 31 30 0D"
    params: []

  # --- Brightness ---
  - id: brightness_up
    label: BRIGHTNESS +
    kind: action
    command: "C20"
    payload_hex: "43 32 30 0D"
    params: []

  - id: brightness_down
    label: BRIGHTNESS -
    kind: action
    command: "C21"
    payload_hex: "43 32 31 0D"
    params: []

  # --- Auto PC ---
  - id: auto_pc_adj
    label: Auto PC ADJ.
    kind: action
    command: "C89"
    payload_hex: "43 38 39 0D"
    params: []

  # --- Direct on / power management settings ---
  - id: direct_on_enable
    label: Direct on Enable
    kind: action
    command: "C28"
    payload_hex: "43 32 38 0D"
    params: []

  - id: direct_on_disable
    label: Direct on Disable
    kind: action
    command: "C29"
    payload_hex: "43 32 39 0D"
    params: []

  - id: power_management_ready
    label: Power Management Ready
    kind: action
    command: "C2A"
    payload_hex: "43 32 41 0D"
    params: []

  - id: power_management_off
    label: Power Management OFF
    kind: action
    command: "C2B"
    payload_hex: "43 32 42 0D"
    params: []

  - id: power_management_shutdown
    label: Power Management Shut down
    kind: action
    command: "C2E"
    payload_hex: "43 32 45 0D"
    params: []

  # --- Status read commands (kind: query) ---
  - id: light_source_timer_read
    label: Light source Timer Read
    kind: query
    command: "CR3"
    payload_hex: "43 52 33 0D"
    params: []

  - id: operation_status_query
    label: Get the projector's operation status
    kind: query
    command: "CR0"
    payload_hex: "43 52 30 0D"
    params: []

  - id: input_source_info_query
    label: Get the information of input source
    kind: query
    command: "CR1"
    payload_hex: "43 52 31 0D"
    params: []

  - id: screen_setting_status_query
    label: Get screen setting status
    kind: query
    command: "CR4"
    payload_hex: "43 52 34 00"  # verbatim from source (terminator 00, not 0D)
    params: []

  - id: temperature_data_query
    label: Get the temperature data inside the projector
    kind: query
    command: "CR6"
    payload_hex: "43 52 36 0D"
    params: []

  - id: lamp_mode_status_query
    label: Get the lamp mode status
    kind: query
    command: "CR7"
    payload_hex: "43 52 37 0D"
    params: []

  - id: power_failure_detail_query
    label: Detect detail of the power failure
    kind: query
    command: "CR ALLPFAIL"
    params: []
    # UNRESOLVED: source does not give a hex byte sequence for CR ALLPFAIL
```

## Feedbacks
```yaml
feedbacks:
  - id: operation_status
    type: enum
    query: operation_status_query
    values:
      - { code: "00", label: Power on }
      - { code: "80", label: standby }
      - { code: "40", label: Countdown in process }
      - { code: "20", label: Cooling Down in process }
      - { code: "10", label: Power Failure }
      - { code: "28-0", label: "TEMP Sensor A cooling down in process due to Temperature Anomaly" }
      - { code: "28-1", label: "TEMP Sensor B cooling down in process due to Temperature Anomaly" }
      - { code: "28-2", label: "TEMP Sensor C cooling down in process due to Temperature Anomaly" }
      - { code: "88-0", label: "Standby after Temp sensor A Cooling Down due to lamp off caused temperature abnormal" }
      - { code: "88-1", label: "Standby after Temp sensor B Cooling Down due to lamp off caused temperature abnormal" }
      - { code: "88-2", label: "Standby after Temp sensor C Cooling Down due to lamp off caused temperature abnormal" }
      - { code: "24", label: Power Management cooling }
      - { code: "04", label: "suspend status (Power management Ready)" }
      - { code: "21", label: "Cooling Down in process after lamp off" }
      - { code: "81", label: "Standby after Cooling Down process due to lamp off" }

  - id: input_source
    type: enum
    query: input_source_info_query
    values:
      - { label: "VGA 1" }
      - { label: "HDMI 1" }
      - { label: "HDMI 2" }
      - { label: "HDBASET" }
      - { label: "SDI" }
      - { label: "DVI" }
      - { label: "Memory Viewer" }
      - { label: "Network" }
      - { label: "USB display" }
    # UNRESOLVED: source lists input source names but does not map each to a return code string

  - id: screen_setting
    type: enum
    query: screen_setting_status_query
    values:
      - { code: "11", label: "Normal screen setting" }
      - { code: "10", label: "Rear & Ceiling ON" }
      - { code: "01", label: "Rear ON" }
      - { code: "00", label: "Ceiling ON" }
      - { code: "20", label: "Auto Ceiling and Rear ON" }
      - { code: "21", label: "Auto Ceiling and Rear OFF" }

  - id: lamp_mode
    type: enum
    query: lamp_mode_status_query
    values:
      - { code: "00", label: "Light is out" }
      - { code: "01", label: "Light is on" }

  - id: light_source_timer
    type: numeric
    query: light_source_timer_read
    unit: hours
    # UNRESOLVED: source does not state the numeric format/units of the returned timer value

  - id: internal_temperature
    type: numeric
    query: temperature_data_query
    fields:
      - sensor_1
      - sensor_2
      - sensor_3
    format: "%1_%2_%3"
    unit: degrees_celsius  # UNRESOLVED: unit not explicitly stated in source; values shown as "00.0"

  - id: power_failure_detail
    type: string
    query: power_failure_detail_query
    # Returns lines such as "000 MAIN, ALL OK", "000 FAN-1, 3.3V OK", ... "000 FAN-13, 3.3 OK"
    # UNRESOLVED: line ordering and parsing format not fully specified in source

  - id: command_ack
    type: enum
    values:
      - { code: ACK, label: command accepted }
      - { code: NAK, label: command rejected }
    # Returned after functional execution commands
```

## Variables
```yaml
# No continuously-settable parameter values documented; brightness/zoom/focus/
# lens-shift are step/toggle commands, not value-set commands.
# UNRESOLVED: not applicable
```

## Events
```yaml
# Source does not document any unsolicited notifications from the projector.
# UNRESOLVED: not applicable
```

## Macros
```yaml
# No multi-step sequences documented in source.
# UNRESOLVED: not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power OFF immediately (C01) bypasses normal cooldown - verify intended before sending."
  - "Multiple temperature-failure states (codes 28-x, 88-x, 10, 21, 81) imply cooling/thermal interlock sequences the projector enforces internally."
# UNRESOLVED: source lists temperature/fault status codes but does not state
# required operator interlock procedures, power-on sequencing, or service limits.
# Do not infer recovery sequences.
```

## Notes
- Command framing: each command is one line beginning with ASCII "C" (0x43) ending with CR (0x0D). A few rows in the source table show terminator 00 instead of 0D (C44 Still off, C0D Blank on, C18 Image/Blackboard, CR4 screen status) — bytes are copied verbatim; verify on device.
- Wiring: RS-232 cross (null-modem) cable between computer and projector.
- Functional execution commands return `ACK CR` or `NAK CR`; status-read commands return the value followed by CR, or `NAK CR` on error.
- Status code "10" = Power Failure; `CR ALLPFAIL` returns a per-subsystem breakdown (MAIN, FAN-1..FAN-13 with 3.3V status lines).

<!-- UNRESOLVED: source document title is "EK 850LU series RS232 Command List" while the requested device is "EK 900LU 3LCD Laser Projector" — applicability of this command set to the 900LU not confirmed by the source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: response timing, inter-command delay, and command queue depth not stated. -->
<!-- UNRESOLVED: numeric units for light-source timer and internal-temperature queries not explicitly stated. -->

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-850lu-ek-900lu-rs232-commands/?wpdmdl=3549"
  - https://www.eiki.com/downloads/
retrieved_at: 2026-06-29T19:51:42.113Z
last_checked_at: 2026-06-30T07:02:07.386Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:02:07.386Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions matched to source commands; transport parameters verified; complete coverage of documented command catalogue. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document title reads \"EK 850LU series RS232 Command List\" while requested device is \"EK 900LU 3LCD Laser Projector\" — command overlap not confirmed against the 900LU unit. Voltage/current/power specs not stated. Firmware compatibility not stated."
- "source does not give a hex byte sequence for CR ALLPFAIL"
- "source lists input source names but does not map each to a return code string"
- "source does not state the numeric format/units of the returned timer value"
- "unit not explicitly stated in source; values shown as \"00.0\""
- "line ordering and parsing format not fully specified in source"
- "not applicable"
- "source lists temperature/fault status codes but does not state"
- "source document title is \"EK 850LU series RS232 Command List\" while the requested device is \"EK 900LU 3LCD Laser Projector\" — applicability of this command set to the 900LU not confirmed by the source."
- "firmware version compatibility not stated in source."
- "response timing, inter-command delay, and command queue depth not stated."
- "numeric units for light-source timer and internal-temperature queries not explicitly stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
