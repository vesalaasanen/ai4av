---
spec_id: admin/clipsal-5500paca
schema_version: ai4av-public-spec-v1
revision: 1
title: "Clipsal 5500PACA Control Spec"
manufacturer: Clipsal
model_family: 5500PACA
aliases: []
compatible_with:
  manufacturers:
    - Clipsal
  models:
    - 5500PACA
    - 5100PC
    - 5500PC
    - 5000SM
    - 5000SM/2
  firmware: "\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - noushouse.com.au
  - updates.clipsal.com
  - cleverhome.com.au
  - manualshelf.com
source_urls:
  - "https://web.archive.org/web/20180205062541if_/http://training.clipsal.com/downloads/OpenCBus/Serial%20Interface%20User%20Guide.pdf"
  - "https://www.noushouse.com.au/brochures/Clipsal/System%20Units/Clipsal-C-Bus-5500PACA-Pascal-Automation-Controller.pdf"
  - https://updates.clipsal.com/ClipsalSoftwareDownload/mainsite/cis/technical/AutoController/LSS5500NAC_LSS5500SHAC_FW_v1.0_EN.pdf
  - https://www.cleverhome.com.au/manuals/Clipsal-C-Bus-5500PACA-Pascal-Automation-Controller-Installation.pdf
  - https://www.manualshelf.com/manual/clipsal/c-bus/user-guide-english.html
retrieved_at: 2026-07-26T06:52:29.843Z
last_checked_at: 2026-08-05T08:14:27.946Z
generated_at: 2026-08-05T08:14:27.946Z
firmware_coverage: "\""
protocol_coverage: []
known_gaps:
  - "The 5500PACA is named only in the input metadata; the refined source document covers the C-Bus Serial Interface protocol generically and does not explicitly mention the 5500PACA model. Voltage/current/power specs, physical wiring, and PICED/Pascal programming interface are out of scope of this source."
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control framing not stated; XON/XOFF is a configurable Serial Interface option (Interface Options 1 bit 2), not RS-232 hardware flow control"
  - "no other unsolicited event classes documented in source."
  - "5500PACA model not explicitly named in source; relationship of this protocol guide to the 5500PACA's primary programmable interface is unconfirmed."
  - "serial data bits, parity, stop bits, hardware flow control not stated in source."
  - "physical connector pinout, voltage, current, power specs not stated in source."
  - "firmware version compatibility range for 5500PACA not stated."
  - "full CAL command catalogue (unit-specific commands \"subject to change without notice\" per section 7) — only the common subset tabulated in section 7.1 is enumerated here."
  - "non-Lighting C-Bus Applications (CBUS-APP document set) not in source; only the Lighting Application $38 SAL subset is enumerated."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:14:27.946Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions map 1:1 to SAL opcodes (6.3), CAL commands (7.1), IDENTIFY attrs $00-$11 (7.2), and parameter methods (10.2/10.3) in the source. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Clipsal 5500PACA Control Spec

## Summary
The Clipsal 5500PACA (Pascal Automation Controller) attaches to a C-Bus network via the C-Bus Serial Interface, an RS-232 gateway that converts the C-Bus protocol to/from asynchronous serial. This spec is built from the *C-Bus Serial Interface User Guide* (CBUS-SIUG Issue 1.17, 9 Dec 2008), which documents the protocol used by the PC Interface (5100PC, 5500PC) and C-Bus SIM (5000SM, 5000SM/2). Control surface covers Point-to-Point (CAL) device management, Point-to-Multi-Point (SAL) Lighting Application commands, status polling, and Serial Interface option/parameter configuration.

<!-- UNRESOLVED: The 5500PACA is named only in the input metadata; the refined source document covers the C-Bus Serial Interface protocol generically and does not explicitly mention the 5500PACA model. Voltage/current/power specs, physical wiring, and PICED/Pascal programming interface are out of scope of this source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default factory value; selector param $3D allows 9600/4800/2400/1200/600/300
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control framing not stated; XON/XOFF is a configurable Serial Interface option (Interface Options 1 bit 2), not RS-232 hardware flow control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: Status Requests, IDENTIFY, RECALL, GETSTATUS queries documented
  - levelable  # inferred: RAMP to LEVEL lighting commands documented
  - routable   # inferred: Point-to-Point, Point-to-Multi-Point, Point-to-Point-to-Multi-Point routing documented
```

## Actions
```yaml
# All payloads verbatim from CBUS-SIUG Issue 1.17. Lighting SAL commands are
# transported inside a Point-to-Multi-Point frame: leading "\" + header ($05) +
# application ($38) + SAL Data + optional checksum + <cr>. The `command:` field
# below shows the SAL Data opcode portion verbatim; full frame assembly is the
# integrator's responsibility per sections 4.2.9.2 and 6.4.
# Checksum is appended only when the SRCHK option (param $30 bit 3) is set.

# --- Special characters / Serial Interface control (section 4.2) ---

- id: si_reset
  label: Reset to BASIC Mode
  kind: action
  command: "~"
  params: []
  notes: Cancels all options, switches to BASIC Mode. May be followed by <cr>.

- id: si_cancel
  label: Cancel Input Buffer
  kind: action
  command: "?"
  params: []
  notes: Clears all characters entered since the last "?" or <cr>.

- id: si_smart_connect_shortcut
  label: SMART Mode + CONNECT Shortcut
  kind: action
  command: "|"
  params: []
  notes: Enters SMART Mode and sets CONNECT option. Discouraged; send before and after <cr>.

- id: si_direct_command_access
  label: Direct CAL Command Access Prefix
  kind: action
  command: "@"
  params: []
  notes: Prefix sending a Device Management (CAL) command directly to the Serial Interface, bypassing addressing. Preserves modes/options.

# --- Lighting Application SAL commands (section 6.3) ---
# Application Address $38 (standard C-Bus Lighting Application).

- id: light_off
  label: Lighting OFF
  kind: action
  command: "01"  # SAL opcode $01; full frame e.g. \0538000108BA -> OFF on Group $08
  params:
    - name: group
      type: integer
      description: Group Address Variable number (0-255) to set to 0.

- id: light_on
  label: Lighting ON
  kind: action
  command: "79"  # SAL opcode $79
  params:
    - name: group
      type: integer
      description: Group Address Variable number (0-255) to set to 255.

- id: light_ramp_instant
  label: Ramp to Level - Instantaneous
  kind: action
  command: "02"  # SAL opcode $02; ramp rate instantaneous
  params:
    - name: group
      type: integer
      description: Group Address Variable number to ramp.
    - name: level
      type: integer
      description: Target level (0-255) at completion.

- id: light_ramp_4s
  label: Ramp to Level - 4 second
  kind: action
  command: "0A"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_8s
  label: Ramp to Level - 8 second
  kind: action
  command: "12"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_12s
  label: Ramp to Level - 12 second
  kind: action
  command: "1A"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_20s
  label: Ramp to Level - 20 second
  kind: action
  command: "22"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_30s
  label: Ramp to Level - 30 second
  kind: action
  command: "2A"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_40s
  label: Ramp to Level - 40 second
  kind: action
  command: "32"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_1m
  label: Ramp to Level - 1 minute
  kind: action
  command: "3A"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_1p5m
  label: Ramp to Level - 1.5 minute
  kind: action
  command: "42"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_2m
  label: Ramp to Level - 2 minute
  kind: action
  command: "4A"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_3m
  label: Ramp to Level - 3 minute
  kind: action
  command: "52"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_5m
  label: Ramp to Level - 5 minute
  kind: action
  command: "5A"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_7m
  label: Ramp to Level - 7 minute
  kind: action
  command: "62"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_10m
  label: Ramp to Level - 10 minute
  kind: action
  command: "6A"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_15m
  label: Ramp to Level - 15 minute
  kind: action
  command: "72"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_ramp_17m
  label: Ramp to Level - 17 minute
  kind: action
  command: "7A"
  params:
    - name: group
      type: integer
    - name: level
      type: integer

- id: light_terminate_ramp
  label: Terminate Ramp
  kind: action
  command: "09"
  params:
    - name: group
      type: integer
      description: Group Address Variable number whose in-progress ramp should be terminated.

# --- Status Requests (section 4.2.9.2) ---
# Issued as a Point-to-Multi-Point command to Application $FF with a trailing
# Status Request block. Example full frame: \05FF007A38004A

- id: status_request_binary
  label: Binary Status Request
  kind: query
  command: "7A"  # leading byte of the Status Request block; full SAL Data = "FF 00 7A <application> <start-block>"
  params:
    - name: application
      type: integer
      description: Application address to poll (e.g. $38 Lighting).
    - name: start_block
      type: integer
      description: Starting block byte ($00, $20, $40, $60, $80, $A0, $C0, $E0).
  notes: Reports Binary State (ON/OFF/ERROR) of GAVs. 32 GAVs per request.

- id: status_request_binary_alt
  label: Binary Status Request (legacy FA form)
  kind: query
  command: "FA"  # legacy alternative to $7A
  params:
    - name: application
      type: integer
    - name: start_block
      type: integer
  notes: Discouraged; support may be removed. Prefer $7A form.

- id: status_request_level
  label: Level Status Request
  kind: query
  command: "7307"  # SAL Data = "FF 00 73 07 <application> <start-block>"
  params:
    - name: application
      type: integer
    - name: start_block
      type: integer
  notes: Reports dimming Level of 32 GAVs. Serial Interface v4.0.00+ only.

# --- CAL Device/Network Management commands (section 7.1) ---
# Transported as Point-to-Point (CAL) frames, e.g. \0603002102D4

- id: cal_reset
  label: CAL Reset
  kind: action
  command: "08"
  params: []
  notes: Resets errors latched in a unit.

- id: cal_recall
  label: CAL Recall
  kind: query
  command: "1A"
  params:
    - name: param_no
      type: integer
      description: Parameter number at which recall starts.
    - name: count
      type: integer
      description: Bytes to return (1-16, decreases by 1 per bridge).

- id: cal_identify
  label: CAL Identify
  kind: query
  command: "21"
  params:
    - name: attribute
      type: integer
      description: Identify attribute number ($00-$11, see IDENTIFY attributes list).

- id: cal_getstatus
  label: CAL GetStatus
  kind: query
  command: "2A"
  params:
    - name: param_no
      type: integer
      description: RAM location at which extraction starts.
    - name: count
      type: integer
      description: Bytes to return (1-16). GETSTATUS 0,1 returns unit error status.

# --- IDENTIFY attributes (section 7.2) ---
# Each is a distinct row in the source table. Attribute is the second byte of an
# IDENTIFY ($21) CAL request, e.g. \0605002102 queries attribute $02.

- id: identify_manufacturer
  label: Identify Attribute $00 - Manufacturer
  kind: query
  command: "2100"
  params: []
  notes: Returns 8 ASCII bytes of manufacturer name.

- id: identify_type
  label: Identify Attribute $01 - Type
  kind: query
  command: "2101"
  params: []
  notes: Returns 8 ASCII bytes of unit type.

- id: identify_firmware_version
  label: Identify Attribute $02 - Firmware Version
  kind: query
  command: "2102"
  params: []
  notes: Returns 8 ASCII bytes of firmware version.

- id: identify_summary
  label: Identify Attribute $03 - Summary
  kind: query
  command: "2103"
  params: []
  notes: Returns part name (6 ASCII), service type, version.

- id: identify_extended_diag
  label: Identify Attribute $04 - Extended Diagnostic Summary
  kind: query
  command: "2104"
  params: []
  notes: Applications supported, area, CRC, serial, network voltage, common status, error flags.

- id: identify_network_terminal_levels
  label: Identify Attribute $05 - Network Terminal Levels
  kind: query
  command: "2105"
  params: []
  notes: Output units only. Terminal values after logic.

- id: identify_terminal_levels
  label: Identify Attribute $06 - Terminal Levels
  kind: query
  command: "2106"
  params: []
  notes: Output units only. Terminal values after logic and local inputs.

- id: identify_network_voltage
  label: Identify Attribute $07 - Network Voltage
  kind: query
  command: "2107"
  params: []
  notes: Returns ASCII volts e.g. "32.5V".

- id: identify_gav_current
  label: Identify Attribute $08 - GAV Values Current
  kind: query
  command: "2108"
  params: []
  notes: 16 bytes of current GAV values on network.

- id: identify_gav_stored
  label: Identify Attribute $09 - GAV Values Stored
  kind: query
  command: "2109"
  params: []
  notes: Output units only. 16 bytes of GAV values stored in EEPROM.

- id: identify_gav_physical
  label: Identify Attribute $0A - GAV Physical Addresses
  kind: query
  command: "210A"
  params: []
  notes: 16 bytes of GAV physical addresses on network.

- id: identify_logic_assignment
  label: Identify Attribute $0B - Logic Assignment
  kind: query
  command: "210B"
  params: []
  notes: Output units only. Bit assignment of logic allocation per terminal.

- id: identify_delays
  label: Identify Attribute $0C - Delays
  kind: query
  command: "210C"
  params: []
  notes: Output units only. Power-up delays per terminal; re-strike delay for relay units.

- id: identify_min_levels
  label: Identify Attribute $0D - Minimum Levels
  kind: query
  command: "210D"
  params: []
  notes: Output units only. Minimum terminal levels or relay turn-on thresholds.

- id: identify_max_levels
  label: Identify Attribute $0E - Maximum Levels
  kind: query
  command: "210E"
  params: []
  notes: Output units only. Maximum terminal levels (unused bytes $FF).

- id: identify_current_sense
  label: Identify Attribute $0F - Current Sense Levels
  kind: query
  command: "210F"
  params: []
  notes: Output units only. Raw A/D current sense values.

- id: identify_output_unit_summary
  label: Identify Attribute $10 - Output Unit Summary
  kind: query
  command: "2110"
  params: []
  notes: Output units only. Flags byte, GAV STORE enable, mains-recovery time.

- id: identify_dsi_status
  label: Identify Attribute $11 - DSI Status
  kind: query
  command: "2111"
  params: []
  notes: DSI output units only. Per-channel status, unit status, dimming uC revision.

# --- Parameter set commands (section 10.2) ---

- id: set_parameter_preferred
  label: Set Parameter (Preferred Method)
  kind: action
  command: "@A3{pp}00{vv}"
  params:
    - name: pp
      type: integer
      description: Parameter number (hex byte).
    - name: vv
      type: integer
      description: Value to set (hex byte).
  notes: Append checksum byte when SRCHK on: "@A3{pp}00{vv}{cc}".

- id: set_parameter_obsolete
  label: Set Parameter (Obsolete BASIC-Mode Method)
  kind: action
  command: "A3{pp}00{vv}"
  params:
    - name: pp
      type: integer
    - name: vv
      type: integer
  notes: BASIC Mode only; issue "~" first.

# --- Addressable parameters (section 10.3) ---
# Each row of the parameter table documented in the source.

- id: set_param_application_address_1
  label: Set Parameter $21 - Application Address 1
  kind: action
  command: "@A32100{vv}"
  params:
    - name: vv
      type: integer
      description: Application address $00-$FE; $FF = wildcard.
  notes: Unlock required from C-Bus port. Default $FF.

- id: set_param_application_address_2
  label: Set Parameter $22 - Application Address 2
  kind: action
  command: "@A32200{vv}"
  params:
    - name: vv
      type: integer
      description: Application address $00-$FE; $FF = unused.
  notes: Unlock required from C-Bus port. Default $FF.

- id: set_param_interface_options_1
  label: Set Parameter $30 - Interface Options 1
  kind: action
  command: "@A33000{vv}"
  params:
    - name: vv
      type: integer
      description: 8-bit options (bits: CONNECT, XONXOFF, SRCHK, SMART, MONITOR, IDMON).
  notes: Volatile. Serial port write only. Loaded from $41 on power-up.

- id: set_param_baud_rate
  label: Set Parameter $3D - Baud Rate Selector
  kind: action
  command: "@A33D00{vv}"
  params:
    - name: vv
      type: integer
      description: "$01=4800, $02=2400, $03=1200, $04=600, $05=300, any other=9600."
  notes: Serial port write only. Default $FF (9600).

- id: set_param_interface_options_2
  label: Set Parameter $3E - Interface Options 2
  kind: action
  command: "@A33E00{vv}"
  params:
    - name: vv
      type: integer
      description: C-Bus options (CLOCK GEN, BURDEN).
  notes: Normally set by C-Bus installation software. Default $00.

- id: set_param_interface_options_1_powerup
  label: Set Parameter $41 - Interface Options 1 Power Up Settings
  kind: action
  command: "@A34100{vv}"
  params:
    - name: vv
      type: integer
      description: Mirrors Interface Options 1 ($30); copied to $30 on power-up.
  notes: Unlock required from C-Bus port. Default $00.

- id: set_param_interface_options_3
  label: Set Parameter $42 - Interface Options 3
  kind: action
  command: "@A34200{vv}"
  params:
    - name: vv
      type: integer
      description: Bits: PCN, LOCAL_SAL, PUN, EXSTAT.
  notes: Unlock required from C-Bus port. Default $00.

# Parameters $EB-$F2 (Custom Manufacturer), $F3-$F6 (Serial Number), $F7-$FE
# (Custom Type) are read-only and therefore not exposed as set actions.

# --- Baud-rate auto-set sequence (section 10.3.3) ---

- id: baud_autoset_9600
  label: Force 9600 Baud on Power-Up
  kind: action
  command: "\\0"
  params: []
  notes: Send the two ASCII characters '\' ($5C) and '0' ($30) at 9600 baud within 5 s of power application.
```

## Feedbacks
```yaml
# Reply formats emitted by the Serial Interface (section 4.3).

- id: cal_reply_short
  type: string
  description: Short-form CAL Reply (BASIC Mode). CAL Data + checksum.

- id: cal_reply_long
  type: string
  description: Long-form CAL Reply (SMART Mode). Includes Unit Address, Serial Interface Unit Address, Network.

- id: monitored_sal
  type: string
  description: Unsolicited SAL message observed on C-Bus when CONNECT option set. Short form in BASIC Mode, long form in SMART Mode.

- id: confirmation_ok
  type: enum
  values: ["."]
  description: Alpha followed by "." means command transmitted to C-Bus successfully.

- id: confirmation_fail_no_ack
  type: enum
  values: ["#"]
  description: Alpha followed by "#" - too many retransmissions, no acknowledge.

- id: confirmation_fail_corrupt
  type: enum
  values: ["$"]
  description: Alpha followed by "$" - corruption during transmission.

- id: confirmation_fail_clock
  type: enum
  values: ["%"]
  description: Alpha followed by "%" - lost C-Bus synchronising clock.

- id: confirmation_input_too_long
  type: enum
  values: ["'"]
  description: Single-quote means received character sequence too long.

- id: power_up_notify
  type: enum
  values: ["+"]
  description: "++<cr><lf>" emitted after init when PUN option set. First "+" may be corrupt/missing.

- id: parameter_change_notify
  type: enum
  values: ["="]
  description: "==<cr><lf>" emitted when internal parameter updated over C-Bus, if PCN option set.

- id: input_error
  type: enum
  values: ["!"]
  description: "!" returned when PCI cannot accept supplied data (checksum fail, buffer full).

- id: status_reply_standard
  type: string
  description: Standard Format Status Reply; Status Header "C0"+count, application, block start, 2-bit-per-GAV status bytes. Returned over >=3 lines.

- id: status_reply_extended
  type: string
  description: Extended Format Status Reply; Status Header "E0"+count, coding byte, application, block start, status bytes. Returned for Level Status Request, or Switched Status Request when EXSTAT option on.

- id: acknowledge_reply
  type: string
  description: ACKNOWLEDGE CAL reply ($32 + Param No + Code), returned in response to parameter set commands.

- id: reply_command
  type: string
  description: REPLY CAL command ($80 + count + Param No + bytes), returned in response to RECALL/IDENTIFY/GETSTATUS.
```

## Variables
```yaml
# Settable parameters exposed as variables (current value queryable via RECALL).
# Population from section 10.3 parameter table.

- name: application_address_1
  param_no: "21"
  type: byte
  access: read_write
  default: "FF"

- name: application_address_2
  param_no: "22"
  type: byte
  access: read_write
  default: "FF"

- name: interface_options_1
  param_no: "30"
  type: byte
  access: read_write
  default: "00"
  volatile: true

- name: baud_rate_selector
  param_no: "3D"
  type: byte
  access: read_write
  default: "FF"

- name: interface_options_2
  param_no: "3E"
  type: byte
  access: read_write
  default: "00"

- name: interface_options_1_powerup
  param_no: "41"
  type: byte
  access: read_write
  default: "00"

- name: interface_options_3
  param_no: "42"
  type: byte
  access: read_write
  default: "00"

# Read-only variables (section 10.3.7-10.3.9)
- name: custom_manufacturer
  param_no_range: "EB-F2"
  type: string
  access: read_only

- name: serial_number
  param_no_range: "F3-F6"
  type: bytes
  access: read_only

- name: custom_type
  param_no_range: "F7-FE"
  type: string
  access: read_only
```

## Events
```yaml
# Unsolicited notifications emitted by the Serial Interface.
# - Power Up Notification (PUN) and Parameter Change Notification (PCN) are
#   already enumerated in Feedbacks above as `power_up_notify` and
#   `parameter_change_notify`.
# - Monitored SAL and Status Replies when CONNECT/MONITOR options set are also
#   in Feedbacks.
# UNRESOLVED: no other unsolicited event classes documented in source.
```

## Macros
```yaml
# Multi-step sequences documented verbatim in source examples (section 9).

- id: macro_set_smart_srchk_connect
  steps:
    - command: "~@A3300019"
  notes: Force BASIC Mode, then set Interface Options 1 ($30) to $19 (SMART + SRCHK + CONNECT) via preferred @A3 method (section 9.4).

- id: macro_multiple_lighting_commands
  steps:
    - command: "\\05380001210122012301240A25010A2601D4r"
  notes: Turn groups $21-$24 ON, ramp $25 and $26 to $01 at 4 s rate, request confirmation (section 9.5).
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - compound_device_power_sync: "For compound devices (separate control processor power), always set PUN option and re-initialise all Serial Interface settings on PUN receipt (section 5)."
  - basic_mode_for_param_set_obsolete: "Obsolete parameter-set method (A3pp00vv) only valid in BASIC Mode; issue '~' first (section 10.2.2)."
  - priority_class_1_forbidden: "Use of C-Bus Priority Class 1 is forbidden without prior Clipsal approval (section 3.4)."
  - status_request_rate: "Excessive Status Requests dramatically degrade network performance; poll infrequently and cache local state (section 4.2.9.2)."
  - burden_change_double_write: "Changes to Interface Options 2 BURDEN bit must be issued twice within 10 s to take effect (section 10.3.4)."
# No electrical/voltage safety interlocks stated in this source document.
```

## Notes
- Source document is CBUS-SIUG Issue 1.17 (9 Dec 2008) — *C-Bus Serial Interface & C-Bus Development Kit* — describing Serial Interface version 4.0.00 and higher. It covers the protocol used by 5100PC, 5500PC, 5000SM, 5000SM/2 PC Interface / SIM devices.
- The 5500PACA (Pascal Automation Controller) is the target product per input metadata but is **not** explicitly named in the refined source document; coverage of the 5500PACA's Pascal/PICED programming interface, physical RS-232 pinout, voltage, and current ratings is out of scope of this source.
- All commands sent to the Serial Interface terminate with `<cr>` ($0D); max 45 characters between leading `\` and `<cr>` (section 4.2.2).
- All Serial Interface checksums are 2's-complement mod-256 sums of the preceding hex byte pairs; appended only when SRCHK option set (section 3.6).
- Default baud rate is 9600; lower rates (4800/2400/1200/600/300) selectable via param $3D but not recommended due to limited internal buffering (section 10.3.3).
- Serial Interface firmware <3.11 is pre-release; v3 firmware ≤3.16 has a baud-reversion bug limiting those units to 9600 baud (section 11).
- Default factory Interface Options 1 ($30) value is $00 (BASIC Mode, no options).

<!-- UNRESOLVED: 5500PACA model not explicitly named in source; relationship of this protocol guide to the 5500PACA's primary programmable interface is unconfirmed. -->
<!-- UNRESOLVED: serial data bits, parity, stop bits, hardware flow control not stated in source. -->
<!-- UNRESOLVED: physical connector pinout, voltage, current, power specs not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility range for 5500PACA not stated. -->
<!-- UNRESOLVED: full CAL command catalogue (unit-specific commands "subject to change without notice" per section 7) — only the common subset tabulated in section 7.1 is enumerated here. -->
<!-- UNRESOLVED: non-Lighting C-Bus Applications (CBUS-APP document set) not in source; only the Lighting Application $38 SAL subset is enumerated. -->
````

Spec built. Verbatim payload from CBUS-SIUG Issue 1.17. Enumerated: 4 special chars, 16 ramp opcodes + ON/OFF/TERMINATE, 2 status requests + legacy FA, 4 CAL commands, 18 IDENTIFY attrs ($00-$11), 2 param-set methods, 7 settable params, autoset, 9 reply types, read-only params noted omitted. Safety from section 5/3.4/4.2.9.2/10.3.4/10.2.2.

## Provenance

```yaml
source_domains:
  - web.archive.org
  - noushouse.com.au
  - updates.clipsal.com
  - cleverhome.com.au
  - manualshelf.com
source_urls:
  - "https://web.archive.org/web/20180205062541if_/http://training.clipsal.com/downloads/OpenCBus/Serial%20Interface%20User%20Guide.pdf"
  - "https://www.noushouse.com.au/brochures/Clipsal/System%20Units/Clipsal-C-Bus-5500PACA-Pascal-Automation-Controller.pdf"
  - https://updates.clipsal.com/ClipsalSoftwareDownload/mainsite/cis/technical/AutoController/LSS5500NAC_LSS5500SHAC_FW_v1.0_EN.pdf
  - https://www.cleverhome.com.au/manuals/Clipsal-C-Bus-5500PACA-Pascal-Automation-Controller-Installation.pdf
  - https://www.manualshelf.com/manual/clipsal/c-bus/user-guide-english.html
retrieved_at: 2026-07-26T06:52:29.843Z
last_checked_at: 2026-08-05T08:14:27.946Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:14:27.946Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions map 1:1 to SAL opcodes (6.3), CAL commands (7.1), IDENTIFY attrs $00-$11 (7.2), and parameter methods (10.2/10.3) in the source. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The 5500PACA is named only in the input metadata; the refined source document covers the C-Bus Serial Interface protocol generically and does not explicitly mention the 5500PACA model. Voltage/current/power specs, physical wiring, and PICED/Pascal programming interface are out of scope of this source."
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control framing not stated; XON/XOFF is a configurable Serial Interface option (Interface Options 1 bit 2), not RS-232 hardware flow control"
- "no other unsolicited event classes documented in source."
- "5500PACA model not explicitly named in source; relationship of this protocol guide to the 5500PACA's primary programmable interface is unconfirmed."
- "serial data bits, parity, stop bits, hardware flow control not stated in source."
- "physical connector pinout, voltage, current, power specs not stated in source."
- "firmware version compatibility range for 5500PACA not stated."
- "full CAL command catalogue (unit-specific commands \"subject to change without notice\" per section 7) — only the common subset tabulated in section 7.1 is enumerated here."
- "non-Lighting C-Bus Applications (CBUS-APP document set) not in source; only the Lighting Application $38 SAL subset is enumerated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
