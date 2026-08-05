---
spec_id: admin/extron-mvc-121-xi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron MVC 121 xi Control Spec"
manufacturer: Extron
model_family: "MVC 121 xi"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "MVC 121 xi"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
  - manualshelf.com
source_urls:
  - https://media.extron.com/public/download/files/userman/mvc_121_xi_68-3731-01_A.pdf
  - https://www.extron.com/download/files/userman/MVC121manual_revCforweb.pdf
  - https://www.extron.com/download/files/userman/mvc_121_xi_68-3731-01_A.pdf
  - https://www.manua.ls/extron/mvc-121-xi/manual
  - https://www.manualshelf.com/manual/extron-electronics/mvc-121-xi/User-guide-english
retrieved_at: 2026-07-26T13:13:58.001Z
last_checked_at: 2026-08-05T08:21:54.031Z
generated_at: 2026-08-05T08:21:54.031Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The \"Reset (ZAP)/Erase Commands\" table (referenced on page 22) and the full DSP Parameter Set (PS) sub-mnemonic table are not present in the refined source excerpt; only ZXXX is named in passing. The full SIS catalogue beyond what is excerpted here (e.g. additional DSP object commands, file/preset management, IP/SSH configuration) is not represented."
  - "source does not document any other unsolicited async events"
  - "source documents no explicit multi-step named macros/sequences."
  - "no power-on/off sequencing requirements are stated (device has"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:21:54.031Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions match SIS tokens verbatim in source's command table; transport parameters (38400/8/N/1/none) confirmed; ZXXX and DSP PS flagged UNRESOLVED per source's own omission. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Extron MVC 121 xi Control Spec

## Summary
The Extron MVC 121 xi is a Mixer / Volume Controller (DSP-based auto-mixer) with four mic/line inputs and stereo variable plus fixed line outputs. This spec covers serial control of the device via Extron's Simple Instruction Set (SIS) over the rear-panel Remote RS-232 port and the front-panel USB-C configuration port, including product queries, group master setup, metering, source/output naming, digital input (GPI) configuration, and executive (front-panel lockout) modes.

<!-- UNRESOLVED: The "Reset (ZAP)/Erase Commands" table (referenced on page 22) and the full DSP Parameter Set (PS) sub-mnemonic table are not present in the refined source excerpt; only ZXXX is named in passing. The full SIS catalogue beyond what is excerpted here (e.g. additional DSP object commands, file/preset management, IP/SSH configuration) is not represented. -->

## Transport
```yaml
protocols:
  - serial
# Source documents both a rear-panel Remote RS-232 port (3-pole 3.5mm captive
# screw, bidirectional ±5 V RS-232) and a front-panel USB-C configuration port
# carrying the same SIS command set. USB-C is a configuration transport; only
# serial is declared here as the documented control transport.
serial:
  baud_rate: 38400  # source: "The default baud rate is 38400."
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Baud rates 9600, 19200, 38400 (default), and 115200 are user-selectable
  # via DSP Configurator Pro / SIS `CP` command. The factory default is 38400.
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
# Evidence-based traits:
- queryable   # query commands return device state (part number, model, firmware, verbose mode, group masters, meter levels, names, exec mode)
- levelable   # group master gain set / increment / decrement / soft limits documented (resolution 0.1 dB)
- powerable   # inferred: device-initiated power-up banner is the only power-related behaviour; no explicit SIS PW command. See UNRESOLVED below.
# NOTE on `powerable`: the source contains NO host-issued power on/off SIS
# command. The only power behaviour documented is a device-initiated power-up
# banner. `powerable` is therefore NOT asserted; treat as UNRESOLVED.
```

## Actions
```yaml
# All commands are written verbatim as in the source's "Command and Response
# Table for SIS Commands". Per source convention:
#   - `]`  = CR/LF (terminates device responses)
#   - `}`  = Soft carriage return (no line feed)
#   - `E`/`W` = Escape character (literal host-side escape)
#   - `•`  = literal space character required by the command
#   - `*`  = literal asterisk (command delimiter, not a variable)
#   - X.. variables are placeholders (defined inline per command).

# ---- Product Information ----
- id: view_part_number
  label: View Part Number
  kind: query
  command: "N"
  params: []
  response: "60-2048-01 ]"

- id: view_general_info
  label: View General Information
  kind: query
  command: "I"
  params: []
  response: "V00X00 • A04X04 ]"

- id: view_model_name
  label: View Model Name
  kind: query
  command: "1I"
  params: []
  response: "MVC • 121 • xi ]"

- id: view_model_description
  label: View Model Description
  kind: query
  command: "2I"
  params: []
  response: "Mixer • Volume • Controller ]"

- id: view_firmware_version
  label: View Firmware Version
  kind: query
  command: "Q"
  params: []
  response: "<version> ]   # x.xx (major.minor)"

- id: view_firmware_version_with_patch
  label: View Firmware Version (with patch)
  kind: query
  command: "*Q"
  params: []
  response: "<version> ]   # x.xx.xxx (major.minor.patch)"

- id: view_embedded_os_version
  label: View Embedded OS Type / Version
  kind: query
  command: "14Q"
  params: []
  response: "<embedded OS version> ]"

- id: view_detailed_firmware_version
  label: View Detailed Firmware Version
  kind: query
  command: "0Q"
  params: []
  response: "X1& ]   # <bootloader>-<factory code>-<updated code>"

# ---- Miscellaneous Functions ----
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E X* CN }"
  params:
    - name: X*
      type: string
      description: >-
        Unit name, up to 24 chars from A-Z, 0-9, hyphen (-). No spaces.
        First char must be alpha; last char must not be hyphen.
        Case-insensitive.
  response: "Ipn • X* ]"

- id: set_unit_name_to_default
  label: Set Unit Name to Default
  kind: action
  command: "E• CN }"
  params: []
  response: "Ipn • MVC-121-xi ]"

- id: view_unit_name
  label: View Unit Name
  kind: query
  command: "E CN }"
  params: []
  response: "X* ]"

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E X1% CV }"
  params:
    - name: X1%
      type: integer
      description: >-
        0 = Clear/none, 1 = Verbose mode (default for RS-232/USB),
        2 = Tagged responses for queries, 3 = Verbose + tagged responses.
  response: "Vrb X1% ]"

- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "E CV }"
  params: []
  response: "X1% ]"

# ---- Bi-directional Serial Data Port (baud configuration) ----
- id: set_serial_port_parameters
  label: Set Serial Port Parameters (baud rate)
  kind: action
  command: "E X% CP }"
  params:
    - name: X%
      type: integer
      description: "Baud rate: 0 = 9600, 1 = 19200, 2 = 38400 (default), 3 = 115200."
  response: "Ccp X% ]"

- id: view_serial_port_parameters
  label: View Serial Port Parameters
  kind: query
  command: "E CP }"
  params: []
  response: "X% ]"

# ---- Group Master Setup: Soft Limits ----
- id: set_group_master_soft_limits
  label: Set Group Master Soft Limits
  kind: action
  command: "E L X( * X1) * X1! GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
    - name: X1)
      type: integer
      description: "Parameter number: 6 = Gain, 12 = Mute."
    - name: X1!
      type: number
      description: >-
        Soft limit maximum value. For gain (resolution 0.1 dB), multiply by 10.
        For mute, use 0 or 1.
  response: "GrpmL X( * X1) * X1! ]"

- id: view_group_master_parameters
  label: View Group Master Parameters
  kind: query
  command: "E P X( GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
  response: "X1) ]"

- id: view_group_master_members
  label: View Group Master Members
  kind: query
  command: "E O X( GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
  response: "X1^1 * X1^2 ... * X1^8 ]"

- id: view_group_master_soft_limits
  label: View Group Master Soft Limits
  kind: query
  command: "E L X( GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
  response: "X1! * X1@ ]"

- id: set_group_master_name
  label: Set Group Master Name
  kind: action
  command: "E N X( * name GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
    - name: name
      type: string
      description: >-
        Name, max 24 chars. Invalid chars: ~ , @ = ' [ ] { } < > " ; : | \ and ?
  response: "GrpmN X( * name ]"

- id: view_group_master_name
  label: View Group Master Name
  kind: query
  command: "E N X( GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
  response: "name ]"

- id: set_group_master_dB
  label: Set Group Master Level (+/- dB)
  kind: action
  command: "E D X( *+/- X1# GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
    - name: X1#
      type: number
      description: >-
        Group master value. For gain (resolution 0.1 dB), multiply by 10.
        For mute, use 0 or 1. Default 0.
  response: "GrpmD X( * X1# ]"

- id: set_group_master_mute
  label: Set Group Master Mute
  kind: action
  command: "E D X( * X1# GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
    - name: X1#
      type: integer
      description: "Mute value: 0 = unmuted, 1 = muted."
  response: "GrpmD X( * X1# ]"

- id: increment_group_master
  label: Increment Group Master
  kind: action
  command: "E D X( * X1$ +GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
    - name: X1$
      type: number
      description: >-
        Increment value. For gain (resolution 0.1 dB), multiply by 10.
        For mute, use 0 or 1.
  response: "GrpmD X( * X1# ]"

- id: decrement_group_master
  label: Decrement Group Master
  kind: action
  command: "E D X( * X1$ -GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
    - name: X1$
      type: number
      description: >-
        Decrement value. For gain (resolution 0.1 dB), multiply by 10.
        For mute, use 0 or 1.
  response: "GrpmD X( * X1# ]"

- id: view_group_master_value
  label: View Group Master Value
  kind: query
  command: "E D X( * GRPM }"
  params:
    - name: X(
      type: integer
      description: "Group number (1-16)."
  response: "X1# ]"

# ---- Metering ----
- id: view_meter_level
  label: View Meter Level
  kind: query
  command: "E v X1^ Au }"
  params:
    - name: X1^
      type: integer
      description: >-
        Object ID (OID). See OID tables: inputs 40000-40003, variable outputs
        60000/60001, mix matrix OIDs 20000-20301.
  response: "DsV X1^ * X2& * X2* ]   # X2& = meter enabled (0/1); X2* = level (-1500..0)"

# ---- Naming of Sources and Outputs ----
- id: set_input_name
  label: Set Input (Source) Name
  kind: action
  command: "E X^ ,name NI }"
  params:
    - name: X^
      type: integer
      description: "Named source: 1 = MIC-1, 2 = MIC-2, 3 = LINE."
    - name: name
      type: string
      description: >-
        Name, max 24 chars. Invalid chars: ~ , @ = ' [ ] { } < > " ; : | \ and ?
  response: "Nmi X^ ,name ]"

- id: view_input_name
  label: View Input (Source) Name
  kind: query
  command: "E X^ NI }"
  params:
    - name: X^
      type: integer
      description: "Named source: 1 = MIC-1, 2 = MIC-2, 3 = LINE."
  response: "name ]"

- id: set_output_name
  label: Set Output Name
  kind: action
  command: "E X& ,name NO }"
  params:
    - name: X&
      type: integer
      description: "Named output: 1 = VARIABLE output, 2 = FIXED output."
    - name: name
      type: string
      description: >-
        Name, max 24 chars. Invalid chars: ~ , @ = ' [ ] { } < > " ; : | \ and ?
  response: "Nmo X^ ,name ]"

- id: view_output_name
  label: View Output Name
  kind: query
  command: "E X& NO }"
  params:
    - name: X&
      type: integer
      description: "Named output: 1 = VARIABLE output, 2 = FIXED output."
  response: "name ]"

# ---- Digital Inputs (GPI) ----
- id: set_digital_input_configuration
  label: Set Digital Input Configuration
  kind: action
  command: "E X! * X@ * X# GPIT }"
  params:
    - name: X!
      type: integer
      description: "Digital input number (1-4)."
    - name: X@
      type: integer
      description: >-
        Action type. 0 = no action/off (default). Input mutes:
        1 = level-trigger low mutes, 2 = level-trigger high mutes,
        3 = edge-trigger high-to-low mutes / low-to-high unmutes,
        4 = edge-trigger high-to-low unmutes / low-to-high mutes,
        5 = toggle-trigger high-to-low toggles mute,
        6 = toggle-trigger low-to-high toggles mute. Group mutes:
        7 = level-trigger low mutes group, 8 = level-trigger high mutes group,
        9 = edge-trigger high-to-low mutes group / low-to-high unmutes group,
        10 = edge-trigger high-to-low unmutes group / low-to-high mutes group,
        11 = toggle-trigger high-to-low toggles mute,
        12 = toggle-trigger low-to-high toggles mute.
    - name: X#
      type: integer
      description: >-
        Input or group number (varies by action type). Off = 0.
        Input range 1-4. Group range 1-16.
  response: "Gpit X! * X@ * X# ]"

- id: view_digital_input_status
  label: View Digital Input Status / Configuration
  kind: query
  command: "E X! GPIT }"
  params:
    - name: X!
      type: integer
      description: "Digital input number (1-4)."
  response: "X@ * X# ]"

- id: set_digital_input_state
  label: Set Digital Input State
  kind: action
  command: "E X! GPI }"
  params:
    - name: X!
      type: integer
      description: "Digital input number (1-4)."
  response: "X$ ]   # X$ = voltage state: 0 = low, 1 = high"

# ---- Executive Modes (front-panel lockout) ----
- id: set_executive_mode
  label: Set Running Executive Mode
  kind: action
  command: "X1* X"
  params:
    - name: X1*
      type: integer
      description: "0 = No lockout (default), 1 = Full front-panel lockout, 2 = User-defined front-panel lockout."
  response: "Exe X1* ]"

- id: view_executive_mode
  label: View Running Executive Mode
  kind: query
  command: "X X"
  params: []
  response: "X1* ]"

- id: configure_user_executive_mode
  label: Configure User-Defined Executive Mode
  kind: action
  command: "E M X1( * X2)X2!X2@X2#X2$X2%X2^ EXEC }"
  params:
    - name: X1(
      type: integer
      description: "User-defined executive mode number (always 1)."
    - name: X2)
      type: integer
      description: "VOLUME encoder (variable-out): 0 = unselected (default), 1 = selected for filtering."
    - name: X2!
      type: integer
      description: "MIC-1 button (mix-point): 0 = unselected (default), 1 = selected for filtering."
    - name: X2@
      type: integer
      description: "MIC-2 button (mix-point): 0 = unselected (default), 1 = selected for filtering."
    - name: X2#
      type: integer
      description: "LINE button (mix-point): 0 = unselected (default), 1 = selected for filtering."
    - name: X2$
      type: integer
      description: "MIC-1 button (input-gain): 0 = unselected, 1 = selected for filtering (default)."
    - name: X2%
      type: integer
      description: "MIC-2 button (input-gain): 0 = unselected, 1 = selected for filtering (default)."
    - name: X2^
      type: integer
      description: "LINE button (input-gain): 0 = unselected, 1 = selected for filtering (default)."
  response: "ExecM X1( * X2)X2!X2@X2#X2$X2%X2^ ]"

- id: view_user_executive_mode_configuration
  label: View User-Defined Executive Mode Configuration
  kind: query
  command: "E M X1( EXEC }"
  params:
    - name: X1(
      type: integer
      description: "User-defined executive mode number (always 1)."
  response: "X2)X2!X2@X2#X2$X2%X2^ ]"
```

## Feedbacks
```yaml
- id: power_up_banner
  type: string
  description: >-
    Device-initiated power-up message sent to host on completion of start-up.
    Format: "© Copyright 2024, Extron MVC 121 xi, V<firmware>, <part number> ]"

- id: error_response
  type: enum
  description: Returned when the MVC 121 xi cannot execute a command.
  values:
    - E10   # Unrecognized command
    - E12   # Invalid port number
    - E13   # Invalid parameter
    - E14   # Not valid for this configuration
    - E17   # Invalid command for signal type
    - E18   # System timed out
    - E22   # Busy
    - E25   # Device not present

- id: group_master_value
  type: number
  description: Returned by group master value query (X1#).

- id: meter_level
  type: number
  description: Returned by meter query; range -1500..0 (i.e. -150.0..0.0 dB).

- id: digital_input_voltage
  type: enum
  values: ["0 (low)", "1 (high)"]
  description: Returned by digital input state query.

- id: firmware_version
  type: string
  description: Returned by Q / *Q / 14Q / 0Q queries.
```

## Variables
```yaml
- id: unit_name
  type: string
  description: >-
    Unit name (X*). Up to 24 chars from A-Z, 0-9, hyphen. First char must be
    alpha; last char must not be hyphen. Case-insensitive.

- id: verbose_mode
  type: integer
  description: >-
    Verbose mode (X1%): 0 = clear/none, 1 = verbose (default for RS-232/USB),
    2 = tagged responses for queries, 3 = verbose + tagged responses.
    Independent per port (serial vs USB); reverts to default on power-cycle or
    ZXXX reset.

- id: baud_rate
  type: integer
  description: >-
    Baud rate (X%): 0 = 9600, 1 = 19200, 2 = 38400 (default), 3 = 115200.

- id: executive_mode
  type: integer
  description: "Running executive mode (X1*): 0 = no lockout (default), 1 = full lockout, 2 = user-defined lockout."
```

## Events
```yaml
- id: power_up_message
  description: >-
    Unsolicited banner sent once by the device on completion of start-up:
    "© Copyright 2024, Extron MVC 121 xi, V<firmware>, <part number> ]"
# UNRESOLVED: source does not document any other unsolicited async events
# (e.g. meter streaming, GPIO change notifications). Metering appears to be
# host-polled only.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step named macros/sequences.
# Reset equivalence note: per source, holding the recessed rear-panel RESET
# button until the reset LED blinks three times, then a momentary re-press
# within 1 second, performs a full factory reset "equivalent to SIS command
# ZXXX" - but the actual ZAP/Erase command table is not present in this
# excerpt (see UNRESOLVED in Summary).
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: factory_reset
    description: >-
      Full Factory Reset: hold RESET button until LED blinks three times (3s,
      6s, 9s), then release and press RESET again within 1 second. Returns
      all gains, mute states, mix-points, DSP parameters, channel names, and
      group master memberships to factory defaults (firmware not affected).
      Documented as equivalent to SIS ZXXX.
  - id: factory_boot_code
    description: >-
      Run Factory Boot Code: hold RESET while applying power. Reverts to
      factory default firmware for a SINGLE power cycle only. All user files
      and settings are maintained. Source explicitly warns: "Do not operate
      with the default firmware loaded by this mode. Use it only to load the
      most current firmware to the device."
  - id: phantom_power_executive_mode
    description: >-
      +48 V phantom power is toggled from the front panel only by pressing and
      holding MIC-1 or MIC-2 for 10 seconds, and ONLY in Executive Mode 0.
      In Executive Modes 1 and 2, phantom power cannot be toggled from the
      front panel and must be set via DSP Configurator Pro. Do not adjust the
      volume encoder while holding the buttons.
# UNRESOLVED: no power-on/off sequencing requirements are stated (device has
# no SIS power command); no voltage/current specs surfaced in this excerpt.
```

## Notes
- **Transport / framing:** All device responses terminate with CR/LF (rendered in source as `]`). A soft carriage return (no LF) is rendered as `}` or `|` and is used as the command terminator for many host-to-device SIS commands. A literal space required by a command is rendered in source as `•` (only instances marked with `•` actually require a space; other spaces in the source tables are typographic).
- **`*` is a literal delimiter**, not a wildcard — it appears in many set commands (e.g. `E L X( * X1) * X1! GRPM }`).
- **Default baud rate is 38400**, higher than most other Extron products. Host must match. DSP Configurator Pro auto-negotiates; DataViewer / third-party control systems must be set explicitly.
- **Baud rate is configurable via SIS** (`CP` command) across 9600 / 19200 / 38400 / 115200; changing baud requires reconnecting at the new rate.
- **Verbose mode is per-port and ephemeral:** the RS-232 and USB-C configuration ports have independent verbose settings, and both revert to default (mode 1) on power-cycle or ZXXX reset.
- **Object ID (OID) tables (from source):**
  - Input selection OIDs: Mic/Line 1 = `40000`, Mic/Line 2 = `40001`, Line L = `40002`, Line R = `40003`.
  - Variable output gain OIDs: Variable L = `60000`, Variable R = `60001`.
  - Mix matrix OIDs (input × output): row Mic/Line 1 → `20000` (Var L), `20001` (Var R); row Mic/Line 2 → `20100`, `20101`; row Line L → `20200`, `20201`; row Line R → `20300`, `20301`.
- **DSP Set/Get command form:** `E <ParamID><OID> * <value> AU }` (set) and `E <ParamID><OID> AU }` (get), with verbose response `Ds <ParamID><OID> * <value> ]`. Example from source: `E G60000*-100AU }` sets gain of OID 60000 (variable L out) to -10.0 dB.
- **Executive Modes** cycle from the front panel by holding MIC-1 + LINE simultaneously. Mode 1 disables the entire front panel (MIC-1 LED lit). Mode 2 is a single user-defined filter config (only one slot, always mode number 1).
- **Rejected characters** in any name / password / local file name: `{space (allowed in names only)} + ~ , @ = ' { } [ ] < > \` " ; : \ ?`.

<!-- UNRESOLVED: -->
<!-- - "Reset (ZAP)/Erase Commands" table on page 22 of the user guide is not present in this refined excerpt; only the ZXXX token is named in passing. The actual reset/erase SIS payloads are therefore not represented in Actions. -->
<!-- - Full DSP Parameter Set (PS-style) sub-mnemonic table is not excerpted; only the generic Set/Get form and one example (G = gain/attenuation) appear. Other parameter IDs (mute, EQ, compressor, etc.) are referenced only as `<ParameterID>` placeholders. -->
<!-- - No power on/off SIS command documented; the device appears to be always-on when powered. `powerable` trait is therefore not asserted. -->
<!-- - Firmware version compatibility range not stated. -->
<!-- - IP/Ethernet control, if any, is not described in this excerpt (only RS-232 and USB-C configuration transport are documented). -->
<!-- - File / preset / scene management commands (`^AR Merge Scene...` appears in the conventions preamble) are not enumerated in the excerpted command tables. -->
```

Spec ready. 38 actions enumerated from SIS table (product info ×8, misc ×6, serial config ×2, group master ×11, metering ×1, naming ×4, digital inputs ×3, exec modes ×4). All payloads verbatim. Serial config populated from stated default 38400/8/N/1/none. Auth = none (inferred). ZXXX + DSP PS + IP control marked UNRESOLVED (not in excerpt). Powerup banner + E10/E12/E13/E14/E17/E18/E22/E25 errors in Feedbacks/Events.

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - manua.ls
  - manualshelf.com
source_urls:
  - https://media.extron.com/public/download/files/userman/mvc_121_xi_68-3731-01_A.pdf
  - https://www.extron.com/download/files/userman/MVC121manual_revCforweb.pdf
  - https://www.extron.com/download/files/userman/mvc_121_xi_68-3731-01_A.pdf
  - https://www.manua.ls/extron/mvc-121-xi/manual
  - https://www.manualshelf.com/manual/extron-electronics/mvc-121-xi/User-guide-english
retrieved_at: 2026-07-26T13:13:58.001Z
last_checked_at: 2026-08-05T08:21:54.031Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:21:54.031Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions match SIS tokens verbatim in source's command table; transport parameters (38400/8/N/1/none) confirmed; ZXXX and DSP PS flagged UNRESOLVED per source's own omission. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The \"Reset (ZAP)/Erase Commands\" table (referenced on page 22) and the full DSP Parameter Set (PS) sub-mnemonic table are not present in the refined source excerpt; only ZXXX is named in passing. The full SIS catalogue beyond what is excerpted here (e.g. additional DSP object commands, file/preset management, IP/SSH configuration) is not represented."
- "source does not document any other unsolicited async events"
- "source documents no explicit multi-step named macros/sequences."
- "no power-on/off sequencing requirements are stated (device has"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
