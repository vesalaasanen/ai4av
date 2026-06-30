---
spec_id: admin/eiki-pro-v2000-3lcd-laser-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki Pro V2000 3LCD Laser Projector Control Spec"
manufacturer: Eiki
model_family: "Eiki Pro V2000 3LCD Laser Projector"
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - "Eiki Pro V2000 3LCD Laser Projector"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/pro-v2000-rs232-commands/?wpdmdl=3522"
  - "https://www.eiki.com/download/pro-v2000-owners-manual/?wpdmdl=3190"
retrieved_at: 2026-06-29T19:50:14.782Z
last_checked_at: 2026-06-30T07:05:03.615Z
generated_at: 2026-06-30T07:05:03.615Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Voltage/power/current specs not present in source."
  - "source documents no numeric set-by-value variables (e.g. brightness/keystone"
  - "source documents no unsolicited notifications. All responses are replies to commands."
  - "source documents no multi-step command sequences."
  - "source contains no explicit safety warnings or interlock procedures."
  - "firmware version compatibility not stated. Exact NAK code byte value not stated (source writes \"NAK\" but no hex). Light-source timer units and CR3 response format not exemplified. Power-failure response string format for non-OK states not exemplified."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:05:03.615Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions matched literally in source; transport parameters verified; full bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Eiki Pro V2000 3LCD Laser Projector Control Spec

## Summary
The Eiki Pro V2000 is a 3LCD laser projector controlled via an asynchronous RS-232C serial interface. This spec covers functional execution commands (power, input selection, lens/keystone/zoom, image modes, screen, brightness, power management) and status read commands (operation status, input source, screen setting, temperature, lamp mode, light-source timer, power-failure detail).

<!-- UNRESOLVED: firmware version compatibility not stated in source. Voltage/power/current specs not present in source. -->

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

Notes on framing: commands are one-per-line, ASCII, start with "C" and end with a carriage return (CR, 0x0D). Device returns ACK CR or NAK CR. Source documents some rows with an 00 byte in place of the CR terminator (C44, C0D, C18, CR4) — these are preserved verbatim as written in the source and flagged in the action notes; the implementer should treat the documented terminator as authoritative.

## Traits
```yaml
traits:
  - powerable    # inferred: C00/C01/C02 power commands present
  - routable     # inferred: C05/C36/C37/C35/C38/C32/C15/C16/C17 input selection present
  - queryable    # inferred: CR0/CR1/CR3/CR4/CR6/CR7/CR ALLPFAIL status reads present
  - levelable    # inferred: C20/C21 brightness, C46/C47 zoom, C4A-C4D focus present
```

## Actions
```yaml
# All payloads copied verbatim from source. Documented terminator is CR (0x0D).
# Where the source row shows an 00 byte instead of 0D (C44, C0D, C18, CR4), the
# literal documented hex is preserved in notes; the command field uses the ASCII
# mnemonic as the primary implementable payload.

- id: power_on
  label: Power On
  kind: action
  command: "C00"
  params: []
  notes: "HEX 43 30 30 0D. Returns ACK CR or NAK CR."

- id: power_off_immediate
  label: Power OFF (immediately)
  kind: action
  command: "C01"
  params: []
  notes: "HEX 43 30 31 0D. Power OFF immediately."

- id: power_off
  label: Power OFF
  kind: action
  command: "C02"
  params: []
  notes: "HEX 43 30 32 0D."

- id: select_vga_in_1
  label: VGA IN 1
  kind: action
  command: "C05"
  params: []
  notes: "HEX 43 30 35 0D. Input select."

- id: select_hdmi_2
  label: HDMI 2
  kind: action
  command: "C37"
  params: []
  notes: "HEX 43 33 37 0D. Input select."

- id: select_sdi
  label: SDI
  kind: action
  command: "C35"
  params: []
  notes: "HEX 43 33 35 0D. Input select."

- id: select_hdbaset
  label: HDBaseT
  kind: action
  command: "C38"
  params: []
  notes: "HEX 43 33 38 0D. Input select."

- id: select_dvi
  label: DVI
  kind: action
  command: "C32"
  params: []
  notes: "HEX 43 33 32 0D. Input select."

- id: select_hdmi_1
  label: HDMI 1
  kind: action
  command: "C36"
  params: []
  notes: "HEX 43 33 36 0D. Input select."

- id: select_network
  label: NETWORK
  kind: action
  command: "C15"
  params: []
  notes: "HEX 43 31 35 0D. Input select."

- id: select_memory_viewer
  label: MEMORY VIEWER
  kind: action
  command: "C16"
  params: []
  notes: "HEX 43 31 36 0D. Input select."

- id: select_usb_display
  label: USB DISPLAY
  kind: action
  command: "C17"
  params: []
  notes: "HEX 43 31 37 0D. Input select."

- id: keystone_up
  label: Keystone Up
  kind: action
  command: "C8E"
  params: []
  notes: "HEX 43 38 45 0D."

- id: keystone_down
  label: Keystone Down
  kind: action
  command: "C8F"
  params: []
  notes: "HEX 43 38 46 0D."

- id: keystone_right
  label: Keystone Right
  kind: action
  command: "C90"
  params: []
  notes: "HEX 43 39 30 0D."

- id: keystone_left
  label: Keystone Left
  kind: action
  command: "C91"
  params: []
  notes: "HEX 43 39 31 0D."

- id: keystone_corner
  label: Keystone Corner
  kind: action
  command: "C98"
  params: []
  notes: "HEX 43 39 38 0D."

- id: keystone_barrel
  label: Keystone Barrel
  kind: action
  command: "C99"
  params: []
  notes: "HEX 43 39 39 0D."

- id: menu_on
  label: Menu On
  kind: action
  command: "C1C"
  params: []
  notes: "HEX 43 31 43 0D."

- id: menu_off
  label: Menu Off
  kind: action
  command: "C1D"
  params: []
  notes: "HEX 43 31 44 0D."

- id: still_on
  label: Still On
  kind: action
  command: "C43"
  params: []
  notes: "HEX 43 34 33 0D."

- id: still_off
  label: Still Off
  kind: action
  command: "C44"
  params: []
  notes: "HEX 43 34 34 00. Source row documents 00 terminator instead of 0D - likely typo; verify on device."

- id: blank_on
  label: Blank On
  kind: action
  command: "C0D"
  params: []
  notes: "HEX 43 30 44 00. Source row documents 00 terminator instead of 0D - likely typo; verify on device."

- id: blank_off
  label: Blank Off
  kind: action
  command: "C0E"
  params: []
  notes: "HEX 43 30 45 0D."

- id: timer
  label: Timer
  kind: action
  command: "C8A"
  params: []
  notes: "HEX 43 38 41 0D."

- id: timer_exit
  label: Timer (Exit)
  kind: action
  command: "C8B"
  params: []
  notes: "HEX 43 38 42 0D."

- id: zoom_plus
  label: ZOOM +
  kind: action
  command: "C46"
  params: []
  notes: "HEX 43 34 36 0D."

- id: zoom_minus
  label: ZOOM -
  kind: action
  command: "C47"
  params: []
  notes: "HEX 43 34 37 0D."

- id: digital_zoom_plus
  label: Digital zoom +
  kind: action
  command: "C30"
  params: []
  notes: "HEX 43 33 30 0D."

- id: digital_zoom_minus
  label: Digital zoom -
  kind: action
  command: "C31"
  params: []
  notes: "HEX 43 33 31 0D."

- id: focus_up
  label: FOCUS UP
  kind: action
  command: "C4A"
  params: []
  notes: "HEX 43 34 41 0D."

- id: focus_down
  label: FOCUS DOWN
  kind: action
  command: "C4B"
  params: []
  notes: "HEX 43 34 42 0D."

- id: focus_left
  label: FOCUS LEFT
  kind: action
  command: "C4C"
  params: []
  notes: "HEX 43 34 43 0D."

- id: focus_right
  label: FOCUS RIGHT
  kind: action
  command: "C4D"
  params: []
  notes: "HEX 43 34 44 0D."

- id: lens_shift_up
  label: LENS SHIFT UP
  kind: action
  command: "C5D"
  params: []
  notes: "HEX 43 35 44 0D."

- id: lens_shift_down
  label: LENS SHIFT DOWN
  kind: action
  command: "C5E"
  params: []
  notes: "HEX 43 35 45 0D."

- id: lens_shift_left
  label: LENS SHIFT LEFT
  kind: action
  command: "C5F"
  params: []
  notes: "HEX 43 35 46 0D."

- id: lens_shift_right
  label: LENS SHIFT RIGHT
  kind: action
  command: "C60"
  params: []
  notes: "HEX 43 36 30 0D."

- id: lens_calibration
  label: LENS CALIBRATION
  kind: action
  command: "CEE"
  params: []
  notes: "HEX 43 45 45 0D."

- id: auto_lensshift_center
  label: AUTO LENSSHIFT CENTER
  kind: action
  command: "CEF"
  params: []
  notes: "HEX 43 45 46 0D."

- id: image_dynamic
  label: Image Dynamic
  kind: action
  command: "C19"
  params: []
  notes: "HEX 43 31 39 0D. Image mode select."

- id: image_standard
  label: Image Standard
  kind: action
  command: "C11"
  params: []
  notes: "HEX 43 31 31 0D. Image mode select."

- id: image_colorboard
  label: Image Colorboard
  kind: action
  command: "C39"
  params: []
  notes: "HEX 43 33 39 0D. Image mode select."

- id: image_cinema
  label: Image Cinema
  kind: action
  command: "C13"
  params: []
  notes: "HEX 43 31 33 0D. Image mode select."

- id: image_blackboard
  label: Image Blackboard
  kind: action
  command: "C18"
  params: []
  notes: "HEX 43 31 38 00. Source row documents 00 terminator instead of 0D - likely typo; verify on device. Image mode select."

- id: image_user
  label: Image User
  kind: action
  command: "C14"
  params: []
  notes: "HEX 43 31 34 0D. Image mode select."

- id: screen_normal
  label: Screen Normal size
  kind: action
  command: "C0F"
  params: []
  notes: "HEX 43 30 46 0D."

- id: screen_wide
  label: Screen Wide size
  kind: action
  command: "C10"
  params: []
  notes: "HEX 43 31 30 0D."

- id: display_clear
  label: DISPLAY CLEAR
  kind: action
  command: "C1E"
  params: []
  notes: "HEX 43 31 45 0D."

- id: brightness_plus
  label: BRIGHTNESS +
  kind: action
  command: "C20"
  params: []
  notes: "HEX 43 32 30 0D."

- id: brightness_minus
  label: BRIGHTNESS -
  kind: action
  command: "C21"
  params: []
  notes: "HEX 43 32 31 0D."

- id: image_toggle
  label: IMAGE (Toggle)
  kind: action
  command: "C27"
  params: []
  notes: "HEX 43 32 37 0D."

- id: direct_on_enable
  label: Direct on Enable
  kind: action
  command: "C28"
  params: []
  notes: "HEX 43 32 38 0D."

- id: direct_on_disable
  label: Direct on Disable
  kind: action
  command: "C29"
  params: []
  notes: "HEX 43 32 39 0D."

- id: power_management_ready
  label: Power Management Ready
  kind: action
  command: "C2A"
  params: []
  notes: "HEX 43 32 41 0D."

- id: power_management_off
  label: Power Management OFF
  kind: action
  command: "C2B"
  params: []
  notes: "HEX 43 32 42 0D."

- id: power_management_shutdown
  label: Power Management Shut down
  kind: action
  command: "C2E"
  params: []
  notes: "HEX 43 32 45 0D."

- id: pointer_right
  label: POINTER RIGHT
  kind: action
  command: "C3A"
  params: []
  notes: "HEX 43 33 41 0D."

- id: pointer_left
  label: POINTER LEFT
  kind: action
  command: "C3B"
  params: []
  notes: "HEX 43 33 42 0D."

- id: pointer_up
  label: POINTER UP
  kind: action
  command: "C3C"
  params: []
  notes: "HEX 43 33 43 0D."

- id: pointer_down
  label: POINTER DOWN
  kind: action
  command: "C3D"
  params: []
  notes: "HEX 43 33 44 0D."

- id: enter
  label: ENTER
  kind: action
  command: "C3F"
  params: []
  notes: "HEX 43 33 46 0D."

- id: auto_pc_adj
  label: Auto PC ADJ.
  kind: action
  command: "C89"
  params: []
  notes: "HEX 43 38 39 0D."

# --- Status read (query) commands ---

- id: light_source_timer_read
  label: Light source Timer Read
  kind: query
  command: "CR3"
  params: []
  notes: "HEX 43 52 33 0D. Returns light source timer."

- id: operation_status_read
  label: Get projector operation status
  kind: query
  command: "CR0"
  params: []
  notes: "HEX 43 52 30 0D. Returns a status code; see feedback operation_status for the documented value map."

- id: input_source_read
  label: Get input source information
  kind: query
  command: "CR1"
  params: []
  notes: "HEX 43 52 31 0D. Returns current input source name."

- id: screen_setting_read
  label: Get screen setting status
  kind: query
  command: "CR4"
  params: []
  notes: "HEX 43 52 34 00. Source row documents 00 terminator instead of 0D - likely typo; verify on device."

- id: temperature_read
  label: Get temperature data inside the projector
  kind: query
  command: "CR6"
  params: []
  notes: "HEX 43 52 36 0D. Returns 4 sensor values formatted '00.0' as '%1_%2_%3_%4'."

- id: lamp_mode_read
  label: Get lamp mode status
  kind: query
  command: "CR7"
  params: []
  notes: "HEX 43 52 37 0D. Returns '00' light out / '01' light on."

- id: power_failure_detail
  label: Detect detail of the power failure
  kind: query
  command: "CR ALLPFAIL"
  params: []
  notes: "Returns per-subsystem status (MAIN, FAN-1..13, LENS, CW) with OK/FAIL strings."
```

## Feedbacks
```yaml
- id: operation_status
  type: enum
  values:
    - "00"      # Power on
    - "80"      # Standby
    - "40"      # Countdown in process
    - "20"      # Cooling Down in process
    - "10"      # Power Failure
    - "28-0"    # TEMP Sensor A cooling down in process due to Temperature Anomaly
    - "28-1"    # TEMP Sensor B cooling down in process due to Temperature Anomaly
    - "28-2"    # TEMP Sensor C cooling down in process due to Temperature Anomaly
    - "28-3"    # TEMP Sensor D cooling down in process due to Temperature Anomaly
    - "88-0"    # Standby after Temp sensor A cooling down (lamp off temp anomaly)
    - "88-1"    # Standby after Temp sensor B cooling down (lamp off temp anomaly)
    - "88-2"    # Standby after Temp sensor C cooling down (lamp off temp anomaly)
    - "88-3"    # Standby after Temp sensor D cooling down (lamp off temp anomaly)
    - "24"      # Power Management cooling
    - "04"      # Suspend status (Power management Ready)
    - "21"      # Cooling Down in process after lamp off
    - "81"      # Standby after Cooling Down process due to lamp off
  notes: "Source: CR0 response map."

- id: input_source
  type: enum
  values:
    - "VGA 1"
    - "HDMI 1"
    - "HDMI 2"
    - "HDBASET"
    - "DVI"
    - "Memory Viewer"
    - "Network"
    - "USB display"
  notes: "Source: CR1 response values. SDI listed as a settable input (C35) but not enumerated in the CR1 response table."

- id: screen_setting
  type: enum
  values:
    - "11"   # Normal screen setting
    - "10"   # Rear & Ceiling ON
    - "01"   # Rear ON
    - "00"   # Ceiling ON
    - "20"   # Auto Ceiling and Rear ON
    - "21"   # Auto Ceiling and Rear OFF
  notes: "Source: CR4 response map."

- id: lamp_mode
  type: enum
  values:
    - "00"   # Light is out
    - "01"   # Light is on
  notes: "Source: CR7 response map."

- id: temperature_data
  type: string
  format: "%1_%2_%3_%4"
  notes: "Source: CR6 response. %1..%4 = Sensor 1..4 temperature, shown as '00.0'."

- id: command_ack
  type: enum
  values:
    - ACK
    - NAK
  notes: "Returned by projector after accepting functional execution command, followed by CR."
```

## Variables
```yaml
# UNRESOLVED: source documents no numeric set-by-value variables (e.g. brightness/keystone
# are increment/decrement only via C20/C21 and C8E..C99). No direct value-set syntax present.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Note: POWER OFF immediately (C01) vs POWER OFF (C02) distinction is documented but
# sequencing requirements are not stated. Cooling-down status codes (20, 21, 24) exist
# in CR0 but no mandatory wait procedure is specified in source.
```

## Notes
- Commands are ASCII, one per line, starting with "C", terminated by CR (0x0D). Source labels the command column "Command (HEX+CR)" and gives both the mnemonic (e.g. C00) and the hex byte sequence (e.g. 43 30 30 0D).
- Four rows in the source table show an 00 byte in the documented hex where a 0D CR terminator is expected (C44, C0D, C18, CR4). These are preserved verbatim above and flagged; likely transcription errors in the vendor document. Verify against a real device before relying on them.
- RS-232 wiring requires a cross (null-modem) cable per section 1.2.
- Response codes include detailed temperature-anomaly standby states (88-0..88-3, 28-0..28-3) referencing TEMP Sensors A–D; source does not state which physical sensor each letter maps to.
- CR ALLPFAIL response enumerates subsystems MAIN, FAN-1..FAN-13, LENS, CW with 3.3V/ALL-OK status strings; exact response string format for failing states is not exemplified in source.

<!-- UNRESOLVED: firmware version compatibility not stated. Exact NAK code byte value not stated (source writes "NAK" but no hex). Light-source timer units and CR3 response format not exemplified. Power-failure response string format for non-OK states not exemplified. -->
```

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/pro-v2000-rs232-commands/?wpdmdl=3522"
  - "https://www.eiki.com/download/pro-v2000-owners-manual/?wpdmdl=3190"
retrieved_at: 2026-06-29T19:50:14.782Z
last_checked_at: 2026-06-30T07:05:03.615Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:05:03.615Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions matched literally in source; transport parameters verified; full bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Voltage/power/current specs not present in source."
- "source documents no numeric set-by-value variables (e.g. brightness/keystone"
- "source documents no unsolicited notifications. All responses are replies to commands."
- "source documents no multi-step command sequences."
- "source contains no explicit safety warnings or interlock procedures."
- "firmware version compatibility not stated. Exact NAK code byte value not stated (source writes \"NAK\" but no hex). Light-source timer units and CR3 response format not exemplified. Power-failure response string format for non-OK states not exemplified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
