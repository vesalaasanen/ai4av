---
spec_id: admin/eiki-ek-50lu-3lcd-short-throw-laser-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki EK-50LU 3LCD Short Throw Laser Projector Control Spec"
manufacturer: Eiki
model_family: EK-50LU
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - EK-50LU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-50lu-rs232-commands/?wpdmdl=3662"
retrieved_at: 2026-06-29T20:03:06.595Z
last_checked_at: 2026-06-30T07:02:06.581Z
generated_at: 2026-06-30T07:02:06.581Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not specify unit (hours/minutes) or numeric format/width of CR3 response."
  - "response encoding for non-OK (fault) states not documented in source."
  - "source documents only relative adjustments (Volume +/-, Brightness +/-,"
  - "source does not document any unsolicited notifications / events."
  - "source does not document any multi-step command sequences."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source"
  - "CR3 (light source timer) response format/unit not specified in source"
  - "CR ALLPFAIL fault-state encoding not fully specified in source"
verification:
  verdict: verified
  checked_at: 2026-06-30T07:02:06.581Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "All 66 spec action units matched literally in source; complete bidirectional coverage of documented command set. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Eiki EK-50LU 3LCD Short Throw Laser Projector Control Spec

## Summary
The Eiki EK-50LU is a 3LCD short throw laser projector controllable via an RS-232C serial interface. This spec covers power, input source selection, keystone, image/screen/mute adjustments, pointer/menu navigation, power management configuration, and status readback commands documented in the vendor RS-232 command list.

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
  # Source notes asynchronous communication, RS232 cross cable wiring.
  # No port addressing applies (serial-only device).
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands (C00/C01/C02)
  - queryable    # inferred from status read commands (CR0/CR1/CR3/CR4/CR6/CR7/CR ALLPFAIL)
  - levelable    # inferred from volume/brightness +/- relative controls (C09/C0A/C20/C21)
```

## Actions
```yaml
actions:
  # Power
  - id: power_on
    label: Power On
    kind: action
    command: "C00"  # HEX: 43 30 30 0D  (terminator: CR / 0x0D)
    params: []

  - id: power_off_immediate
    label: Power OFF (immediately)
    kind: action
    command: "C01"  # HEX: 43 30 31 0D
    params: []

  - id: power_off
    label: Power OFF
    kind: action
    command: "C02"  # HEX: 43 30 32 0D
    params: []

  # Input source selection
  - id: select_vga_in_1
    label: VGA IN 1
    kind: action
    command: "C05"  # HEX: 43 30 35 0D
    params: []

  - id: select_hdmi_1
    label: HDMI 1
    kind: action
    command: "C36"  # HEX: 43 33 36 0D
    params: []

  - id: select_hdmi_2
    label: HDMI 2
    kind: action
    command: "C37"  # HEX: 43 33 37 0D
    params: []

  - id: select_network
    label: NETWORK
    kind: action
    command: "C15"  # HEX: 43 31 35 0D
    params: []

  - id: select_memory_viewer
    label: Memory Viewer
    kind: action
    command: "C16"  # HEX: 43 31 36 0D
    params: []

  - id: select_usb_display
    label: USB Display
    kind: action
    command: "C17"  # HEX: 43 31 37 0D
    params: []

  # Keystone
  - id: keystone_up
    label: Keystone Up
    kind: action
    command: "C8E"  # HEX: 43 38 45 0D
    params: []

  - id: keystone_down
    label: Keystone Down
    kind: action
    command: "C8F"  # HEX: 43 38 46 0D
    params: []

  - id: keystone_decrease
    label: Keystone <
    kind: action
    command: "C90"  # HEX: 43 39 30 0D
    params: []

  - id: keystone_increase
    label: Keystone >
    kind: action
    command: "C91"  # HEX: 43 39 31 0D
    params: []

  - id: keystone_corner
    label: Keystone Corner
    kind: action
    command: "C98"  # HEX: 43 39 38 0D
    params: []

  - id: keystone_barrel
    label: Keystone Barrel
    kind: action
    command: "C99"  # HEX: 43 39 39 0D
    params: []

  # Menu / navigation
  - id: menu_on
    label: Menu On
    kind: action
    command: "C1C"  # HEX: 43 31 43 0D
    params: []

  - id: menu_off
    label: Menu Off
    kind: action
    command: "C1D"  # HEX: 43 31 44 0D
    params: []

  - id: pointer_right
    label: Pointer Right
    kind: action
    command: "C3A"  # HEX: 43 33 41 0D
    params: []

  - id: pointer_left
    label: Pointer Left
    kind: action
    command: "C3B"  # HEX: 43 33 42 0D
    params: []

  - id: pointer_up
    label: Pointer Up
    kind: action
    command: "C3C"  # HEX: 43 33 43 0D
    params: []

  - id: pointer_down
    label: Pointer Down
    kind: action
    command: "C3D"  # HEX: 43 33 44 0D
    params: []

  - id: enter
    label: Enter
    kind: action
    command: "C3F"  # HEX: 43 33 46 0D
    params: []

  - id: display_clear
    label: Display Clear
    kind: action
    command: "C1E"  # HEX: 43 31 45 0D
    params: []

  - id: auto_pc_adj
    label: Auto PC Adj.
    kind: action
    command: "C89"  # HEX: 43 38 39 0D
    params: []

  # Still / blank / timer
  - id: still_on
    label: Still On
    kind: action
    command: "C43"  # HEX: 43 34 33 0D
    params: []

  - id: still_off
    label: Still Off
    kind: action
    command: "C44"  # HEX: 43 34 34 0D
    params: []

  - id: blank_on
    label: Blank On
    kind: action
    command: "C0D"  # HEX: 43 30 44 0D
    params: []

  - id: blank_off
    label: Blank Off
    kind: action
    command: "C0E"  # HEX: 43 30 45 0D
    params: []

  - id: timer
    label: Timer
    kind: action
    command: "C8A"  # HEX: 43 38 41 0D
    params: []

  - id: timer_exit
    label: Timer (Exit)
    kind: action
    command: "C8B"  # HEX: 43 38 42 0D
    params: []

  # Mute
  - id: mute_on
    label: Mute On
    kind: action
    command: "C0B"  # HEX: 43 30 42 0D
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "C0C"  # HEX: 43 30 43 0D
    params: []

  # Zoom
  - id: digital_zoom_in
    label: Digital Zoom +
    kind: action
    command: "C30"  # HEX: 43 33 30 0D
    params: []

  - id: digital_zoom_out
    label: Digital Zoom -
    kind: action
    command: "C31"  # HEX: 43 33 31 0D
    params: []

  # Volume (relative)
  - id: volume_up
    label: Volume +
    kind: action
    command: "C09"  # HEX: 43 30 39 0D
    params: []

  - id: volume_down
    label: Volume -
    kind: action
    command: "C0A"  # HEX: 43 30 41 0D
    params: []

  # Image select
  - id: image_dynamic
    label: Image Select - Dynamic
    kind: action
    command: "C19"  # HEX: 43 31 39 0D
    params: []

  - id: image_standard
    label: Image Select - Standard
    kind: action
    command: "C11"  # HEX: 43 31 31 0D
    params: []

  - id: image_cinema
    label: Image - Cinema
    kind: action
    command: "C13"  # HEX: 43 31 33 0D
    params: []

  - id: image_user
    label: Image - User
    kind: action
    command: "C14"  # HEX: 43 31 34 0D
    params: []

  - id: image_toggle
    label: Image (Toggle)
    kind: action
    command: "C27"  # HEX: 43 32 37 0D
    params: []

  - id: colorboard
    label: Colorboard
    kind: action
    command: "C39"  # HEX: 43 33 39 0D
    params: []

  - id: blackboard
    label: Blackboard
    kind: action
    command: "C18"  # HEX: 43 31 38 00  (NOTE: source lists terminator as 0x00, not 0x0D - verbatim from source)
    params: []

  # Screen size
  - id: screen_normal
    label: Screen Normal Size (Normal)
    kind: action
    command: "C0F"  # HEX: 43 30 46 0D
    params: []

  - id: screen_wide
    label: Screen Wide Size (Wide)
    kind: action
    command: "C10"  # HEX: 43 31 30 0D
    params: []

  # Brightness (relative)
  - id: brightness_up
    label: Brightness +
    kind: action
    command: "C20"  # HEX: 43 32 30 0D
    params: []

  - id: brightness_down
    label: Brightness -
    kind: action
    command: "C21"  # HEX: 43 32 31 0D
    params: []

  # Direct On
  - id: direct_on_enable
    label: Direct On Enable
    kind: action
    command: "C28"  # HEX: 43 32 38 0D
    params: []

  - id: direct_on_disable
    label: Direct On Disable
    kind: action
    command: "C29"  # HEX: 43 32 39 0D
    params: []

  # Power management
  - id: power_management_ready
    label: Power Management Ready
    kind: action
    command: "C2A"  # HEX: 43 32 41 0D
    params: []

  - id: power_management_off
    label: Power Management OFF
    kind: action
    command: "C2B"  # HEX: 43 32 42 0D
    params: []

  - id: power_management_shutdown
    label: Power Management Shut down
    kind: action
    command: "C2E"  # HEX: 43 32 45 0D
    params: []

  # Status read commands (queries)
  - id: light_source_timer_read
    label: Light Source Timer Read
    kind: query
    command: "CR3"  # HEX: 43 52 33 0D
    params: []

  - id: operation_status_read
    label: Operation Status Read
    kind: query
    command: "CR0"  # HEX: 43 52 30 0D
    params: []

  - id: input_source_read
    label: Input Source Read
    kind: query
    command: "CR1"  # HEX: 43 52 31 0D
    params: []

  - id: screen_setting_read
    label: Screen Setting Status Read
    kind: query
    command: "CR4"  # HEX: 43 52 34 00  (NOTE: source lists terminator as 0x00, not 0x0D - verbatim from source)
    params: []

  - id: temperature_read
    label: Internal Temperature Read
    kind: query
    command: "CR6"  # HEX: 43 52 36 0D
    params: []

  - id: lamp_mode_read
    label: Lamp Mode Status Read
    kind: action  # see Feedbacks; source labels as status read returning enumerated value
    command: "CR7"  # HEX: 43 52 37 0D
    params: []

  - id: power_failure_detail_read
    label: Power Failure Detail Read
    kind: query
    command: "CR ALLPFAIL"  # ASCII verbatim; source provides no hex byte sequence for this entry
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    description: Projector operation status returned by CR0
    values:
      - "00"       # Power on
      - "80"       # Standby
      - "40"       # Countdown in process
      - "20"       # Cooling down in process
      - "10"       # Power failure
      - "28-0"     # TempA cooling down (temperature anomaly)
      - "28-1"     # TempB cooling down (temperature anomaly)
      - "88-0"     # Standby after TempA cooling down (light off)
      - "88-1"     # Standby after TempB cooling down (light off)
      - "24"       # Power management cooling
      - "04"       # Suspend status (Power management Ready)
      - "21"       # Cooling down in process after light off
      - "81"       # Standby after cooling down (light off)
    query_command: "CR0"

  - id: input_source
    type: enum
    description: Active input source returned by CR1
    values:
      - VGA
      - HDMI 1
      - HDMI 2
      - HDBaseT
      - NETWORK
      - Memory Viewer
      - USB Display
    query_command: "CR1"

  - id: screen_setting
    type: enum
    description: Screen / projection setting returned by CR4
    values:
      - "11"   # Normal screen setting
      - "10"   # Rear & Ceiling ON
      - "01"   # Rear ON
      - "00"   # Ceiling ON
      - "20"   # Auto Ceiling & Rear ON
      - "21"   # Auto Ceiling & Rear OFF
    query_command: "CR4"

  - id: lamp_mode
    type: enum
    description: Light source on/off status returned by CR7
    values:
      - "00"   # Light is out
      - "01"   # Light is on
    query_command: "CR7"

  - id: internal_temperature
    type: string
    description: >
      Three sensor readings returned by CR6 as "%1_%2_%3", each formatted as
      "00.0". %1 = Sensor 1, %2 = Sensor 2, %3 = Sensor 3.
    query_command: "CR6"

  - id: light_source_timer
    type: integer
    description: Light source usage timer returned by CR3.
    # UNRESOLVED: source does not specify unit (hours/minutes) or numeric format/width of CR3 response.
    query_command: "CR3"

  - id: power_failure_detail
    type: string
    description: >
      Per-subsystem power-failure status returned by CR ALLPFAIL. Source lists
      subsystems MAIN, FAN1, FAN2, FAN3, FAN4, FAN5, FAN6, each with an "ALL OK"
      state. Exact response framing for fault states not documented.
    query_command: "CR ALLPFAIL"
    # UNRESOLVED: response encoding for non-OK (fault) states not documented in source.

  - id: command_ack
    type: enum
    description: Generic acknowledgement returned for functional execution commands
    values:
      - ACK
      - NAK
```

## Variables
```yaml
# UNRESOLVED: source documents only relative adjustments (Volume +/-, Brightness +/-,
# Keystone +/-/</>/Corner/Barrel). No absolute set-value payloads (e.g. MV80-style)
# are documented, so no settable Variables can be populated.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications / events.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Note the device distinguishes immediate power-off
# (C01) from normal power-off (C02); treat C01 as potentially abrupt but this is an
# inference, not a stated interlock.
```

## Notes
- All commands start with `C` and end with a carriage return (CR / `0x0D`). Two
  command types exist: functional execution commands (return `ACK`/`NAK` + CR) and
  status read commands (return the status string + CR, or `NAK` + CR).
- Serial wiring requires an RS-232 **cross** (null-modem) cable between PC and projector.
- Source lists two commands with terminator `0x00` instead of `0x0D`: `C18` (Blackboard,
  `43 31 38 00`) and `CR4` (screen setting read, `43 52 34 00`). Kept verbatim — may be a
  source typo, but not normalized here per population policy.
- `C01` powers off immediately; `C02` is the normal (soft) power-off path. Distinct rows
  in the source, so emitted as separate actions.
- Volume and Brightness are **relative** (+/-) only; no absolute set command documented.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: CR3 (light source timer) response format/unit not specified in source -->
<!-- UNRESOLVED: CR ALLPFAIL fault-state encoding not fully specified in source -->

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-50lu-rs232-commands/?wpdmdl=3662"
retrieved_at: 2026-06-29T20:03:06.595Z
last_checked_at: 2026-06-30T07:02:06.581Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:02:06.581Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "All 66 spec action units matched literally in source; complete bidirectional coverage of documented command set. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not specify unit (hours/minutes) or numeric format/width of CR3 response."
- "response encoding for non-OK (fault) states not documented in source."
- "source documents only relative adjustments (Volume +/-, Brightness +/-,"
- "source does not document any unsolicited notifications / events."
- "source does not document any multi-step command sequences."
- "source contains no explicit safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source"
- "CR3 (light source timer) response format/unit not specified in source"
- "CR ALLPFAIL fault-state encoding not fully specified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
