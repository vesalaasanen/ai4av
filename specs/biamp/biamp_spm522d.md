---
spec_id: admin/biamp-spm522d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Biamp SPM522D Control Spec"
manufacturer: Biamp
model_family: "Advantage SPM522D"
aliases: []
compatible_with:
  manufacturers:
    - Biamp
  models:
    - "Advantage SPM522D"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - downloads.biamp.com
source_urls:
  - https://downloads.biamp.com/assets/docs/default-source/manuals/spm522d_rs-232_control_manual.pdf
retrieved_at: 2026-05-04T15:18:53.366Z
last_checked_at: 2026-06-01T21:44:43.452Z
generated_at: 2026-06-01T21:44:43.452Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP, REST, UDP, OSC not mentioned in source — RS-232 only."
  - "source does not document unsolicited events."
  - "no multi-step macro sequences documented in source."
  - "no physical-safety, voltage, or interlock warnings in this protocol document."
  - "firmware compatibility ranges other than the two dates explicitly stated; physical connector type and pinout; max cable length; default device number assignment procedure (DIP/jumper config not described in this excerpt)."
verification:
  verdict: verified
  checked_at: 2026-06-01T21:44:43.452Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec actions match source wire tokens exactly (40 button codes, 1 repeat, 15 device-select prefixes, 21 advanced commands) with correct shapes and transport parameters. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Biamp SPM522D Control Spec

## Summary
Biamp Advantage SPM522D Stereo Preamp/Mixer. RS-232 serial control via Control Button Emulation (one-way) and Advanced Computer Control (two-way, query-capable). Commands use "pseudo-hex" notation (ASCII 0x30-0x3F representing nibbles 0x0-0xF). Each Advanced command requires Device Type Bitmask (0x04 for SPM522D) + Device Number Bitmask prefix.

<!-- UNRESOLVED: TCP/IP, REST, UDP, OSC not mentioned in source — RS-232 only. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 2400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "Neither hardware (DTR) nor XON/XOFF...handshaking is supported"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # inferred from do-source-select and per-button source-select commands
- queryable   # inferred from get-version, get-button-definition, get-source-settings, get-preset-definition, read-memory
- levelable   # inferred from set-volume, do-volume-action, do-tone-action, do-balance-action
```

## Actions
```yaml
# --- Control Button Emulation (40 buttons, send single ASCII char) ---
- id: btn_01_mic1_vol_down
  label: Button 1 - Mic 1 Volume Down
  kind: action
  command: "B"
  params: []
- id: btn_02_mic2_vol_down
  label: Button 2 - Mic 2 Volume Down
  kind: action
  command: "C"
  params: []
- id: btn_03_zone_vol_down
  label: Button 3 - Zone Volume Down
  kind: action
  command: "D"
  params: []
- id: btn_04_main_vol_down
  label: Button 4 - Main Volume Down
  kind: action
  command: "E"
  params: []
- id: btn_05_mic1_vol_up
  label: Button 5 - Mic 1 Volume Up
  kind: action
  command: "F"
  params: []
- id: btn_06_mic2_vol_up
  label: Button 6 - Mic 2 Volume Up
  kind: action
  command: "G"
  params: []
- id: btn_07_zone_vol_up
  label: Button 7 - Zone Volume Up
  kind: action
  command: "H"
  params: []
- id: btn_08_main_vol_up
  label: Button 8 - Main Volume Up
  kind: action
  command: "I"
  params: []
- id: btn_09_mic1_toggle_mute
  label: Button 9 - Mic 1 Toggle Mute
  kind: action
  command: "J"
  params: []
- id: btn_10_mic2_toggle_mute
  label: Button 10 - Mic 2 Toggle Mute
  kind: action
  command: "K"
  params: []
- id: btn_11_zone_toggle_mute
  label: Button 11 - Zone Toggle Mute
  kind: action
  command: "L"
  params: []
- id: btn_12_main_toggle_mute
  label: Button 12 - Main Toggle Mute
  kind: action
  command: "M"
  params: []
- id: btn_13_zone_recall_preset_e
  label: Button 13 - Zone Recall Preset E
  kind: action
  command: "N"
  params: []
- id: btn_14_zone_recall_preset_f
  label: Button 14 - Zone Recall Preset F
  kind: action
  command: "O"
  params: []
- id: btn_15_zone_recall_preset_g
  label: Button 15 - Zone Recall Preset G
  kind: action
  command: "P"
  params: []
- id: btn_16_zone_select_source_5
  label: Button 16 - Zone Select Source 5
  kind: action
  command: "Q"
  params: []
- id: btn_17_zone_select_source_1
  label: Button 17 - Zone Select Source 1
  kind: action
  command: "R"
  params: []
- id: btn_18_zone_select_source_2
  label: Button 18 - Zone Select Source 2
  kind: action
  command: "S"
  params: []
- id: btn_19_zone_select_source_3
  label: Button 19 - Zone Select Source 3
  kind: action
  command: "T"
  params: []
- id: btn_20_zone_select_source_4
  label: Button 20 - Zone Select Source 4
  kind: action
  command: "U"
  params: []
- id: btn_21_main_recall_preset_a
  label: Button 21 - Main Recall Preset A
  kind: action
  command: "V"
  params: []
- id: btn_22_main_recall_preset_b
  label: Button 22 - Main Recall Preset B
  kind: action
  command: "W"
  params: []
- id: btn_23_main_recall_preset_c
  label: Button 23 - Main Recall Preset C
  kind: action
  command: "X"
  params: []
- id: btn_24_main_select_source_5
  label: Button 24 - Main Select Source 5
  kind: action
  command: "Y"
  params: []
- id: btn_25_main_select_source_1
  label: Button 25 - Main Select Source 1
  kind: action
  command: "Z"
  params: []
- id: btn_26_main_select_source_2
  label: Button 26 - Main Select Source 2
  kind: action
  command: "["
  params: []
- id: btn_27_main_select_source_3
  label: Button 27 - Main Select Source 3
  kind: action
  command: "\\"
  params: []
- id: btn_28_main_select_source_4
  label: Button 28 - Main Select Source 4
  kind: action
  command: "]"
  params: []
- id: btn_29_nop
  label: Button 29 - NOP (factory default)
  kind: action
  command: "^"
  params: []
- id: btn_30_nop
  label: Button 30 - NOP (factory default)
  kind: action
  command: "_"
  params: []
- id: btn_31_nop
  label: Button 31 - NOP (factory default)
  kind: action
  command: "`"
  params: []
- id: btn_32_nop
  label: Button 32 - NOP (factory default)
  kind: action
  command: "b"
  params: []
- id: btn_33_nop
  label: Button 33 - NOP (factory default)
  kind: action
  command: "c"
  params: []
- id: btn_34_nop
  label: Button 34 - NOP (factory default)
  kind: action
  command: "d"
  params: []
- id: btn_35_nop
  label: Button 35 - NOP (factory default)
  kind: action
  command: "e"
  params: []
- id: btn_36_nop
  label: Button 36 - NOP (factory default)
  kind: action
  command: "f"
  params: []
- id: btn_37_nop
  label: Button 37 - NOP (factory default)
  kind: action
  command: "g"
  params: []
- id: btn_38_nop
  label: Button 38 - NOP (factory default)
  kind: action
  command: "h"
  params: []
- id: btn_39_nop
  label: Button 39 - NOP (factory default)
  kind: action
  command: "i"
  params: []
- id: btn_40_nop
  label: Button 40 - NOP (factory default)
  kind: action
  command: "j"
  params: []

# --- Button repeat code ---
- id: btn_repeat
  label: Button Repeat Code (held >110ms)
  kind: action
  command: "@"
  params: []

# --- Device Select Prefix codes (precede button code for targeted device emulation) ---
- id: prefix_select_dev_1
  label: Select Device 1 (prefix for button code)
  kind: action
  command: "l"
  params: []
- id: prefix_select_dev_2
  label: Select Device 2 (prefix for button code)
  kind: action
  command: "m"
  params: []
- id: prefix_select_dev_1_2
  label: Select Devices 1 & 2 (prefix)
  kind: action
  command: "n"
  params: []
- id: prefix_select_dev_3
  label: Select Device 3 (prefix)
  kind: action
  command: "o"
  params: []
- id: prefix_select_dev_1_3
  label: Select Devices 1 & 3 (prefix)
  kind: action
  command: "p"
  params: []
- id: prefix_select_dev_2_3
  label: Select Devices 2 & 3 (prefix)
  kind: action
  command: "q"
  params: []
- id: prefix_select_dev_1_2_3
  label: Select Devices 1, 2 & 3 (prefix)
  kind: action
  command: "r"
  params: []
- id: prefix_select_dev_4
  label: Select Device 4 (prefix)
  kind: action
  command: "s"
  params: []
- id: prefix_select_dev_1_4
  label: Select Devices 1 & 4 (prefix)
  kind: action
  command: "t"
  params: []
- id: prefix_select_dev_2_4
  label: Select Devices 2 & 4 (prefix)
  kind: action
  command: "u"
  params: []
- id: prefix_select_dev_1_2_4
  label: Select Devices 1, 2 & 4 (prefix)
  kind: action
  command: "v"
  params: []
- id: prefix_select_dev_3_4
  label: Select Devices 3 & 4 (prefix)
  kind: action
  command: "w"
  params: []
- id: prefix_select_dev_1_3_4
  label: Select Devices 1, 3 & 4 (prefix)
  kind: action
  command: "x"
  params: []
- id: prefix_select_dev_2_3_4
  label: Select Devices 2, 3 & 4 (prefix)
  kind: action
  command: "y"
  params: []
- id: prefix_select_dev_all_4
  label: Select Devices 1, 2, 3 & 4 (prefix)
  kind: action
  command: "z"
  params: []

# --- Advanced Computer Control commands ---
- id: virtual_button
  label: Virtual Button (immediate button-action execution)
  kind: action
  command: "{button_struct}04{dd}!"
  params:
    - name: button_struct
      type: string
      description: 16 pseudo-hex nibbles encoding Button Definition Data Structure
    - name: dd
      type: string
      description: Device Number Bitmask (2 pseudo-hex nibbles)

- id: define_button
  label: Define Button
  kind: action
  command: "{button_struct}{nn}04{dd}\""
  params:
    - name: button_struct
      type: string
      description: 16 pseudo-hex nibbles, Button Definition Data Structure
    - name: nn
      type: string
      description: Button Number + 128 (pseudo-hex)
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: get_button_definition
  label: Get Button Definition
  kind: query
  command: "{nn}04{dd}\""
  params:
    - name: nn
      type: string
      description: Button Number + 64 (pseudo-hex)
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: define_source_settings
  label: Define Source Settings (treble/bass/balance)
  kind: action
  command: "{source_struct}{nn}04{dd}#"
  params:
    - name: source_struct
      type: string
      description: 8 pseudo-hex nibbles, Stereo Source Data Structure
    - name: nn
      type: string
      description: Source number + 128 (pseudo-hex)
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: get_source_settings
  label: Get Source Settings
  kind: query
  command: "{nn}04{dd}#"
  params:
    - name: nn
      type: string
      description: Source number + 64 (pseudo-hex)
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: define_preset
  label: Define Preset
  kind: action
  command: "{preset_struct}{nn}04{dd}$"
  params:
    - name: preset_struct
      type: string
      description: 10 pseudo-hex nibbles, Preset Data Structure
    - name: nn
      type: string
      description: Preset number + 128 (pseudo-hex). 1-4=Main A-D, 7-10=Zone E-H, 5=Main current, 11=Zone current
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: get_preset_definition
  label: Get Preset Definition
  kind: query
  command: "{nn}04{dd}$"
  params:
    - name: nn
      type: string
      description: Preset number + 64 (pseudo-hex)
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: do_misc_ch5_override
  label: Do-Misc Channel 5 Override Allow/Disallow
  kind: action
  command: "{xx}{aa}04{dd}%"
  params:
    - name: xx
      type: string
      description: "01 = Ch5 Override allowed; 00 = not allowed (pseudo-hex)"
    - name: aa
      type: string
      description: "81 = Main; 82 = Zone (pseudo-hex action code)"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: do_misc_mic_priority
  label: Do-Misc Mic Priority
  kind: action
  command: "{xx}{aa}04{dd}%"
  params:
    - name: xx
      type: string
      description: "00 = None, 01 = Mic 1, 02 = Mic 2 (pseudo-hex)"
    - name: aa
      type: string
      description: "83 = Main; 84 = Zone (pseudo-hex action code)"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: do_misc_mic_enable
  label: Do-Misc Mic Enable/Disable
  kind: action
  command: "{xx}{aa}04{dd}%"
  params:
    - name: xx
      type: string
      description: "01 = Enable; 00 = Disable (pseudo-hex)"
    - name: aa
      type: string
      description: "85 = Mic 1 Main, 86 = Mic 2 Main, 87 = Mic 1 Zone, 88 = Mic 2 Zone"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: do_button
  label: Do-Button (execute stored button definition by number)
  kind: action
  command: "{nn}04{dd}&"
  params:
    - name: nn
      type: string
      description: Button Number 01-28 hex (decimal 1-40) (pseudo-hex)
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: do_preset_action
  label: Do-Preset-Action (recall/store/combine presets)
  kind: action
  command: "{an}04{dd}'"
  params:
    - name: an
      type: string
      description: "Action nibble a (1=Recall, 2=Store, 3=Combine+Recall, 5=Cancel Combine+Recall, 8=Toggle Combine+Recall) + preset nibble n (1-4=Main A-D, 7-:=Zone E-H, pseudo-hex)"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: do_volume_action
  label: Do-Volume-Action (up/down/mute/min/max/toggle)
  kind: action
  command: "{aa}{ff}04{dd}("
  params:
    - name: aa
      type: string
      description: "Action code: 01=Vol Down, 02=Vol Up, 03=Toggle Mute, 04=Mute, 05=Un-mute, 06=Min Vol, 07=Max Vol (pseudo-hex)"
    - name: ff
      type: string
      description: "Fader Selection Bitmask: 01=Mic1 Zone, 02=Mic2 Zone, 04=Mic1 Main, 08=Mic2 Main, 10=Main Out, 20=Zone Out (pseudo-hex, combinable)"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: set_volume
  label: Set Volume (absolute level)
  kind: action
  command: "{vv}09{ff}04{dd}("
  params:
    - name: vv
      type: string
      description: "Volume level pseudo-hex; bits 0-4 = level 0x00 (min) to 0x1F (max, step 31); bit 7 = mute flag"
    - name: ff
      type: string
      description: "Fader Selection Bitmask (pseudo-hex, see do_volume_action)"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)
  # Note: source states this command requires firmware version >= 23-Aug-95.

- id: do_balance_action
  label: Do-Balance-Action (shift L/R/center)
  kind: action
  command: "{aa}{rr}04{dd}("
  params:
    - name: aa
      type: string
      description: "Action: 0= shift Left, 0> shift Right, 0? reset center (pseudo-hex, leading nibble 0)"
    - name: rr
      type: string
      description: "Room Selection Bitmask: 40=Main, 80=Zone, <0=both (pseudo-hex)"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: do_tone_action
  label: Do-Tone-Action (treble + bass cut/boost/flat)
  kind: action
  command: "{t}{b}{rr}04{dd})"
  params:
    - name: t
      type: string
      description: "Treble action nibble: 0=NOP, 1=Cut, 2=Boost, 3=Flat (pseudo-hex)"
    - name: b
      type: string
      description: "Bass action nibble: 0=NOP, 1=Cut, 2=Boost, 3=Flat (pseudo-hex)"
    - name: rr
      type: string
      description: "Room Selection Bitmask: 40=Main, 80=Zone, <0=both (pseudo-hex)"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: do_source_select
  label: Do-Source-Select (channel 1-5, ch5 override)
  kind: action
  command: "{aa}{rr}04{dd}*"
  params:
    - name: aa
      type: string
      description: "01-05=channel 1-5, 07=toggle ch5 Override, 08=activate ch5 Override, 09=cancel ch5 Override (pseudo-hex)"
    - name: rr
      type: string
      description: "Room Selection Bitmask: 40=Main, 80=Zone, <0=both (pseudo-hex)"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: sleep_for_10_seconds
  label: Sleep for 10 Seconds (ignore all input)
  kind: action
  command: "04{dd}+"
  params:
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: read_memory
  label: Read Non-Volatile Configuration Memory
  kind: query
  command: "{bb}{ee}{ss}04{dd},"
  params:
    - name: bb
      type: string
      description: "Memory Bank: 00=bank 0, 01=bank 1 (pseudo-hex)"
    - name: ee
      type: string
      description: Ending memory address (pseudo-hex)
    - name: ss
      type: string
      description: Starting memory address (pseudo-hex). Must be <= ee
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: write_memory
  label: Write Non-Volatile Configuration Memory (up to 16 bytes, with checksum)
  kind: action
  command: "{data}{ss}{oo}{cc}04{dd}-"
  params:
    - name: data
      type: string
      description: Up to 16 data values (pseudo-hex), highest address first
    - name: ss
      type: string
      description: Starting (lowest) memory address (pseudo-hex)
    - name: oo
      type: string
      description: "Options + byte count (pseudo-hex). bits0-3=count-1; bit5=bank select; bit7=activate new global config immediately"
    - name: cc
      type: string
      description: "Checksum: 1's complement of 8-bit sum of all data values + ss + oo (computed on binary values pre-pseudo-hex conversion)"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)

- id: set_factory_defaults
  label: Set Factory Defaults
  kind: action
  command: "<>{oo}04{dd}."
  params:
    - name: oo
      type: string
      description: "Option byte (pseudo-hex). bit0=Button defaults, bit1=Preset defaults, bit2=Global Config defaults, bit3=Stereo Source Tone/Balance defaults, bit7=activate new Global Config now"
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)
  # Note: source warns firmware versions prior to 02-Jul-95 have a bug with bit 3.

- id: get_version
  label: Get Version (model ID + firmware date)
  kind: query
  command: "04{dd}/"
  params:
    - name: dd
      type: string
      description: Device Number Bitmask (pseudo-hex)
```

## Feedbacks
```yaml
- id: get_version_response
  description: Response to get-version query
  type: string
  format: "01 mm:dd:yy<CR>"
  notes: "01 is model identifier (ASCII '0' 0x30 followed by '1' 0x31) then space (0x20), then 2-digit decimal month, ':', day, ':', year, terminated with <CR> (0x0D). Optional LF (0x0A) appended if 'Opt. X' DIP-switch enabled."

- id: get_button_definition_response
  description: Response to get-button-definition query
  type: string
  format: "{bbbbbbbbbbbbbbbb}<CR>"
  notes: "16 pseudo-hex nibbles encoding Button Definition Data Structure, terminated with <CR>."

- id: get_source_settings_response
  description: Response to get-source-settings query
  type: string
  format: "{ssssssss}<CR>"
  notes: "8 pseudo-hex nibbles encoding Stereo Source Data Structure (treble, bass, balance for Main and Zone), terminated with <CR>."

- id: get_preset_definition_response
  description: Response to get-preset-definition query
  type: string
  format: "{pppppppppp}<CR>"
  notes: "10 pseudo-hex nibbles encoding Preset Data Structure, terminated with <CR>."

- id: read_memory_response
  description: Response to read-memory query
  type: string
  format: "{xx...}<CR>"
  notes: "Pseudo-hex data bytes, up to 256 values, transmitted in reverse order (ending address value first), terminated with <CR>."

- id: command_echo
  description: Echo of every received character
  type: string
  notes: "SPM522D echoes every received character back to the computer (used as the device's flow-control mechanism - wait for echo of each char before sending next, since input buffer is single-character)."
```

## Variables
```yaml
- id: main_output_volume
  description: Main output fader volume level
  type: integer
  min: 0
  max: 31
  notes: "5-bit value (pseudo-hex 00-1F). Step 0 = min, step 31 = max. Bit 7 set = muted (stored level restored on unmute). Settable via set_volume with fader bitmask 0x10."
- id: zone_output_volume
  description: Zone output fader volume level
  type: integer
  min: 0
  max: 31
  notes: "Same encoding as main_output_volume. Fader bitmask 0x20."
- id: mic1_main_volume
  description: Mic 1 in Main output volume
  type: integer
  min: 0
  max: 31
  notes: "Fader bitmask 0x04 in set_volume."
- id: mic2_main_volume
  description: Mic 2 in Main output volume
  type: integer
  min: 0
  max: 31
  notes: "Fader bitmask 0x08."
- id: mic1_zone_volume
  description: Mic 1 in Zone output volume
  type: integer
  min: 0
  max: 31
  notes: "Fader bitmask 0x01."
- id: mic2_zone_volume
  description: Mic 2 in Zone output volume
  type: integer
  min: 0
  max: 31
  notes: "Fader bitmask 0x02."
- id: main_treble
  description: Main treble level for currently selected source
  type: integer
  min: 0
  max: 12
  notes: "0x00 = -12dB cut, 0x06 = flat, 0x0C = +12dB boost. Stored per stereo source, not per preset."
- id: main_bass
  description: Main bass level for currently selected source
  type: integer
  min: 0
  max: 12
  notes: "0x00 = -12dB, 0x06 = flat, 0x0C = +12dB."
- id: zone_treble
  description: Zone treble level
  type: integer
  min: 0
  max: 12
- id: zone_bass
  description: Zone bass level
  type: integer
  min: 0
  max: 12
- id: main_balance
  description: Main balance (single-fader L/R encoding)
  type: integer
  min: 8
  max: 20
  notes: "0x08-0x14 (decimal 8-20, i.e. -24dB to 0dB). Bit 7 = left fader flag, bit 6 = right fader flag. Centered when both at 0x14."
- id: zone_balance
  description: Zone balance
  type: integer
  min: 8
  max: 20
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited events.
# Device only emits echoes and query responses; no async notifications described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - set_factory_defaults  # source includes the "<>" dummy prefix specifically "to help prevent an accidental restoration of the factory defaults due to an error in data transmission"
  - write_memory          # source: "It also provides the computer with a method for totally messing things up." Checksum required; mismatched checksum causes command to be ignored.
interlocks: []
# UNRESOLVED: no physical-safety, voltage, or interlock warnings in this protocol document.
```

## Notes
- All Advanced Computer Control commands require Device Type Bitmask byte = `04` (pseudo-hex) for SPM522D — bit 2 of the Device Type Bitmask. Other Advantage product types (DRC=0x01, EQ28X=0x02, PMX84=0x08) ignore commands not targeting their bit.
- Device Number Bitmask `dd` is two pseudo-hex nibbles; each of the 8 bits selects one of up to 8 SPM522D units on the bus. A unit only responds when its bit is set.
- "Pseudo-hex" format: each 4-bit nibble is encoded as ASCII `0x30 + nibble_value`, so nibbles 0xA-0xF appear as `:`, `;`, `<`, `=`, `>`, `?` (not standard `A`-`F`).
- Flow control: device has only a single-character input buffer. Each received char is echoed; the computer must wait for the echo before sending the next char. Hardware DTR and XON/XOFF are not supported.
- ASCII control chars (0x00-0x1F), SPACE (0x20), `A` (0x41), `a` (0x61), and `{`-`DEL` (0x7B-0x7F) are accepted but treated as no-op — they may be interspersed freely (even between two nibbles of a pseudo-hex parameter) without affecting command parsing. Bytes >= 0x80 are reserved.
- Responses are terminated with `<CR>` (0x0D). An internal "Opt. X" DIP switch (off by default) appends `<LF>` (0x0A) after each `<CR>`.
- Device select prefix codes (`l`-`z`, 0x6C-0x7A) for Control Button Emulation address up to 4 devices and were added in firmware >= 02-Jul-95; earlier units ignore them.
- `set_volume` requires firmware >= 23-Aug-95 per source.
- Connector pinout, cable wiring, and physical RS-232 port location are not documented in this excerpt.
<!-- UNRESOLVED: firmware compatibility ranges other than the two dates explicitly stated; physical connector type and pinout; max cable length; default device number assignment procedure (DIP/jumper config not described in this excerpt). -->

## Provenance

```yaml
source_domains:
  - downloads.biamp.com
source_urls:
  - https://downloads.biamp.com/assets/docs/default-source/manuals/spm522d_rs-232_control_manual.pdf
retrieved_at: 2026-05-04T15:18:53.366Z
last_checked_at: 2026-06-01T21:44:43.452Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T21:44:43.452Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec actions match source wire tokens exactly (40 button codes, 1 repeat, 15 device-select prefixes, 21 advanced commands) with correct shapes and transport parameters. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP, REST, UDP, OSC not mentioned in source — RS-232 only."
- "source does not document unsolicited events."
- "no multi-step macro sequences documented in source."
- "no physical-safety, voltage, or interlock warnings in this protocol document."
- "firmware compatibility ranges other than the two dates explicitly stated; physical connector type and pinout; max cable length; default device number assignment procedure (DIP/jumper config not described in this excerpt)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
