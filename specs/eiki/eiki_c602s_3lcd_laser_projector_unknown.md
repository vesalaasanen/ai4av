---
spec_id: admin/eiki-c602s
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki C602S 3LCD Laser Projector Control Spec"
manufacturer: Eiki
model_family: "Eiki C602S 3LCD Laser Projector"
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - "Eiki C602S 3LCD Laser Projector"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/c602-rs232-commands/?wpdmdl=3652&refresh=6a3419c9f1dbe1781799369"
retrieved_at: 2026-06-29T19:35:50.949Z
last_checked_at: 2026-06-30T07:00:18.273Z
generated_at: 2026-06-30T07:00:18.273Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP/HTTP control documented; no auth procedure; no firmware version; no safety/interlock procedures stated"
  - "source documents no settable continuous variables (volume/brightness are"
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no multi-step command sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "no firmware version range stated; no power/voltage/current specs; no protocol version; CR3/CR6/CR ALLPFAIL return formats only partially specified (units, scaling, field widths unstated)."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:00:18.273Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec actions matched verbatim to source commands; transport parameters (19200 baud, 8N1, no flow control) confirmed; coverage is comprehensive. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Eiki C602S 3LCD Laser Projector Control Spec

## Summary
3LCD laser projector controlled via RS-232 serial (19200 baud, 8N1, no flow control). Command set covers power, input selection (VGA/HDMI/HDBaseT/NETWORK/USB), keystone, image mode, volume, screen setting, power management, and status queries for power state, input, screen, temperature, lamp, and power-fault detail.

<!-- UNRESOLVED: no TCP/IP/HTTP control documented; no auth procedure; no firmware version; no safety/interlock procedures stated -->

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
# Wiring: RS232 cross cable between computer and projector
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: C00/C01/C02 power commands
  - routable     # inferred: C05/C07/C36/C37/C38/C15/C16/C17 input selection
  - queryable    # inferred: CR0/CR1/CR3/CR4/CR6/CR7/CR ALLPFAIL status reads
  - levelable    # inferred: C09/C0A volume, C20/C21 brightness
```

## Actions
```yaml
# Command column = HEX+CR payload verbatim from source. Mnemonic shown in label.
# One command/line, starts "C", ends CR (0x0D). ACK/NAK + CR returned.
actions:
  - id: power_on
    label: "Power ON (C00)"
    kind: action
    command: "43 30 30 0D"
    params: []

  - id: power_off_immediate
    label: "POWER OFF immediately (C01)"
    kind: action
    command: "43 30 31 0D"
    params: []

  - id: power_off
    label: "POWER OFF (C02)"
    kind: action
    command: "43 30 32 0D"
    params: []

  - id: select_vga
    label: "VGA IN (C05)"
    kind: action
    command: "43 30 35 0D"
    params: []

  - id: select_video
    label: "VIDEO IN (C07)"
    kind: action
    command: "43 30 37 0D"
    params: []

  - id: select_hdmi_1
    label: "HDMI 1 (C36)"
    kind: action
    command: "43 33 36 0D"
    params: []

  - id: select_hdmi_2
    label: "HDMI 2 (C37)"
    kind: action
    command: "43 33 37 0D"
    params: []

  - id: select_hdbaset
    label: "HDBaseT (C38)"
    kind: action
    command: "43 33 38 0D"
    params: []

  - id: select_network
    label: "NETWORK (C15)"
    kind: action
    command: "43 31 35 0D"
    params: []

  - id: select_memory_viewer
    label: "Memory Viewer (C16)"
    kind: action
    command: "43 31 36 0D"
    params: []

  - id: select_usb_display
    label: "USB Display (C17)"
    kind: action
    command: "43 31 37 0D"
    params: []

  - id: keystone_up
    label: "Keystone ↑ (C8E)"
    kind: action
    command: "43 38 45 0D"
    params: []

  - id: keystone_down
    label: "Keystone ↓ (C8F)"
    kind: action
    command: "43 38 46 0D"
    params: []

  - id: menu_on
    label: "Menu on (C1C)"
    kind: action
    command: "43 31 43 0D"
    params: []

  - id: menu_off
    label: "Menu off (C1D)"
    kind: action
    command: "43 31 44 0D"
    params: []

  - id: keystone_greater
    label: "Keystone＞ (C90)"
    kind: action
    command: "43 39 30 0D"
    params: []

  - id: keystone_less
    label: "Keystone＜ (C91)"
    kind: action
    command: "43 39 31 0D"
    params: []

  - id: keystone_corner
    label: "Keystone Corner (C98)"
    kind: action
    command: "43 39 38 0D"
    params: []

  - id: keystone_barrel
    label: "Keystone Barrel (C99)"
    kind: action
    command: "43 39 39 0D"
    params: []

  - id: freeze_on
    label: "Freeze on (C43)"
    kind: action
    command: "43 34 33 0D"
    params: []

  - id: freeze_off
    label: "Freeze off (C44)"
    kind: action
    command: "43 34 34 0D"
    params: []

  - id: blank_on
    label: "Blank on (C0D)"
    kind: action
    command: "43 30 44 0D"
    params: []

  - id: blank_off
    label: "Blank off (C0E)"
    kind: action
    command: "43 30 45 0D"
    params: []

  - id: timer
    label: "Timer (C8A)"
    kind: action
    command: "43 38 41 0D"
    params: []

  - id: timer_exit
    label: "Timer Exit (C8B)"
    kind: action
    command: "43 38 42 0D"
    params: []

  - id: mute_on
    label: "Mute on (C0B)"
    kind: action
    command: "43 30 42 0D"
    params: []

  - id: mute_off
    label: "Mute off (C0C)"
    kind: action
    command: "43 30 43 0D"
    params: []

  - id: digital_zoom_in
    label: "Digital zoom + (C30)"
    kind: action
    command: "43 33 30 0D"
    params: []

  - id: digital_zoom_out
    label: "Digital zoom - (C31)"
    kind: action
    command: "43 33 31 0D"
    params: []

  - id: volume_up
    label: "Volume + (C09)"
    kind: action
    command: "43 30 39 0D"
    params: []

  - id: volume_down
    label: "Volume - (C0A)"
    kind: action
    command: "43 30 41 0D"
    params: []

  - id: image_dynamic
    label: "Dynamic (C19)"
    kind: action
    command: "43 31 39 0D"
    params: []

  - id: image_standard
    label: "Standard (C11)"
    kind: action
    command: "43 31 31 0D"
    params: []

  - id: colorboard
    label: "Colorboard (C39)"
    kind: action
    command: "43 33 39 0D"
    params: []

  - id: screen_normal
    label: "Screen Normal size (C0F)"
    kind: action
    command: "43 30 46 0D"
    params: []

  - id: screen_wide
    label: "Screen Wide size (C10)"
    kind: action
    command: "43 31 30 0D"
    params: []

  - id: image_cinema
    label: "Cinema (C13)"
    kind: action
    command: "43 31 33 0D"
    params: []

  - id: image_user
    label: "Image-User (C14)"
    kind: action
    command: "43 31 34 0D"
    params: []

  - id: blackboard
    label: "Blackboard (C18)"
    kind: action
    command: "43 31 38 00"  # NOTE: source shows terminator 0x00, not 0x0D - likely typo; verbatim
    params: []

  - id: display_clear
    label: "DISPLAY CLEAR (C1E)"
    kind: action
    command: "43 31 45 0D"
    params: []

  - id: brightness_up
    label: "BRIGHTNESS + (C20)"
    kind: action
    command: "43 32 30 0D"
    params: []

  - id: brightness_down
    label: "BRIGHTNESS - (C21)"
    kind: action
    command: "43 32 31 0D"
    params: []

  - id: image_toggle
    label: "IMAGE Toggle (C27)"
    kind: action
    command: "43 32 37 0D"
    params: []

  - id: direct_power_on_enable
    label: "Direct power On Enable (C28)"
    kind: action
    command: "43 32 38 0D"
    params: []

  - id: direct_power_on_disable
    label: "Direct power On Disable (C29)"
    kind: action
    command: "43 32 39 0D"
    params: []

  - id: power_management_ready
    label: "Power Management Ready (C2A)"
    kind: action
    command: "43 32 41 0D"
    params: []

  - id: power_management_off
    label: "Power Management OFF (C2B)"
    kind: action
    command: "43 32 42 0D"
    params: []

  - id: power_management_shutdown
    label: "Power Management Shut down (C2E)"
    kind: action
    command: "43 32 45 0D"
    params: []

  - id: pointer_right
    label: "POINTER RIGHT (C3A)"
    kind: action
    command: "43 33 41 0D"
    params: []

  - id: pointer_left
    label: "POINTER LEFT (C3B)"
    kind: action
    command: "43 33 42 0D"
    params: []

  - id: pointer_up
    label: "POINTER UP (C3C)"
    kind: action
    command: "43 33 43 0D"
    params: []

  - id: pointer_down
    label: "POINTER DOWN (C3D)"
    kind: action
    command: "43 33 44 0D"
    params: []

  - id: enter
    label: "ENTER (C3F)"
    kind: action
    command: "43 33 46 0D"
    params: []

  - id: auto_pc_adj
    label: "Auto PC ADJ. (C89)"
    kind: action
    command: "43 38 39 0D"
    params: []

  - id: light_source_timer_read
    label: "Light Source Timer Read (CR3)"
    kind: query
    command: "43 52 33 0D"
    params: []

  - id: operation_status_read
    label: "Get projector operation status (CR0)"
    kind: query
    command: "43 52 30 0D"
    params: []

  - id: input_source_read
    label: "Get input source information (CR1)"
    kind: query
    command: "43 52 31 0D"
    params: []

  - id: screen_setting_read
    label: "Get screen setting status (CR4)"
    kind: query
    command: "43 52 34 00"  # NOTE: source shows terminator 0x00, not 0x0D - verbatim
    params: []

  - id: temperature_read
    label: "Get internal temperature data (CR6)"
    kind: query
    command: "43 52 36 0D"
    params: []

  - id: lamp_mode_read
    label: "Get lamp mode status (CR7)"
    kind: query
    command: "43 52 37 0D"
    params: []

  - id: power_fail_detail_read
    label: "Detect detail of power failure (CR ALLPFAIL)"
    kind: query
    command: "CR ALLPFAIL"  # NOTE: source gives no hex payload for this entry; verbatim mnemonic only
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    description: "CR0 response - projector operation status"
    type: enum
    values:
      - "00"      # Power on
      - "80"      # standby
      - "40"      # Countdown in process
      - "20"      # Cooling Down in process
      - "10"      # Power Failure
      - "28-0"    # TempA Cooling Down in process due to Temperature Anomaly
      - "28-1"    # TempB Cooling Down in process due to Temperature Anomaly
      - "88-0"    # Standby after TempA Cooling Down process due to light off
      - "88-1"    # Standby after TempB Cooling Down process due to light off
      - "24"      # Power Management cooling
      - "04"      # suspend status (Power management Ready)
      - "21"      # Cooling Down in process after light off
      - "81"      # Standby after Cooling Down process due to light off

  - id: input_source
    description: "CR1 response - current input source"
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
    description: "CR4 response - screen setting status"
    type: enum
    values:
      - "11"   # Normal screen setting
      - "10"   # Rear & Ceiling ON
      - "01"   # Rear ON
      - "00"   # Ceiling ON
      - "20"   # Auto Ceiling & Rear ON
      - "21"   # Auto Ceiling & Rear OFF

  - id: lamp_mode
    description: "CR7 response - lamp (light source) mode status"
    type: enum
    values:
      - "00"   # Light is out
      - "01"   # Light is on

  - id: command_ack
    description: "Functional command acknowledgement"
    type: enum
    values:
      - ACK
      - NAK

  - id: internal_temperature
    description: "CR6 response - three sensor readings, format %1_%2_%3, each as 00.0"
    type: string

  - id: power_failure_detail
    description: "CR ALLPFAIL response - per-subsystem status (MAIN/FAN1..FAN5)"
    type: string

  - id: light_source_timer
    description: "CR3 response - light source timer reading"
    type: string
```

## Variables
```yaml
# UNRESOLVED: source documents no settable continuous variables (volume/brightness are
# momentary +/- actions, not absolute set). No variable range or units stated.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# solicited replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
cooldowns: []
warnings: []
destructive_actions: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. C01 "POWER OFF immediately" vs C02 "POWER OFF"
# distinction is documented but no safety procedure is attached. Cooling-down states
# are reported via CR0 but no operator procedure is specified.
```

## Notes
- Command framing: one command per line, ASCII mnemonic starting with "C" (0x43) terminated by CR (0x0D). The HEX+CR column in the source is the byte-level encoding of that mnemonic (e.g. C00 = `43 30 30`).
- Functional execution commands return `ACK CR` or `NAK CR`. Status read (CR*) commands return their data value followed by CR, or `NAK CR`.
- Wiring: RS232 cross (null-modal) cable between controller and projector.
- `C18` (Blackboard) and `CR4` (screen setting read) are listed in the source with terminator byte `0x00` instead of the standard `0x0D` used by every other command. Kept verbatim; likely a source typo. Verify against device before relying on these two payloads.
- `CR ALLPFAIL` is listed in the source without a hex payload (unlike all other CR* rows); only the ASCII mnemonic is given. Kept verbatim.
- `C01` (Power OFF immediately) and `C02` (Power OFF) are distinct rows in the source; semantics of the difference not explained beyond the parenthetical.
<!-- UNRESOLVED: no firmware version range stated; no power/voltage/current specs; no protocol version; CR3/CR6/CR ALLPFAIL return formats only partially specified (units, scaling, field widths unstated). -->

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/c602-rs232-commands/?wpdmdl=3652&refresh=6a3419c9f1dbe1781799369"
retrieved_at: 2026-06-29T19:35:50.949Z
last_checked_at: 2026-06-30T07:00:18.273Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:00:18.273Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec actions matched verbatim to source commands; transport parameters (19200 baud, 8N1, no flow control) confirmed; coverage is comprehensive. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP/HTTP control documented; no auth procedure; no firmware version; no safety/interlock procedures stated"
- "source documents no settable continuous variables (volume/brightness are"
- "source documents no unsolicited notifications. All responses are"
- "source documents no multi-step command sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "no firmware version range stated; no power/voltage/current specs; no protocol version; CR3/CR6/CR ALLPFAIL return formats only partially specified (units, scaling, field widths unstated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
