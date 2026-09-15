---
spec_id: admin/eiki-ek-65lu-3lcd-laser-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki EK-65LU 3LCD Laser Projector Control Spec"
manufacturer: Eiki
model_family: EK-65LU
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - EK-65LU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-65lu-ek-55lu-rs232-commands/?wpdmdl=3582&ind=1755797805633&refresh=baaa0ce3&filename=EK-65LU-EK-55LU-RS232-command-codes.pdf"
  - https://www.eiki.com/download/ek-65lu-ek-55lu-rs232-commands/
  - https://www.eiki.com/download/ek-65lu-ek-55lu-owners-manual/
  - https://www.eiki.com/downloads/
retrieved_at: 2026-09-03T02:30:03.963Z
last_checked_at: 2026-09-06T22:16:17.956Z
generated_at: 2026-09-06T22:16:17.956Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no detailed list of all CR* status queries; CR4 byte format ambiguous; CR ALLPFAIL format truncated in source"
  - "no continuous-variable setters documented in source (only step +/-, not numeric values)"
  - "source describes only ACK/NAK responses, no unsolicited event streams"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlocks, or power-on sequencing documented in source"
  - "firmware version; full CR* query catalogue; CR4 / C18 trailing byte accuracy; CR ALLPFAIL response format; no documented TCP/IP control (only RS-232C mentioned)"
verification:
  verdict: verified
  checked_at: 2026-09-06T22:16:17.956Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec action units match hex tokens verbatim from the source command table; transport values 19200/8/N/1 match exactly; CR4/C18 trailing 00 is preserved verbatim from source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Eiki EK-65LU 3LCD Laser Projector Control Spec

## Summary
RS-232C control spec for Eiki EK-65LU 3LCD laser projector. Single-wire ASCII command protocol at 19200 baud. Commands begin with `C`, end with carriage return (`0x0D`); functional commands return `ACK`/`NAK` and status queries return a payload.

<!-- UNRESOLVED: no detailed list of all CR* status queries; CR4 byte format ambiguous; CR ALLPFAIL format truncated in source -->

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
- powerable  # inferred: C00/C01/C02 power commands present
- routable # inferred: input select commands present- queryable  # inferred: CR0/CR1/CR4/CR6/CR7 query commands present
- levelable  # inferred: volume +/- and brightness +/- commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "43 30 30 0D"
  params: []
- id: power_off_immediate
  label: Power Off (immediate)
  kind: action
  command: "43 30 31 0D"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "43 30 32 0D"
  params: []
- id: input_vga
  label: Input VGA
  kind: action
  command: "43 30 35 0D"
  params: []
- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  command: "43 33 36 0D"
  params: []
- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  command: "43 33 37 0D"
  params: []
- id: input_hdbaset
  label: Input HDBaseT
  kind: action
  command: "43 33 38 0D"
  params: []
- id: input_network
  label: Input NETWORK
  kind: action
  command: "43 31 35 0D"
  params: []
- id: input_memory_viewer
  label: Input Memory Viewer
  kind: action
  command: "43 31 36 0D"
  params: []
- id: input_usb_display
  label: Input USB Display
  kind: action
  command: "43 31 37 0D"
  params: []
- id: keystone_up
  label: Keystone Up
  kind: action
  command: "43 38 45 0D"
  params: []
- id: keystone_down
  label: Keystone Down
  kind: action
  command: "43 38 46 0D"
  params: []
- id: menu_on
  label: Menu On
  kind: action
  command: "43 31 43 0D"
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  command: "43 31 44 0D"
  params: []
- id: keystone_left
  label: Keystone Left
  kind: action
  command: "43 39 30 0D"
  params: []
- id: keystone_right
  label: Keystone Right
  kind: action
  command: "43 39 31 0D"
  params: []
- id: keystone_corner
  label: Keystone Corner
  kind: action
  command: "43 39 38 0D"
  params: []
- id: keystone_barrel
  label: Keystone Barrel
  kind: action
  command: "43 39 39 0D"
  params: []
- id: still_on
  label: Still On
  kind: action
  command: "43 34 33 0D"
  params: []
- id: still_off
  label: Still Off
  kind: action
  command: "43 34 34 0D"
  params: []
- id: blank_on
  label: Blank On
  kind: action
  command: "43 30 44 0D"
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  command: "43 30 45 0D"
  params: []
- id: timer
  label: Timer
  kind: action
  command: "43 38 41 0D"
  params: []
- id: timer_exit
  label: Timer Exit
  kind: action
  command: "43 38 42 0D"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "43 30 42 0D"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "43 30 43 0D"
  params: []
- id: digital_zoom_in
  label: Digital Zoom In
  kind: action
  command: "43 33 30 0D"
  params: []
- id: digital_zoom_out
  label: Digital Zoom Out
  kind: action
  command: "43 33 31 0D"
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  command: "43 30 39 0D"
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "43 30 41 0D"
  params: []
- id: image_dynamic
  label: Image Dynamic
  kind: action
  command: "43 31 39 0D"
  params: []
- id: image_standard
  label: Image Standard
  kind: action
  command: "43 31 31 0D"
  params: []
- id: image_colorboard
  label: Image Colorboard
  kind: action
  command: "43 33 39 0D"
  params: []
- id: screen_normal
  label: Screen Normal Size
  kind: action
  command: "43 30 46 0D"
  params: []
- id: screen_wide
  label: Screen Wide Size
  kind: action
  command: "43 31 30 0D"
  params: []
- id: image_cinema
  label: Image Cinema
  kind: action
  command: "43 31 33 0D"
  params: []
- id: image_user
  label: Image User
  kind: action
  command: "43 31 34 0D"
  params: []
- id: image_blackboard
  label: Image Blackboard
  kind: action
  command: "43 31 38 00"  # source shows trailing 00 not 0D
  params: []
- id: display_clear
  label: Display Clear
  kind: action
  command: "43 31 45 0D"
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  command: "43 32 30 0D"
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  command: "43 32 31 0D"
  params: []
- id: image_toggle
  label: Image Toggle
  kind: action
  command: "43 32 37 0D"
  params: []
- id: direct_on_enable
  label: Direct On Enable
  kind: action
  command: "43 32 38 0D"
  params: []
- id: direct_on_disable
  label: Direct On Disable
  kind: action
  command: "43 32 39 0D"
  params: []
- id: power_mgmt_ready
  label: Power Management Ready
  kind: action
  command: "43 32 41 0D"
  params: []
- id: power_mgmt_off
  label: Power Management Off
  kind: action
  command: "43 32 42 0D"
  params: []
- id: power_mgmt_shutdown
  label: Power Management Shutdown
  kind: action
  command: "43 32 45 0D"
  params: []
- id: pointer_right
  label: Pointer Right
  kind: action
  command: "43 33 41 0D"
  params: []
- id: pointer_left
  label: Pointer Left
  kind: action
  command: "43 33 42 0D"
  params: []
- id: pointer_up
  label: Pointer Up
  kind: action
  command: "43 33 43 0D"
  params: []
- id: pointer_down
  label: Pointer Down
  kind: action
  command: "43 33 44 0D"
  params: []
- id: enter
  label: Enter
  kind: action
  command: "43 33 46 0D"
  params: []
- id: auto_pc_adj
  label: Auto PC Adjust
  kind: action
  command: "43 38 39 0D"
  params: []
- id: light_source_timer_read
  label: Light Source Timer Read
  kind: query
  command: "43 52 33 0D"
  params: []
- id: get_operation_status
  label: Get Operation Status
  kind: query
  command: "43 52 30 0D"
  params: []
- id: get_input_source
  label: Get Input Source
  kind: query
  command: "43 52 31 0D"
  params: []
- id: get_screen_setting
  label: Get Screen Setting
  kind: query
  command: "43 52 34 00"  # source shows trailing 00 not 0D
  params: []
- id: get_temperature
  label: Get Temperature Data
  kind: query
  command: "43 52 36 0D"
  params: []
- id: get_lamp_mode
  label: Get Lamp Mode
  kind: query
  command: "43 52 37 0D"
  params: []
- id: detect_power_failure
  label: Detect Power Failure Detail
  kind: query
  command: "43 52 2041 4C 4C 50 46 41 49 4C0D"  # "CR ALLPFAIL" + CR; ASCII bytes transcribed
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "00" # Power on
    - "80"   # Standby
    - "40"   # Countdown in process
    - "20"   # Cooling Down in process
    - "10"   # Power Failure
    - "28-0" # TempA Cooling Down due to Temperature Anomaly
    - "28-1" # TempB Cooling Down due to Temperature Anomaly
    - "88-0" # Standby after TempA Cooling Down process due to light off
    - "88-1" # Standby after TempB Cooling Down process due to light off
    - "24"   # Power Management cooling
    - "04"   # Suspend status (Power Management Ready)
    - "21"   # Cooling Down after light off
    - "81"   # Standby after Cooling Down due to light off
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
    - "11" # Normal screen setting
    - "10" # Rear & Ceiling ON
    - "01" # Rear ON
    - "00" # Ceiling ON
    - "20" # Auto Ceiling & Rear ON
    - "21" # Auto Ceiling & Rear OFF
- id: temperature_data
  type: string
  description: "Format %1_%2_%3 - temperatures of Sensor 1, 2, 3 shown as 00.0"
- id: lamp_mode
  type: enum
  values:
    - "00" # Light is out
    - "01" # Light is on
- id: power_failure_detail
  type: string
  description: "Status lines for MAIN, FAN1-FAN6; truncated in source"
```

## Variables
```yaml
# UNRESOLVED: no continuous-variable setters documented in source (only step +/-, not numeric values)
```

## Events
```yaml
# UNRESOLVED: source describes only ACK/NAK responses, no unsolicited event streams
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing documented in source
```

## Notes
- Protocol is single-line ASCII: command starts with `C`, ends with carriage return (`0x0D`).
- Functional commands return `ACK` (`06`) or `NAK` (`15`), terminated with `CR`.
- Status read commands return a 2-byte value (e.g. `"00"`) or `NAK` plus `CR`.
- CR4 ("Get screen setting") and C18 ("Blackboard") source lists show trailing `00` instead of `0D` — likely OCR/table artifact, but preserved as written.
- Source lists `CR ALLPFAIL` for power-failure detail but response format is truncated.

<!-- UNRESOLVED: firmware version; full CR* query catalogue; CR4 / C18 trailing byte accuracy; CR ALLPFAIL response format; no documented TCP/IP control (only RS-232C mentioned) -->

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-65lu-ek-55lu-rs232-commands/?wpdmdl=3582&ind=1755797805633&refresh=baaa0ce3&filename=EK-65LU-EK-55LU-RS232-command-codes.pdf"
  - https://www.eiki.com/download/ek-65lu-ek-55lu-rs232-commands/
  - https://www.eiki.com/download/ek-65lu-ek-55lu-owners-manual/
  - https://www.eiki.com/downloads/
retrieved_at: 2026-09-03T02:30:03.963Z
last_checked_at: 2026-09-06T22:16:17.956Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-06T22:16:17.956Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec action units match hex tokens verbatim from the source command table; transport values 19200/8/N/1 match exactly; CR4/C18 trailing 00 is preserved verbatim from source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no detailed list of all CR* status queries; CR4 byte format ambiguous; CR ALLPFAIL format truncated in source"
- "no continuous-variable setters documented in source (only step +/-, not numeric values)"
- "source describes only ACK/NAK responses, no unsolicited event streams"
- "no multi-step sequences described in source"
- "no safety warnings, interlocks, or power-on sequencing documented in source"
- "firmware version; full CR* query catalogue; CR4 / C18 trailing byte accuracy; CR ALLPFAIL response format; no documented TCP/IP control (only RS-232C mentioned)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
