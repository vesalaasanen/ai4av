---
spec_id: admin/sharp-nec-np-v332x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-V332X Control Spec"
manufacturer: Sharp/NEC
model_family: NP-V332X
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-V332X
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:19:07.672Z
last_checked_at: 2026-09-20T22:18:54.302Z
generated_at: 2026-09-20T22:18:54.302Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is a multi-model command reference manual; it does not itself name NP-V332X. Per-model command availability is deferred to the Appendix \"Connecting an External Device\" and \"Supplementary Information by Command\", which are NOT included in this source text. Therefore: which of the commands below the NP-V332X actually supports is unresolved."
  - "input terminal code values, aspect values, eco mode values, base model type values and sub input values are all deferred to the Appendix \"Supplementary Information by Command\", which is not present in the source. Those parameter enumerations are unresolved."
  - "<ID1> (control ID) and <ID2> (model code) values for this model are not stated in the source."
  - "default/factory baud rate not stated; only the set of selectable rates is given."
  - "source lists selectable rates 115200/38400/19200/9600/4800 bps; no default stated"
  - "RTS/CTS pins are wired (pins 7/8) but the source does not state flow control is used"
  - "range is device-reported via 060-1, not stated as a fixed range in source"
  - device-reported
  - "value enumeration deferred to Appendix \"Supplementary Information by Command\""
  - "sub input value enumeration deferred to Appendix"
  - "no matching read command documented in this source"
  - "control ID value and its set/get procedure not stated in source"
  - "the source documents only request/response exchanges. No unsolicited"
  - "no multi-step sequences are described in the source."
  - "no voltage, current, power, lamp-cooling duration or power-on sequencing"
  - "per-model command support, input terminal codes, aspect codes, eco mode codes, base model type codes and PIP sub input codes all depend on the two Appendices (\"Connecting an External Device\", \"Supplementary Information by Command\") that are referenced throughout but not present in the source document."
  - "default baud rate, flow control usage, control ID default value, model code (ID2) for NP-V332X, command inter-byte and inter-command timing, and cooling duration are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-09-20T22:18:54.302Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec actions match source command bytes verbatim; transport port 7142 and serial settings confirmed; source's 54 commands fully represented. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Sharp/NEC NP-V332X Control Spec

## Summary
Sharp/NEC projector external control interface, as documented in the vendor "Projector Control Command Reference Manual". Control is via a binary (hexadecimal) packet protocol carried over RS-232C on the PC CONTROL D-SUB 9P port, or over TCP on the LAN port using port 7142. Every command is a byte sequence terminated by a one-byte checksum equal to the low-order byte of the sum of all preceding bytes; responses echo the command class with `<ID1> <ID2>` (control ID and model code) and return either a data payload or an `<ERR1> <ERR2>` error pair.

<!-- UNRESOLVED: the source is a multi-model command reference manual; it does not itself name NP-V332X. Per-model command availability is deferred to the Appendix "Connecting an External Device" and "Supplementary Information by Command", which are NOT included in this source text. Therefore: which of the commands below the NP-V332X actually supports is unresolved. -->
<!-- UNRESOLVED: input terminal code values, aspect values, eco mode values, base model type values and sub input values are all deferred to the Appendix "Supplementary Information by Command", which is not present in the source. Those parameter enumerations are unresolved. -->
<!-- UNRESOLVED: <ID1> (control ID) and <ID2> (model code) values for this model are not stated in the source. -->
<!-- UNRESOLVED: default/factory baud rate not stated; only the set of selectable rates is given. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142   # stated: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: null  # UNRESOLVED: source lists selectable rates 115200/38400/19200/9600/4800 bps; no default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins are wired (pins 7/8) but the source does not state flow control is used
  duplex: full
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from POWER ON (015) / POWER OFF (016) commands
- routable    # inferred from INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10)
- queryable   # inferred from the many *_REQUEST commands returning state
- levelable   # inferred from VOLUME ADJUST (030-2) and PICTURE ADJUST (030-1)
```

## Actions
```yaml
# Payload convention, from source section 2.1/2.2:
#   - all bytes below are copied verbatim from the source, in the source's "NNh" notation
#   - <CKS> = low-order byte of the sum of all preceding bytes (source 2.2, worked example 2.2)
#   - <ID1> = control ID, <ID2> = model code; these appear in RESPONSES only, not in commands
# Where a command has no variable data, the source prints a fully literal byte string
# including its checksum; those are reproduced exactly.

# --- 009 ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: Returns DATA01-DATA12 error bitfield; bit set to 1 indicates an error.

# --- 015 / 016 ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While this command is turning on the power, no other command can be accepted.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: While this command is turning off the power (including cooling time), no other command can be accepted.

# --- 018 ---
- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} <CKS>"
  params:
    - name: input
      type: byte
      description: Input terminal code (DATA01). Value table deferred to Appendix "Supplementary Information by Command" - UNRESOLVED.
  example: "02h 03h 00h 00h 02h 01h 06h 0Eh"   # switch to video port (DATA01 = 06h)
  notes: Response DATA01 = FFh means ended with an error (no signal switch made).

# --- 020 / 021 / 022 / 023 / 024 / 025 ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Picture mute is cleared by an input terminal switch or a video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Sound mute is cleared by an input terminal switch, a video signal switch, or a sound volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Onscreen mute is cleared by an input terminal switch or a video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- 030-1 ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} <CKS>"
  params:
    - name: target
      type: enum
      description: DATA01 adjustment target
      values:
        - "00h: Brightness"
        - "01h: Contrast"
        - "02h: Color"
        - "03h: Hue"
        - "04h: Sharpness"
    - name: mode
      type: enum
      description: DATA02 adjustment mode
      values:
        - "00h: absolute value"
        - "01h: relative value"
    - name: value_lo
      type: byte
      description: DATA03 adjustment value, low-order 8 bits
    - name: value_hi
      type: byte
      description: DATA04 adjustment value, high-order 8 bits
  examples:
    - "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"   # brightness = 10
    - "03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"   # brightness = -10
  notes: Response DATA01/DATA02 = 0000h means success; any other value means error.

# --- 030-2 ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} <CKS>"
  params:
    - name: mode
      type: enum
      description: DATA01 adjustment mode
      values:
        - "00h: absolute value"
        - "01h: relative value"
    - name: value_lo
      type: byte
      description: DATA02 adjustment value, low-order 8 bits
    - name: value_hi
      type: byte
      description: DATA03 adjustment value, high-order 8 bits
  example: "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"   # volume = 10

# --- 030-12 ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h <CKS>"
  params:
    - name: aspect
      type: byte
      description: DATA01 aspect value. Value table deferred to Appendix "Supplementary Information by Command" - UNRESOLVED.

# --- 030-15 ---
- id: other_adjust
  label: Other Adjust (Lamp / Light Adjust gain)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} <CKS>"
  params:
    - name: mode
      type: enum
      description: DATA03 adjustment mode
      values:
        - "00h: absolute value"
        - "01h: relative value"
    - name: value_lo
      type: byte
      description: DATA04 adjustment value, low-order 8 bits
    - name: value_hi
      type: byte
      description: DATA05 adjustment value, high-order 8 bits
  notes: DATA01/DATA02 = 96h/FFh selects the LAMP ADJUST / LIGHT ADJUST target - the only target listed in the source.

# --- 037 ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time in seconds (DATA83-86), filter usage time in seconds (DATA87-90). Usage time is readable in one-second units but updated at one-minute intervals.

# --- 037-3 ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: DATA01-04 filter usage time (seconds), DATA05-08 filter alarm start time (seconds). Returns "-1" if no time is defined.

# --- 037-4 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} <CKS>"
  params:
    - name: lamp
      type: enum
      description: DATA01 lamp selector
      values:
        - "00h: Lamp 1"
        - "01h: Lamp 2 (two-lamp models only)"
    - name: content
      type: enum
      description: DATA02 content
      values:
        - "01h: Lamp usage time (seconds)"
        - "04h: Lamp remaining life (%)"
  example: "03h 96h 00h 00h 02h 00h 01h 9Ch"   # get lamp usage time
  notes: A negative remaining-life value is returned if the lamp replacement deadline is exceeded.

# --- 037-6 ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {scope} <CKS>"
  params:
    - name: scope
      type: enum
      description: DATA01
      values:
        - "00h: Total Carbon Savings"
        - "01h: Carbon Savings during operation"
  notes: Response DATA02-05 kilograms (max 99999 kg), DATA06-09 milligrams (max 999999 mg).

# --- 050 (generic) ---
- id: remote_key_code
  label: Remote Key Code (generic)
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} <CKS>"
  params:
    - name: key_lo
      type: byte
      description: DATA01, low byte of the WORD key code
    - name: key_hi
      type: byte
      description: DATA02, high byte of the WORD key code (00h for every key in the source key code list)
  example: "02h 0Fh 00h 00h 02h 05h 00h 18h"   # AUTO
  notes: Response DATA01 = FFh means ended with an error. The 25 enumerated keys below are the rows of the source "Key code list".

# --- 050 enumerated key codes (source "Key code list" rows) ---
# Checksums below are computed from the source's stated rule (2.2): sum of preceding
# bytes = 02h+0Fh+00h+00h+02h+DATA01+00h. Verified against the source's own AUTO example.
- id: key_power_on
  label: Key - POWER ON
  kind: action
  command: "02h 0Fh 00h 00h 02h 02h 00h 15h"
  params: []

- id: key_power_off
  label: Key - POWER OFF
  kind: action
  command: "02h 0Fh 00h 00h 02h 03h 00h 16h"
  params: []

- id: key_auto
  label: Key - AUTO
  kind: action
  command: "02h 0Fh 00h 00h 02h 05h 00h 18h"
  params: []

- id: key_menu
  label: Key - MENU
  kind: action
  command: "02h 0Fh 00h 00h 02h 06h 00h 19h"
  params: []

- id: key_up
  label: Key - UP
  kind: action
  command: "02h 0Fh 00h 00h 02h 07h 00h 1Ah"
  params: []

- id: key_down
  label: Key - DOWN
  kind: action
  command: "02h 0Fh 00h 00h 02h 08h 00h 1Bh"
  params: []

- id: key_right
  label: Key - RIGHT
  kind: action
  command: "02h 0Fh 00h 00h 02h 09h 00h 1Ch"
  params: []

- id: key_left
  label: Key - LEFT
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Ah 00h 1Dh"
  params: []

- id: key_enter
  label: Key - ENTER
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Bh 00h 1Eh"
  params: []

- id: key_exit
  label: Key - EXIT
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Ch 00h 1Fh"
  params: []

- id: key_help
  label: Key - HELP
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Dh 00h 20h"
  params: []

- id: key_magnify_up
  label: Key - MAGNIFY UP
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Fh 00h 22h"
  params: []

- id: key_magnify_down
  label: Key - MAGNIFY DOWN
  kind: action
  command: "02h 0Fh 00h 00h 02h 10h 00h 23h"
  params: []

- id: key_mute
  label: Key - MUTE
  kind: action
  command: "02h 0Fh 00h 00h 02h 13h 00h 26h"
  params: []

- id: key_picture
  label: Key - PICTURE
  kind: action
  command: "02h 0Fh 00h 00h 02h 29h 00h 3Ch"
  params: []

- id: key_computer1
  label: Key - COMPUTER1
  kind: action
  command: "02h 0Fh 00h 00h 02h 4Bh 00h 5Eh"
  params: []

- id: key_computer2
  label: Key - COMPUTER2
  kind: action
  command: "02h 0Fh 00h 00h 02h 4Ch 00h 5Fh"
  params: []

- id: key_video1
  label: Key - VIDEO1
  kind: action
  command: "02h 0Fh 00h 00h 02h 4Fh 00h 62h"
  params: []

- id: key_s_video1
  label: Key - S-VIDEO1
  kind: action
  command: "02h 0Fh 00h 00h 02h 51h 00h 64h"
  params: []

- id: key_volume_up
  label: Key - VOLUME UP
  kind: action
  command: "02h 0Fh 00h 00h 02h 84h 00h 97h"
  params: []

- id: key_volume_down
  label: Key - VOLUME DOWN
  kind: action
  command: "02h 0Fh 00h 00h 02h 85h 00h 98h"
  params: []

- id: key_freeze
  label: Key - FREEZE
  kind: action
  command: "02h 0Fh 00h 00h 02h 8Ah 00h 9Dh"
  params: []

- id: key_aspect
  label: Key - ASPECT
  kind: action
  command: "02h 0Fh 00h 00h 02h A3h 00h B6h"
  params: []

- id: key_source
  label: Key - SOURCE
  kind: action
  command: "02h 0Fh 00h 00h 02h D7h 00h EAh"
  params: []

- id: key_lamp_mode_eco
  label: Key - LAMP MODE / ECO
  kind: action
  command: "02h 0Fh 00h 00h 02h EEh 00h 01h"
  params: []

# --- 051 / 052 ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- 053 ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {drive} <CKS>"
  params:
    - name: target
      type: byte
      description: >-
        DATA01 lens target. Only "06h: Periphery Focus" survives in the source text;
        the remaining target codes are UNRESOLVED (table truncated in source).
    - name: drive
      type: enum
      description: DATA02 drive content
      values:
        - "00h: Stop"
        - "01h: Drive 1 second in the plus direction"
        - "02h: Drive 0.5 second in the plus direction"
        - "03h: Drive 0.25 second in the plus direction"
        - "7Fh: Drive continuously in the plus direction"
        - "81h: Drive continuously in the minus direction"
        - "FDh: Drive 0.25 second in the minus direction"
        - "FEh: Drive 0.5 second in the minus direction"
        - "FFh: Drive 1 second in the minus direction"
  notes: After sending 7Fh or 81h, stop the drive by sending 00h. Response DATA01 = FFh means error. The lens can be re-commanded without stopping by re-issuing the same command.

# --- 053-1 ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h <CKS>"
  params:
    - name: target
      type: byte
      description: DATA01 lens target - UNRESOLVED (target code table truncated in source).
  notes: Returns upper limit, lower limit and current value of the adjustment range, each as a 16-bit low/high byte pair (DATA02-DATA07).

# --- 053-2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} <CKS>"
  params:
    - name: target
      type: byte
      description: >-
        DATA01 lens target. Only "FFh: Stop" survives in the source text; remaining
        target codes are UNRESOLVED (table truncated in source).
    - name: mode
      type: enum
      description: DATA02 adjustment mode
      values:
        - "00h: absolute value"
        - "02h: relative value"
    - name: value_lo
      type: byte
      description: DATA03 adjustment value, low-order 8 bits
    - name: value_hi
      type: byte
      description: DATA04 adjustment value, high-order 8 bits
  notes: If DATA01 is FFh (Stop), the adjustment mode and adjustment value are not referenced.

# --- 053-3 ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} <CKS>"
  params:
    - name: operation
      type: enum
      description: DATA01
      values:
        - "00h: MOVE"
        - "01h: STORE"
        - "02h: RESET"
  notes: Response DATA02 = FFh means ended with an error. See REFERENCE LENS MEMORY CONTROL (053-4) for the reference lens memory.

# --- 053-4 ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} <CKS>"
  params:
    - name: operation
      type: enum
      description: DATA01
      values:
        - "00h: MOVE"
        - "01h: STORE"
        - "02h: RESET"
  notes: Operates on the profile number selected by LENS PROFILE SET (053-10).

# --- 053-5 ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} <CKS>"
  params:
    - name: option
      type: enum
      description: DATA01
      values:
        - "00h: LOAD BY SIGNAL"
        - "01h: FORCED MUTE"
  notes: Response DATA02 = 00h OFF / 01h ON.

# --- 053-6 ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} <CKS>"
  params:
    - name: option
      type: enum
      description: DATA01
      values:
        - "00h: LOAD BY SIGNAL"
        - "01h: FORCED MUTE"
    - name: value
      type: enum
      description: DATA02 setting value
      values:
        - "00h: OFF"
        - "01h: ON"

# --- 053-7 ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: >-
    Response DATA01 is a bitfield of "in operation" flags - Bit0 lens memory, Bit1 zoom,
    Bit2 focus, Bit3 lens shift (H), Bit4 lens shift (V); 0 = stop, 1 = during operation.

# --- 053-10 ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} <CKS>"
  params:
    - name: profile
      type: enum
      description: DATA01 profile number
      values:
        - "00h: Profile 1"
        - "01h: Profile 2"

# --- 053-11 ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {gain} 00h 00h <CKS>"
  params:
    - name: gain
      type: enum
      description: DATA01 adjusted value name
      values:
        - "00h: PICTURE / BRIGHTNESS"
        - "01h: PICTURE / CONTRAST"
        - "02h: PICTURE / COLOR"
        - "03h: PICTURE / HUE"
        - "04h: PICTURE / SHARPNESS"
        - "05h: VOLUME"
        - "96h: LAMP ADJUST / LIGHT ADJUST"
  example: "03h 05h 00h 00h 03h 00h 00h 00h 0Bh"   # get brightness
  notes: >-
    Returns status, upper limit, lower limit, default value, current value, wide
    adjustment width, narrow adjustment width and default-valid flag (DATA01-DATA14).

# --- 078-1 .. 078-6 ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function availability (DATA04), profile/clock/sleep-timer function (DATA05).

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling process, power on/off process and operation status.

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: >-
    Returns signal list number (one less than the practical number - add 1), selection
    signal type 1 and 2, signal list type, test pattern display and content displayed.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture mute, sound mute, onscreen mute, forced onscreen mute and onscreen display state.

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns a NUL-terminated model name in DATA01-DATA32.

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: Response DATA01 - 00h normal (cover opened), 01h cover closed.

# --- 079 ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} <CKS>"
  params:
    - name: state
      type: enum
      description: DATA01
      values:
        - "01h: Turn the freeze function on"
        - "02h: Turn the freeze function off"

# --- 084 ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {info_type} 01h <CKS>"
  params:
    - name: info_type
      type: enum
      description: DATA01 information type
      values:
        - "03h: Horizontal synchronous frequency"
        - "04h: Vertical synchronous frequency"
  notes: Returns an English label/information string, NUL-terminated, with a preceding length byte.

# --- 097-8 ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Depending on the projector, the "Light mode" or "Lamp mode" value is returned. Value table deferred to the Appendix - UNRESOLVED.

# --- 097-45 ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns a NUL-terminated projector name in DATA01-DATA17.

# --- 097-155 ---
- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns the six MAC address bytes in DATA01-DATA06.

# --- 097-198 ---
- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} <CKS>"
  params:
    - name: item
      type: enum
      description: DATA01
      values:
        - "00h: MODE"
        - "01h: START POSITION"
        - "02h: SUB INPUT / SUB INPUT 1"
        - "09h: SUB INPUT 2"
        - "0Ah: SUB INPUT 3"

# --- 097-243-1 ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: Response DATA01 - 00h OFF, 01h ON.

# --- 098-8 ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {eco_mode} <CKS>"
  params:
    - name: eco_mode
      type: byte
      description: DATA01 eco mode value. Value table deferred to Appendix "Supplementary Information by Command" - UNRESOLVED.
  notes: Depending on the projector, the "Light mode" or "Lamp mode" is set.

# --- 098-45 ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_bytes} 00h <CKS>"
  params:
    - name: name_bytes
      type: string
      description: DATA01-DATA16, projector name, up to 16 bytes, followed by a 00h terminator

# --- 098-198 ---
- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} <CKS>"
  params:
    - name: item
      type: enum
      description: DATA01
      values:
        - "00h: MODE"
        - "01h: START POSITION"
        - "02h: SUB INPUT / SUB INPUT 1"
        - "09h: SUB INPUT 2"
        - "0Ah: SUB INPUT 3"
    - name: value
      type: byte
      description: >-
        DATA02 setting value. When item is MODE - 00h PIP, 01h PICTURE BY PICTURE.
        When item is START POSITION - 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT,
        03h BOTTOM-RIGHT. Sub input values are deferred to the Appendix - UNRESOLVED.

# --- 098-243-1 ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} <CKS>"
  params:
    - name: value
      type: enum
      description: DATA01 setting value
      values:
        - "00h"
        - "01h"
  notes: >-
    The source's DATA01 table for this SET command lists the setting values only as
    "00h" and "01h" with no labels. The matching REQUEST command (097-243-1) labels
    00h as OFF and 01h as ON.

# --- 305-1 ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type (DATA01-02 and DATA12-13) and a NUL-terminated model name (DATA03-11).

# --- 305-2 ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Returns a NUL-terminated serial number in DATA01-DATA16.

# --- 305-3 ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: >-
    Returns operation status, content displayed, selection signal type 1 and 2, display
    signal type, video mute, sound mute, onscreen mute and freeze status.

# --- 319-10 ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} <CKS>"
  params:
    - name: input
      type: byte
      description: DATA01 input terminal code. Value table deferred to Appendix "Supplementary Information by Command" - UNRESOLVED.
    - name: value
      type: enum
      description: DATA02 setting value
      values:
        - "00h: the terminal specified in DATA01"
        - "01h: BNC"
        - "02h: COMPUTER"
  notes: Response DATA02 - 00h ended successfully, 01h ended with an error.
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: ["00h: standby", "01h: power on", "FFh: not supported"]
  source: 078-2 RUNNING STATUS REQUEST, DATA03

- id: cooling_process
  type: enum
  values: ["00h: not executed", "01h: during execution", "FFh: not supported"]
  source: 078-2 RUNNING STATUS REQUEST, DATA04

- id: power_on_off_process
  type: enum
  values: ["00h: not executed", "01h: during execution", "FFh: not supported"]
  source: 078-2 RUNNING STATUS REQUEST, DATA05

- id: operation_status
  type: enum
  values:
    - "00h: standby (sleep)"
    - "04h: power on"
    - "05h: cooling"
    - "06h: standby (error)"
    - "0Fh: standby (power saving)"
    - "10h: network standby"
    - "FFh: not supported"
  source: 078-2 RUNNING STATUS REQUEST DATA06; also 305-3 DATA01

- id: signal_switch_process
  type: enum
  values: ["00h: not executed", "01h: during execution", "FFh: not supported"]
  source: 078-2 RUNNING STATUS REQUEST

- id: signal_list_number
  type: integer
  range: "00h - C7h (FFh = not supported)"
  source: 078-3 INPUT STATUS REQUEST, DATA02
  notes: The returned value is one less than the practical number; add 1.

- id: selection_signal_type_1
  type: enum
  values: ["01h: 1", "02h: 2", "03h: 3", "04h: 4", "05h: 5"]
  source: 078-3 DATA03; also 305-3 DATA03

- id: selection_signal_type_2
  type: enum
  values:
    - "01h: COMPUTER"
    - "02h: VIDEO"
    - "03h: S-VIDEO"
    - "04h: COMPONENT"
    - "05h: reserved for the system"
    - "07h: VIEWER(1-5)"
    - "20h: DVI-D"
    - "21h: HDMI"
    - "22h: DisplayPort"
    - "23h: VIEWER(6-10)"
    - "FFh: not source input"
  source: 078-3 DATA04; also 305-3 DATA04

- id: signal_list_type
  type: enum
  values: ["00h: default", "01h: user", "FFh: not supported"]
  source: 078-3 INPUT STATUS REQUEST, DATA05

- id: test_pattern_display
  type: enum
  values: ["00h: not displayed", "01h: displayed", "FFh: not supported"]
  source: 078-3 INPUT STATUS REQUEST, DATA06

- id: content_displayed
  type: enum
  values:
    - "00h: video signal displayed"
    - "01h: no signal"
    - "02h: viewer displayed"
    - "03h: test pattern displayed"
    - "04h: LAN displayed"
    - "05h: test pattern (user) displayed"
    - "10h: signal being switched"
    - "FFh: not supported"
  source: 078-3 DATA09 and 305-3 DATA02
  notes: 078-3 lists 00h-04h and FFh; 305-3 additionally lists 05h and 10h.

- id: display_signal_type
  type: enum
  values:
    - "00h: NTSC3.58"
    - "01h: NTSC4.43"
    - "02h: PAL"
    - "03h: PAL60"
    - "04h: SECAM"
    - "05h: B/W60"
    - "06h: B/W50"
    - "07h: PALNM"
    - "08h: NTSC3.58 LBX"
    - "09h: NTSC3.58 SQZ"
    - "0Ah: COMPONENT(60Hz)"
    - "0Bh: COMPONENT(50Hz)"
    - "0Ch: unknown"
    - "0Dh: NTSC"
    - "0Eh: PAL-M"
    - "0Fh: PAL-L"
    - "FFh: not video input"
  source: 305-3 BASIC INFORMATION REQUEST, DATA05
  notes: Effective only when selection signal type 2 (DATA04) is 02h or 03h.

- id: picture_mute_state
  type: enum
  values: ["00h: off", "01h: on"]
  source: 078-4 MUTE STATUS REQUEST DATA01; also 305-3 DATA06 (video mute)

- id: sound_mute_state
  type: enum
  values: ["00h: off", "01h: on"]
  source: 078-4 MUTE STATUS REQUEST DATA02; also 305-3 DATA07

- id: onscreen_mute_state
  type: enum
  values: ["00h: off", "01h: on"]
  source: 078-4 MUTE STATUS REQUEST DATA03; also 305-3 DATA08

- id: forced_onscreen_mute_state
  type: enum
  values: ["00h: off", "01h: on"]
  source: 078-4 MUTE STATUS REQUEST, DATA04

- id: onscreen_display_state
  type: enum
  values: ["00h: not displayed", "01h: displayed"]
  source: 078-4 MUTE STATUS REQUEST, DATA05

- id: freeze_state
  type: enum
  values: ["00h: off", "01h: on"]
  source: 305-3 BASIC INFORMATION REQUEST, DATA09

- id: cover_status
  type: enum
  values: ["00h: normal (cover opened)", "01h: cover closed"]
  source: 078-6 COVER STATUS REQUEST, DATA01

- id: model_name
  type: string
  source: 078-5 MODEL NAME REQUEST (DATA01-32); also 305-1 (DATA03-11)

- id: serial_number
  type: string
  source: 305-2 SERIAL NUMBER REQUEST, DATA01-16

- id: base_model_type
  type: bytes
  source: 305-1 BASE MODEL TYPE REQUEST (DATA01-02, DATA12-13); also 078-1 DATA01-03
  notes: Value table deferred to Appendix "Supplementary Information by Command" - UNRESOLVED.

- id: sound_function_available
  type: enum
  values: ["00h: not available", "01h: available"]
  source: 078-1 SETTING REQUEST, DATA04

- id: clock_sleep_timer_function
  type: enum
  values:
    - "00h: not available"
    - "01h: clock function"
    - "02h: sleep timer function"
    - "03h: clock function and sleep timer function"
  source: 078-1 SETTING REQUEST, DATA05

- id: projector_name
  type: string
  source: 037 INFORMATION REQUEST (DATA01-49); 097-45 LAN PROJECTOR NAME REQUEST (DATA01-17)

- id: lamp_usage_time_seconds
  type: integer
  units: seconds
  source: 037 INFORMATION REQUEST (DATA83-86); 037-4 with DATA02 = 01h
  notes: Readable in one-second units but updated at one-minute intervals.

- id: lamp_remaining_life_percent
  type: integer
  units: percent
  source: 037-4 LAMP INFORMATION REQUEST 3 with DATA02 = 04h
  notes: A negative value is returned if the lamp replacement deadline is exceeded.

- id: filter_usage_time_seconds
  type: integer
  units: seconds
  source: 037 INFORMATION REQUEST (DATA87-90); 037-3 (DATA01-04)
  notes: 037-3 returns "-1" if no time is defined.

- id: filter_alarm_start_time_seconds
  type: integer
  units: seconds
  source: 037-3 FILTER USAGE INFORMATION REQUEST, DATA05-08

- id: carbon_savings_kg
  type: integer
  units: kilograms
  range: "0 - 99999"
  source: 037-6 CARBON SAVINGS INFORMATION REQUEST, DATA02-05

- id: carbon_savings_mg
  type: integer
  units: milligrams
  range: "0 - 999999"
  source: 037-6 CARBON SAVINGS INFORMATION REQUEST, DATA06-09

- id: mac_address
  type: bytes
  source: 097-155 LAN MAC ADDRESS STATUS REQUEST2, DATA01-06

- id: eco_mode_value
  type: byte
  source: 097-8 ECO MODE REQUEST, DATA01
  notes: Value table deferred to Appendix "Supplementary Information by Command" - UNRESOLVED.

- id: edge_blending_state
  type: enum
  values: ["00h: OFF", "01h: ON"]
  source: 097-243-1 EDGE BLENDING MODE REQUEST, DATA01

- id: pip_mode
  type: enum
  values: ["00h: PIP", "01h: PICTURE BY PICTURE"]
  source: 097-198 PIP/PICTURE BY PICTURE REQUEST with DATA01 = 00h

- id: pip_start_position
  type: enum
  values: ["00h: TOP-LEFT", "01h: TOP-RIGHT", "02h: BOTTOM-LEFT", "03h: BOTTOM-RIGHT"]
  source: 097-198 PIP/PICTURE BY PICTURE REQUEST with DATA01 = 01h

- id: pip_sub_input
  type: byte
  source: 097-198 PIP/PICTURE BY PICTURE REQUEST with DATA01 = 02h / 09h / 0Ah
  notes: Sub input value table deferred to Appendix "Supplementary Information by Command" - UNRESOLVED.

- id: lens_profile_number
  type: enum
  values: ["00h: Profile 1", "01h: Profile 2"]
  source: 053-11 LENS PROFILE REQUEST, DATA01

- id: lens_memory_option_value
  type: enum
  values: ["00h: OFF", "01h: ON"]
  source: 053-5 LENS MEMORY OPTION REQUEST, DATA02
  notes: Applies to the option selected by DATA01 - LOAD BY SIGNAL or FORCED MUTE.

- id: lens_position_range
  type: struct
  fields:
    - upper_limit: 16-bit, DATA02 low / DATA03 high
    - lower_limit: 16-bit, DATA04 low / DATA05 high
    - current_value: 16-bit, DATA06 low / DATA07 high
  source: 053-1 LENS CONTROL REQUEST

- id: lens_operation_flags
  type: bitfield
  bits:
    - "Bit0: lens memory (0 stop / 1 during operation)"
    - "Bit1: zoom (0 stop / 1 during operation)"
    - "Bit2: focus (0 stop / 1 during operation)"
    - "Bit3: lens shift H (0 stop / 1 during operation)"
    - "Bit4: lens shift V (0 stop / 1 during operation)"
    - "Bit5-7: reserved for the system"
  source: 053-7 LENS INFORMATION REQUEST, DATA01

- id: gain_parameter_block
  type: struct
  fields:
    - status: "DATA01 - 00h display not possible, 01h adjustment not possible, 02h adjustment possible, FFh gain does not exist"
    - upper_limit: "DATA02 low / DATA03 high"
    - lower_limit: "DATA04 low / DATA05 high"
    - default_value: "DATA06 low / DATA07 high"
    - current_value: "DATA08 low / DATA09 high"
    - wide_adjustment_width: "DATA10 low / DATA11 high"
    - narrow_adjustment_width: "DATA12 low / DATA13 high"
    - default_valid: "DATA14 - 00h invalid, 01h valid"
  source: 060-1 GAIN PARAMETER REQUEST 3

- id: information_string
  type: string
  source: 084 INFORMATION STRING REQUEST
  notes: Horizontal (03h) or vertical (04h) synchronous frequency, as an English display string.

- id: error_status
  type: bitfield
  notes: >-
    From 009 ERROR STATUS REQUEST, DATA01-DATA12. A bit set to 0 is normal, 1 is an error.
    DATA05-08 and DATA10-12 are reserved for the system.
  bits:
    - "DATA01 Bit0: cover error"
    - "DATA01 Bit1: temperature error (bi-metallic strip)"
    - "DATA01 Bit2: none (fixed to 0)"
    - "DATA01 Bit3: fan error"
    - "DATA01 Bit4: fan error"
    - "DATA01 Bit5: power error"
    - "DATA01 Bit6: lamp (or lamp 1) off or backlight off"
    - "DATA01 Bit7: lamp (or lamp 1) in a replacement moratorium"
    - "DATA02 Bit0: lamp (or lamp 1) usage time exceeded the limit"
    - "DATA02 Bit1: formatter error"
    - "DATA02 Bit2: lamp 2 off"
    - "DATA02 Bit3-6: none (fixed to 0)"
    - "DATA02 Bit7: refer to the extended status"
    - "DATA03 Bit0: none (fixed to 0)"
    - "DATA03 Bit1: FPGA error"
    - "DATA03 Bit2: temperature error (temperature sensor)"
    - "DATA03 Bit3: lamp (or lamp 1) not present"
    - "DATA03 Bit4: lamp (or lamp 1) data error"
    - "DATA03 Bit5: mirror cover error"
    - "DATA03 Bit6: lamp 2 in a replacement moratorium"
    - "DATA03 Bit7: lamp 2 usage time exceeded the limit"
    - "DATA04 Bit0: lamp 2 not present"
    - "DATA04 Bit1: lamp 2 data error"
    - "DATA04 Bit2: temperature error due to dust"
    - "DATA04 Bit3: foreign matter sensor error"
    - "DATA04 Bit4: none (fixed to 0)"
    - "DATA04 Bit5: ballast communication error"
    - "DATA04 Bit6: iris calibration error"
    - "DATA04 Bit7: the lens is not installed properly"
    - "DATA09 Bit0: the portrait cover side is up"
    - "DATA09 Bit1: the interlock switch is open"
    - "DATA09 Bit2: system error has occurred (slave CPU)"
    - "DATA09 Bit3: system error has occurred (formatter)"
    - "DATA09 Bit4-7: none (fixed to 0)"

- id: command_error_code
  type: enum
  notes: Returned as the <ERR1> <ERR2> pair in any failure response (source 2.4).
  values:
    - "00h 00h: the command cannot be recognized"
    - "00h 01h: the command is not supported by the model in use"
    - "01h 00h: the specified value is invalid"
    - "01h 01h: the specified input terminal is invalid"
    - "01h 02h: the specified language is invalid"
    - "02h 00h: memory allocation error"
    - "02h 02h: memory in use"
    - "02h 03h: the specified value cannot be set"
    - "02h 04h: forced onscreen mute on"
    - "02h 06h: viewer error"
    - "02h 07h: no signal"
    - "02h 08h: a test pattern or filter is displayed"
    - "02h 09h: no PC card is inserted"
    - "02h 0Ah: memory operation error"
    - "02h 0Ch: an entry list is displayed"
    - "02h 0Dh: the command cannot be accepted because the power is off"
    - "02h 0Eh: the command execution failed"
    - "02h 0Fh: there is no authority necessary for the operation"
    - "03h 00h: the specified gain number is incorrect"
    - "03h 01h: the specified gain is invalid"
    - "03h 02h: adjustment failed"
```

## Variables
```yaml
- id: brightness
  type: integer
  settable_via: picture_adjust (DATA01 = 00h)
  readable_via: gain_parameter_request_3 (DATA01 = 00h)
  range: null  # UNRESOLVED: range is device-reported via 060-1, not stated as a fixed range in source

- id: contrast
  type: integer
  settable_via: picture_adjust (DATA01 = 01h)
  readable_via: gain_parameter_request_3 (DATA01 = 01h)
  range: null  # UNRESOLVED: device-reported

- id: color
  type: integer
  settable_via: picture_adjust (DATA01 = 02h)
  readable_via: gain_parameter_request_3 (DATA01 = 02h)
  range: null  # UNRESOLVED: device-reported

- id: hue
  type: integer
  settable_via: picture_adjust (DATA01 = 03h)
  readable_via: gain_parameter_request_3 (DATA01 = 03h)
  range: null  # UNRESOLVED: device-reported

- id: sharpness
  type: integer
  settable_via: picture_adjust (DATA01 = 04h)
  readable_via: gain_parameter_request_3 (DATA01 = 04h)
  range: null  # UNRESOLVED: device-reported

- id: volume
  type: integer
  settable_via: volume_adjust
  readable_via: gain_parameter_request_3 (DATA01 = 05h)
  range: null  # UNRESOLVED: device-reported

- id: lamp_light_adjust
  type: integer
  settable_via: other_adjust (DATA01/DATA02 = 96h/FFh)
  readable_via: gain_parameter_request_3 (DATA01 = 96h)
  range: null  # UNRESOLVED: device-reported

- id: aspect
  type: byte
  settable_via: aspect_adjust
  # UNRESOLVED: value enumeration deferred to Appendix "Supplementary Information by Command"

- id: eco_mode
  type: byte
  settable_via: eco_mode_set
  readable_via: eco_mode_request
  # UNRESOLVED: value enumeration deferred to Appendix "Supplementary Information by Command"

- id: lan_projector_name
  type: string
  max_length: 16   # stated: "Projector name (up to 16 bytes)"
  settable_via: lan_projector_name_set
  readable_via: lan_projector_name_request

- id: pip_mode
  type: enum
  values: ["00h: PIP", "01h: PICTURE BY PICTURE"]
  settable_via: pip_picture_by_picture_set (DATA01 = 00h)
  readable_via: pip_picture_by_picture_request (DATA01 = 00h)

- id: pip_start_position
  type: enum
  values: ["00h: TOP-LEFT", "01h: TOP-RIGHT", "02h: BOTTOM-LEFT", "03h: BOTTOM-RIGHT"]
  settable_via: pip_picture_by_picture_set (DATA01 = 01h)
  readable_via: pip_picture_by_picture_request (DATA01 = 01h)

- id: pip_sub_input_1
  type: byte
  settable_via: pip_picture_by_picture_set (DATA01 = 02h)
  readable_via: pip_picture_by_picture_request (DATA01 = 02h)
  # UNRESOLVED: sub input value enumeration deferred to Appendix

- id: pip_sub_input_2
  type: byte
  settable_via: pip_picture_by_picture_set (DATA01 = 09h)
  readable_via: pip_picture_by_picture_request (DATA01 = 09h)
  # UNRESOLVED: sub input value enumeration deferred to Appendix

- id: pip_sub_input_3
  type: byte
  settable_via: pip_picture_by_picture_set (DATA01 = 0Ah)
  readable_via: pip_picture_by_picture_request (DATA01 = 0Ah)
  # UNRESOLVED: sub input value enumeration deferred to Appendix

- id: edge_blending_mode
  type: enum
  values: ["00h: OFF", "01h: ON"]
  settable_via: edge_blending_mode_set
  readable_via: edge_blending_mode_request

- id: lens_memory_load_by_signal
  type: enum
  values: ["00h: OFF", "01h: ON"]
  settable_via: lens_memory_option_set (DATA01 = 00h)
  readable_via: lens_memory_option_request (DATA01 = 00h)

- id: lens_memory_forced_mute
  type: enum
  values: ["00h: OFF", "01h: ON"]
  settable_via: lens_memory_option_set (DATA01 = 01h)
  readable_via: lens_memory_option_request (DATA01 = 01h)

- id: lens_profile
  type: enum
  values: ["00h: Profile 1", "01h: Profile 2"]
  settable_via: lens_profile_set
  readable_via: lens_profile_request

- id: audio_select
  type: enum
  values: ["00h: the terminal specified in DATA01", "01h: BNC", "02h: COMPUTER"]
  settable_via: audio_select_set
  # UNRESOLVED: no matching read command documented in this source

- id: control_id
  type: byte
  notes: >-
    <ID1> is "the value of the control ID set for the projector" and is echoed in every
    response. The source does not document a command to read or set it.
  # UNRESOLVED: control ID value and its set/get procedure not stated in source
```

## Events
```yaml
# UNRESOLVED: the source documents only request/response exchanges. No unsolicited
# notifications, broadcasts or asynchronous status pushes are described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences are described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_command_lockout
    description: >-
      "While this command is turning on the power, no other command can be accepted."
      (source 3.2, 015 POWER ON)
    applies_to: [power_on]
  - id: power_off_command_lockout
    description: >-
      "While this command is turning off the power (including the cooling time), no
      other command can be accepted." (source 3.3, 016 POWER OFF)
    applies_to: [power_off]
  - id: power_off_command_rejection
    description: >-
      Commands issued while the projector is powered off are rejected with error code
      02h 0Dh, "The command cannot be accepted because the power is off." (source 2.4)
  - id: interlock_switch_open
    description: >-
      The projector reports an open interlock switch via ERROR STATUS REQUEST (009),
      DATA09 Bit1. The source states the status bit only; it does not describe an
      interlock procedure or a required response.
# UNRESOLVED: no voltage, current, power, lamp-cooling duration or power-on sequencing
# timing values are stated in the source. No operator safety warnings are present in
# the supplied text.
```

## Notes
- Packet format (source 2.1/2.2): commands and responses are raw byte sequences. `<ID1>` is the projector's configured control ID and `<ID2>` is a model code; both appear in responses only. `<LEN>` is the byte length of the data part following it. `<CKS>` is the low-order byte of the sum of all preceding bytes — the source's worked example is `20h + 81h + 01h + 60h + 01h + 00h = 103h`, checksum `03h`.
- Response classes: a success response reuses the command's first byte with the high nibble set (e.g. `02h` → `22h`, `03h` → `23h`, `00h` → `20h`, `01h` → `21h`); a failure response uses `A0h`/`A1h`/`A2h`/`A3h` and carries `<ERR1> <ERR2>`.
- Serial wiring (PC CONTROL, D-SUB 9P): pin 2 RxD, pin 3 TxD, pin 5 GND, pin 7 RTS, pin 8 CTS; pins 1, 4, 6 and 9 unused. A cross (null-modem) cable is specified.
- Wired LAN is 10/100 Mbps auto-switching, IEEE802.3 (10BASE-T) / IEEE802.3u (100BASE-TX, Auto-Negotiation). Wireless LAN requires an optional wireless LAN unit and is documented elsewhere.
- The source warns that some models cannot receive commands in standby mode, deferring to the Appendix "Standby Mode setting for receiving commands" — not included in this source text.
- The 25 enumerated remote key actions carry checksums computed from the source's own stated checksum rule rather than copied literal byte strings; the source prints only the `AUTO` example (`02h 0Fh 00h 00h 02h 05h 00h 18h`), which the same computation reproduces exactly.
- Several parameter tables in the source are truncated in the refined extract — notably the lens target codes for 053 and 053-2, where only `06h: Periphery Focus` and `FFh: Stop` respectively survive. Those target enumerations are marked UNRESOLVED in the affected actions.
- `098-243-1 EDGE BLENDING MODE SET` prints its DATA01 value table with the labels replaced by the raw codes (`00h` → `00h`, `01h` → `01h`). The OFF/ON labelling is taken from the paired request command and is flagged in the action's notes rather than asserted in the value list.

<!-- UNRESOLVED: per-model command support, input terminal codes, aspect codes, eco mode codes, base model type codes and PIP sub input codes all depend on the two Appendices ("Connecting an External Device", "Supplementary Information by Command") that are referenced throughout but not present in the source document. -->
<!-- UNRESOLVED: default baud rate, flow control usage, control ID default value, model code (ID2) for NP-V332X, command inter-byte and inter-command timing, and cooling duration are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:19:07.672Z
last_checked_at: 2026-09-20T22:18:54.302Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-20T22:18:54.302Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec actions match source command bytes verbatim; transport port 7142 and serial settings confirmed; source's 54 commands fully represented. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is a multi-model command reference manual; it does not itself name NP-V332X. Per-model command availability is deferred to the Appendix \"Connecting an External Device\" and \"Supplementary Information by Command\", which are NOT included in this source text. Therefore: which of the commands below the NP-V332X actually supports is unresolved."
- "input terminal code values, aspect values, eco mode values, base model type values and sub input values are all deferred to the Appendix \"Supplementary Information by Command\", which is not present in the source. Those parameter enumerations are unresolved."
- "<ID1> (control ID) and <ID2> (model code) values for this model are not stated in the source."
- "default/factory baud rate not stated; only the set of selectable rates is given."
- "source lists selectable rates 115200/38400/19200/9600/4800 bps; no default stated"
- "RTS/CTS pins are wired (pins 7/8) but the source does not state flow control is used"
- "range is device-reported via 060-1, not stated as a fixed range in source"
- device-reported
- "value enumeration deferred to Appendix \"Supplementary Information by Command\""
- "sub input value enumeration deferred to Appendix"
- "no matching read command documented in this source"
- "control ID value and its set/get procedure not stated in source"
- "the source documents only request/response exchanges. No unsolicited"
- "no multi-step sequences are described in the source."
- "no voltage, current, power, lamp-cooling duration or power-on sequencing"
- "per-model command support, input terminal codes, aspect codes, eco mode codes, base model type codes and PIP sub input codes all depend on the two Appendices (\"Connecting an External Device\", \"Supplementary Information by Command\") that are referenced throughout but not present in the source document."
- "default baud rate, flow control usage, control ID default value, model code (ID2) for NP-V332X, command inter-byte and inter-command timing, and cooling duration are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
