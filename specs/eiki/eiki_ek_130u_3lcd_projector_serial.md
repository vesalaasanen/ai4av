---
spec_id: admin/eiki-ek-130u-3lcd-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki EK-130U 3LCD Projector Control Spec"
manufacturer: Eiki
model_family: EK-130U
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - EK-130U
    - "EK-130 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-130-series-rs232-commands/?wpdmdl=3681&refresh=6a42cce02d8251782762720"
  - "https://www.eiki.com/download/ek-130-series-owners-manual/?wpdmdl=3678&refresh=6a42cce00f0941782762720"
  - https://www.eiki.com
retrieved_at: 2026-06-29T19:55:23.468Z
last_checked_at: 2026-06-30T07:02:05.842Z
generated_at: 2026-06-30T07:02:05.842Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full command framing details (inter-command timing, command queue depth) not stated in source"
  - "source documents only discrete +/- and toggle commands (volume, brightness,"
  - "source does not document any unsolicited (push) notifications from the projector."
  - "source documents no multi-step command sequences."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source"
  - "inter-command timing / minimum gap not stated"
  - "full power-failure response schema (CR ALLPFAIL) truncated in source"
  - "C18 and CR4 trailing-byte anomaly (00 vs 0D) not resolved"
  - "lamp timer units and numeric format not specified"
verification:
  verdict: verified
  checked_at: 2026-06-30T07:02:05.842Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim in source command table with correct hex sequences and transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Eiki EK-130U 3LCD Projector Control Spec

## Summary
3LCD projector from the Eiki EK-130 series. RS-232C asynchronous serial control. Commands begin with "C" and end with carriage return (CR, 0x0D). Two command classes: functional execution commands (return ACK/NAK + CR) and status read commands (return status value or NAK + CR).

<!-- UNRESOLVED: full command framing details (inter-command timing, command queue depth) not stated in source -->

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

Wiring: RS-232 cross (null-modem) cable between PC and projector.

## Traits
```yaml
traits:
  - powerable    # inferred: C00/C01/C02 power commands present
  - queryable    # inferred: CR0/CR1/CR3/CR4/CR6/CR7 status read commands present
  - routable     # inferred: C05/C07/C36/C37/C15/C16/C17 input source select commands present
  - levelable    # inferred: C09/C0A volume and C20/C21 brightness +/- commands present
```

## Actions
```yaml
# Hex payloads copied verbatim from source. ASCII mnemonic shown in label.
# All functional commands return ACK (or NAK) + CR.

# --- Power ---
- id: power_on
  label: "Power On (C00)"
  kind: action
  command: "43 30 30 0D"   # C00 + CR
  params: []

- id: power_off_immediate
  label: "Power OFF Immediately (C01)"
  kind: action
  command: "43 30 31 0D"   # C01 + CR
  params: []

- id: power_off
  label: "Power Off (C02)"
  kind: action
  command: "43 30 32 0D"   # C02 + CR
  params: []

# --- Input source select ---
- id: select_vga_in_1
  label: "VGA IN 1 (C05)"
  kind: action
  command: "43 30 35 0D"   # C05 + CR
  params: []

- id: select_video
  label: "Video (C07)"
  kind: action
  command: "43 30 37 0D"   # C07 + CR
  params: []

- id: select_hdmi_1
  label: "HDMI 1 (C36)"
  kind: action
  command: "43 33 36 0D"   # C36 + CR
  params: []

- id: select_hdmi_2
  label: "HDMI2 (C37)"
  kind: action
  command: "43 33 37 0D"   # C37 + CR
  params: []

- id: select_network
  label: "NETWORK (C15)"
  kind: action
  command: "43 31 35 0D"   # C15 + CR
  params: []

- id: select_memory_viewer
  label: "Memory Viewer (C16)"
  kind: action
  command: "43 31 36 0D"   # C16 + CR
  params: []

- id: select_usb_display
  label: "USB Display (C17)"
  kind: action
  command: "43 31 37 0D"   # C17 + CR
  params: []

# --- Keystone ---
- id: keystone_up
  label: "Keystone ↑ (C8E)"
  kind: action
  command: "43 38 45 0D"   # C8E + CR
  params: []

- id: keystone_down
  label: "Keystone ↓ (C8F)"
  kind: action
  command: "43 38 46 0D"   # C8F + CR
  params: []

- id: keystone_less
  label: "Keystone ＜ (C90)"
  kind: action
  command: "43 39 30 0D"   # C90 + CR
  params: []

- id: keystone_greater
  label: "Keystone ＞ (C91)"
  kind: action
  command: "43 39 31 0D"   # C91 + CR
  params: []

# --- Menu / navigation ---
- id: menu_on
  label: "Menu On (C1C)"
  kind: action
  command: "43 31 43 0D"   # C1C + CR
  params: []

- id: menu_off
  label: "Menu Off (C1D)"
  kind: action
  command: "43 31 44 0D"   # C1D + CR
  params: []

- id: pointer_right
  label: "Pointer Right (C3A)"
  kind: action
  command: "43 33 41 0D"   # C3A + CR
  params: []

- id: pointer_left
  label: "Pointer Left (C3B)"
  kind: action
  command: "43 33 42 0D"   # C3B + CR
  params: []

- id: pointer_up
  label: "Pointer Up (C3C)"
  kind: action
  command: "43 33 43 0D"   # C3C + CR
  params: []

- id: pointer_down
  label: "Pointer Down (C3D)"
  kind: action
  command: "43 33 44 0D"   # C3D + CR
  params: []

- id: enter
  label: "Enter (C3F)"
  kind: action
  command: "43 33 46 0D"   # C3F + CR
  params: []

# --- Timer ---
- id: timer
  label: "Timer (C8A)"
  kind: action
  command: "43 38 41 0D"   # C8A + CR
  params: []

- id: timer_exit
  label: "Timer Exit (C8B)"
  kind: action
  command: "43 38 42 0D"   # C8B + CR
  params: []

# --- Audio ---
- id: mute_on
  label: "Mute On (C0B)"
  kind: action
  command: "43 30 42 0D"   # C0B + CR
  params: []

- id: mute_off
  label: "Mute Off (C0C)"
  kind: action
  command: "43 30 43 0D"   # C0C + CR
  params: []

- id: volume_up
  label: "Volume + (C09)"
  kind: action
  command: "43 30 39 0D"   # C09 + CR
  params: []

- id: volume_down
  label: "Volume - (C0A)"
  kind: action
  command: "43 30 41 0D"   # C0A + CR
  params: []

# --- Zoom ---
- id: digital_zoom_plus
  label: "Digital Zoom + (C30)"
  kind: action
  command: "43 33 30 0D"   # C30 + CR
  params: []

- id: digital_zoom_minus
  label: "Digital Zoom - (C31)"
  kind: action
  command: "43 33 31 0D"   # C31 + CR
  params: []

# --- Image / picture mode ---
- id: image_dynamic
  label: "Dynamic (C19)"
  kind: action
  command: "43 31 39 0D"   # C19 + CR
  params: []

- id: image_standard
  label: "Standard - Image Select (C11)"
  kind: action
  command: "43 31 31 0D"   # C11 + CR
  params: []

- id: image_cinema
  label: "Image Cinema (C13)"
  kind: action
  command: "43 31 33 0D"   # C13 + CR
  params: []

- id: image_blackboard
  label: "Blackboard (C18)"
  kind: action
  command: "43 31 38 00"   # C18 - NOTE: source final byte is 00, not 0D (CR). Likely source typo; verbatim per source.
  params: []

- id: image_toggle
  label: "Image Toggle (C27)"
  kind: action
  command: "43 32 37 0D"   # C27 + CR
  params: []

- id: colorboard
  label: "Colorboard (C39)"
  kind: action
  command: "43 33 39 0D"   # C39 + CR
  params: []

# --- Screen / aspect ---
- id: screen_normal_4_3
  label: "Screen Normal size 4:3 (C0F)"
  kind: action
  command: "43 30 46 0D"   # C0F + CR
  params: []

- id: screen_wide_16_9
  label: "Screen Wide size 16:9 (C10)"
  kind: action
  command: "43 31 30 0D"   # C10 + CR
  params: []

- id: display_clear
  label: "Display Clear (C1E)"
  kind: action
  command: "43 31 45 0D"   # C1E + CR
  params: []

# --- Brightness ---
- id: brightness_up
  label: "Brightness + (C20)"
  kind: action
  command: "43 32 30 0D"   # C20 + CR
  params: []

- id: brightness_down
  label: "Brightness - (C21)"
  kind: action
  command: "43 32 31 0D"   # C21 + CR
  params: []

# --- Direct On ---
- id: direct_on_enable
  label: "Direct On Enable (C28)"
  kind: action
  command: "43 32 38 0D"   # C28 + CR
  params: []

- id: direct_on_disable
  label: "Direct On Disable (C29)"
  kind: action
  command: "43 32 39 0D"   # C29 + CR
  params: []

# --- Power management ---
- id: power_management_ready
  label: "Power Management Ready (C2A)"
  kind: action
  command: "43 32 41 0D"   # C2A + CR
  params: []

- id: power_management_off
  label: "Power Management OFF (C2B)"
  kind: action
  command: "43 32 42 0D"   # C2B + CR
  params: []

- id: power_management_shutdown
  label: "Power Management Shut Down (C2E)"
  kind: action
  command: "43 32 45 0D"   # C2E + CR
  params: []

# --- Auto adjust ---
- id: auto_pc_adj
  label: "Auto PC ADJ. (C89)"
  kind: action
  command: "43 38 39 0D"   # C89 + CR
  params: []

# --- Status read (query) commands ---
- id: query_operation_status
  label: "Get Projector Operation Status (CR0)"
  kind: query
  command: "43 52 30 0D"   # CR0 + CR
  params: []

- id: query_input_source
  label: "Get Input Source Information (CR1)"
  kind: query
  command: "43 52 31 0D"   # CR1 + CR
  params: []

- id: query_lamp_timer
  label: "Lamp Timer Read (CR3)"
  kind: query
  command: "43 52 33 0D"   # CR3 + CR
  params: []

- id: query_screen_setting
  label: "Get Screen Setting Status (CR4)"
  kind: query
  command: "43 52 34 00"   # CR4 - NOTE: source final byte is 00, not 0D (CR). Likely source typo; verbatim per source.
  params: []

- id: query_temperature
  label: "Get Internal Temperature Data (CR6)"
  kind: query
  command: "43 52 36 0D"   # CR6 + CR
  params: []

- id: query_lamp_mode
  label: "Get Lamp Mode Status (CR7)"
  kind: query
  command: "43 52 37 0D"   # CR7 + CR
  params: []

- id: query_power_failure_detail
  label: "Detect Detail of Power Failure (CR ALLPFAIL)"
  kind: query
  command: "CR ALLPFAIL"   # ASCII mnemonic only; source does not provide hex byte sequence for this command
  params: []
```

## Feedbacks
```yaml
# Generic command acknowledgement (functional commands)
- id: command_ack
  type: enum
  values: [ACK, NAK]
  description: "Functional commands return ACK + CR on success or NAK + CR on failure/rejection."

# Operation status response (CR0)
- id: operation_status
  type: enum
  values:
    - "00"  # Power on
    - "80"  # Standby
    - "40"  # Countdown in process
    - "20"  # Cooling down in process
    - "10"  # Power failure
    - "28"  # Cooling down in process due to temperature anomaly
    - "88"  # Coming back after temperature anomaly
    - "24"  # Power management cooling
    - "04"  # Suspend status (Power management Ready)
    - "21"  # Cooling down in process after lamp off
    - "81"  # Standby after cooling down process due to lamp off
  description: "Status code returned by CR0 query."

# Input source response (CR1)
- id: input_source
  type: enum
  values: [VGA1, HDMI1, "HDMI 2", Video, NETWORK, "Memory Viewer", "USB Display"]
  description: "Active input source returned by CR1 query."

# Screen setting response (CR4)
- id: screen_setting
  type: enum
  values:
    - "11"  # Normal screen setting
    - "10"  # Rear & Ceiling ON
    - "01"  # Rear ON
    - "00"  # Ceiling ON
  description: "Screen/installation orientation returned by CR4 query."

# Temperature response (CR6) - three sensor values formatted "%1_%2_%3"
- id: temperature_data
  type: string
  description: "Returns 'TemperatureSensor1_TemperatureSensor2_TemperatureSensor3', each shown as '00.0'."

# Lamp mode response (CR7)
- id: lamp_mode
  type: enum
  values:
    - "00"  # Light is out
    - "01"  # Light is on

# Lamp timer response (CR3)
- id: lamp_timer
  type: string
  description: "Lamp timer value returned by CR3 query. Numeric format/units not fully specified in source."

# Power failure detail response (CR ALLPFAIL)
- id: power_failure_detail
  type: string
  description: "Detail of power failure. Source example truncated: '000 MAIN, ALL OK' / '000 FAN, 5V OK'. Full response schema not fully specified in source."
```

## Variables
```yaml
# UNRESOLVED: source documents only discrete +/- and toggle commands (volume, brightness,
# keystone, zoom). No absolute set-value parameters exposed. No settable variables to populate.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited (push) notifications from the projector.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Note C01 (Power OFF immediately) vs C02 (Power OFF)
# differ in behavior per source labelling but no interlock detail is given.
```

## Notes
- Command framing: one command per line, begins with ASCII "C" (0x43), ends with carriage return CR (0x0D). Async serial, 19200 8N1, no flow control.
- Two command classes: functional execution (ACK/NAK + CR response) and status read (status value or NAK + CR).
- Hex payloads in Actions are copied verbatim from source table `Command (HEX+CR)`.
- **Source anomaly — final-byte discrepancies:** C18 is documented as `43 31 38 00` and CR4 as `43 52 34 00`, where every other command terminates with `0D` (CR). These are transcribed verbatim; the trailing `00` is most likely a source OCR/typo and should be treated as suspect until verified against a device. Recommended test: send with `0D` terminator and confirm response.
- `CR ALLPFAIL` is documented as an ASCII mnemonic only; no hex byte sequence is provided in the source. Command verbatim is `"CR ALLPFAIL"` followed by the standard CR terminator (assumed by analogy, not confirmed).
- CR6 temperature response uses `%1_%2_%3` placeholder format where each `%n` is one of three internal sensors, displayed as "00.0".
- CR3 (Lamp Timer Read) numeric value format and units (hours/min) not explicitly stated in source.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: inter-command timing / minimum gap not stated -->
<!-- UNRESOLVED: full power-failure response schema (CR ALLPFAIL) truncated in source -->
<!-- UNRESOLVED: C18 and CR4 trailing-byte anomaly (00 vs 0D) not resolved -->
<!-- UNRESOLVED: lamp timer units and numeric format not specified -->
````

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-130-series-rs232-commands/?wpdmdl=3681&refresh=6a42cce02d8251782762720"
  - "https://www.eiki.com/download/ek-130-series-owners-manual/?wpdmdl=3678&refresh=6a42cce00f0941782762720"
  - https://www.eiki.com
retrieved_at: 2026-06-29T19:55:23.468Z
last_checked_at: 2026-06-30T07:02:05.842Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:02:05.842Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim in source command table with correct hex sequences and transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full command framing details (inter-command timing, command queue depth) not stated in source"
- "source documents only discrete +/- and toggle commands (volume, brightness,"
- "source does not document any unsolicited (push) notifications from the projector."
- "source documents no multi-step command sequences."
- "source contains no explicit safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source"
- "inter-command timing / minimum gap not stated"
- "full power-failure response schema (CR ALLPFAIL) truncated in source"
- "C18 and CR4 trailing-byte anomaly (00 vs 0D) not resolved"
- "lamp timer units and numeric format not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
