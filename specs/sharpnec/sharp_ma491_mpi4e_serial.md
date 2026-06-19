---
spec_id: admin/sharp-nec-ma491-mpi4e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma491 Mpi4E Control Spec"
manufacturer: Sharp/NEC
model_family: "Ma491 Mpi4E"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ma491 Mpi4E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:13:59.768Z
last_checked_at: 2026-06-18T08:27:08.945Z
generated_at: 2026-06-18T08:27:08.945Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact commercial model name string returned by MODEL NAME REQUEST not stated (this manual is a generic projector command reference, not a model-specific datasheet)."
  - "supported \"base model type\" enum values, input terminal enum values, aspect values, eco-mode values, and PIP sub-input values are delegated to an \"Appendix / Supplementary Information by Command\" that is not present in the refined source."
  - "source states \"Full duplex\" communication mode but does not name an explicit flow-control standard; marked none as no hardware flow control is described"
  - "actual min/max resolved at runtime via 060-1 GAIN PARAMETER REQUEST 3"
  - "runtime-resolved via 060-1"
  - "source does not describe any push/event mechanism."
  - "power-on/off implicitly block all other commands during the transition;"
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "concrete model-name string for Ma491 Mpi4E (not in this command-reference source)."
  - "all enum tables delegated to the missing \"Supplementary Information by Command\" appendix (input terminal, aspect, eco-mode, base-model-type, PIP sub-input values)."
  - "wireless-LAN transport details deferred to a separate wireless-LAN-unit manual not provided."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:27:08.945Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ma491 Mpi4E Control Spec

## Summary
Sharp/NEC projector (Ma491 Mpi4E) controlled via a binary hex command protocol carried over either an RS-232C serial line (PC CONTROL D-SUB 9P) or a wired/wireless LAN using TCP port 7142. This spec covers the full command catalogue documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect/lamp adjustment, lens control and memory, status/error information queries, remote-key emulation, eco/edge-blending/PIP settings, and identity requests. Commands are framed hex byte sequences terminated by a one-byte additive checksum (low byte of the sum of all preceding bytes).

<!-- UNRESOLVED: exact commercial model name string returned by MODEL NAME REQUEST not stated (this manual is a generic projector command reference, not a model-specific datasheet). -->
<!-- UNRESOLVED: supported "base model type" enum values, input terminal enum values, aspect values, eco-mode values, and PIP sub-input values are delegated to an "Appendix / Supplementary Information by Command" that is not present in the refined source. -->

## Transport
```yaml
# Two transports stated in source (section 1.1 / 1.2): RS-232C serial AND LAN (TCP).
# Same binary command set is carried over both transports.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable rates: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not name an explicit flow-control standard; marked none as no hardware flow control is described
addressing:
  port: 7142  # source: 'Use TCP port number "7142" for sending and receiving commands.'
auth:
  type: none  # inferred: no login/password/auth procedure described anywhere in source
```

## Traits
```yaml
traits:
  - powerable      # inferred from POWER ON / POWER OFF commands
  - queryable      # inferred from numerous *REQUEST commands returning state
  - levelable      # inferred from PICTURE/VOLUME/LAMP ADJUST commands
  - routable       # inferred from INPUT SW CHANGE command
  - mutable        # inferred from picture/sound/onscreen MUTE ON/OFF commands
```

## Actions
```yaml
# Frame format (section 2.1): each command/response is a hex byte sequence.
# Full frame: {type} {cmd} {ID1} {ID2} {LEN} {DATA...} {CKS}
#   - ID1 = control ID set on the projector (placeholder 00h in literal examples)
#   - ID2 = model code (varies by model; placeholder 00h in literal examples)
#   - LEN = byte length of DATA part following LEN
#   - CKS = checksum = low-order one byte of the sum of ALL preceding bytes
# Commands shown verbatim with ID1=00h ID2=00h placeholders; replace with real
# control ID / model code and recompute CKS before transmission. Parameterized
# commands show the variable DATA byte(s); CKS must be recomputed for each set.
#
# Example checksum (section 2.2): 20h+81h+01h+60h+01h+00h = 103h -> CKS=03h.

- id: error_status_request_009
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 bitmask of error/warning flags (cover, fan, temperature, lamp, mirror cover, interlock, etc.). Bit 0 = normal, bit 1 = error."

- id: power_on_015
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on, no other command accepted."

- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (including cooling time), no other command accepted."

- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input_terminal} {CKS}"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code (DATA01). Example in source: 06h = video port. Full enum is in the 'Supplementary Information by Command' appendix (not in this source)."
  notes: "Source worked example (DATA01=06h): '02h 03h 00h 00h 02h 01h 06h 0Eh'. Response DATA01=FFh means ended with an error (no switch made)."

- id: picture_mute_on_020
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video-signal switch."

- id: picture_mute_off_021
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Cleared by input/video-signal switch or volume adjustment."

- id: sound_mute_off_023
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Cleared by input/video-signal switch."

- id: onscreen_mute_off_025
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: target
      type: integer
      description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: mode
      type: integer
      description: "DATA02 adjustment mode: 00h=absolute, 01h=relative."
    - name: value_lo
      type: integer
      description: "DATA03 adjustment value (low-order 8 bits)."
    - name: value_hi
      type: integer
      description: "DATA04 adjustment value (high-order 8 bits)."
  notes: "Source examples: brightness=10 -> '03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h'; brightness=-10 -> '03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch'."

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: mode
      type: integer
      description: "DATA01 adjustment mode: 00h=absolute, 01h=relative."
    - name: value_lo
      type: integer
      description: "DATA02 adjustment value (low-order 8 bits)."
    - name: value_hi
      type: integer
      description: "DATA03 adjustment value (high-order 8 bits)."
  notes: "Source example (volume=10): '03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h'."

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {CKS}"
  params:
    - name: aspect
      type: integer
      description: "DATA01 aspect value. Enum is in the 'Supplementary Information by Command' appendix (not in this source)."

- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: target_lo
      type: integer
      description: "DATA01 target low byte."
    - name: target_hi
      type: integer
      description: "DATA02 target high byte. Only documented target is 96h/FFh = LAMP ADJUST / LIGHT ADJUST."
    - name: mode
      type: integer
      description: "DATA03 adjustment mode: 00h=absolute, 01h=relative."
    - name: value_lo
      type: integer
      description: "DATA04 adjustment value (low-order 8 bits)."
    - name: value_hi
      type: integer
      description: "DATA05 adjustment value (high-order 8 bits)."

- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

- id: filter_usage_information_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time seconds (DATA01-04) and filter alarm start time seconds (DATA05-08). -1 if undefined."

- id: lamp_information_request_3_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {CKS}"
  params:
    - name: lamp
      type: integer
      description: "DATA01 lamp select: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: content
      type: integer
      description: "DATA02 content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
  notes: "Reflects eco mode if enabled. Remaining life is negative if replacement deadline exceeded."

- id: carbon_savings_information_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {CKS}"
  params:
    - name: type
      type: integer
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {CKS}"
  params:
    - name: key_lo
      type: integer
      description: "DATA01 key-code low byte (WORD type)."
    - name: key_hi
      type: integer
      description: "DATA02 key-code high byte (always 00h in documented table)."
  notes: "Documented key codes: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO. Source example (AUTO): '02h 0Fh 00h 00h 02h 05h 00h 18h'."

- id: shutter_close_051
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {target} {content} {CKS}"
  params:
    - name: target
      type: integer
      description: "DATA01 lens target. Documented: 06h=Periphery Focus. (Source table is truncated; other targets referenced generically.)"
    - name: content
      type: integer
      description: "DATA02 drive content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus."
  notes: "After 7Fh/81h continuous drive, send 00h to stop. Same command can re-issue during drive without a stop."

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {CKS}"
  params:
    - name: target
      type: integer
      description: "DATA01 lens target to query."
  notes: "Returns upper limit (DATA02-03), lower limit (DATA04-05), current value (DATA06-07)."

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: target
      type: integer
      description: "DATA01 target. FFh=Stop (mode/value ignored)."
    - name: mode
      type: integer
      description: "DATA02 mode: 00h=absolute, 02h=relative."
    - name: value_lo
      type: integer
      description: "DATA03 adjustment value (low-order 8 bits)."
    - name: value_hi
      type: integer
      description: "DATA04 adjustment value (high-order 8 bits)."

- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {CKS}"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {CKS}"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Operates on the profile number set by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {option} {CKS}"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
  notes: "Returns setting DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {CKS}"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: value
      type: integer
      description: "DATA02: 00h=OFF, 01h=ON."

- id: lens_information_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmask of lens operation status: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V); 0=Stop, 1=During operation."

- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {CKS}"
  params:
    - name: profile
      type: integer
      description: "DATA01 profile number: 00h=Profile 1, 01h=Profile 2."

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01 profile number: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {CKS}"
  params:
    - name: name
      type: integer
      description: "DATA01 adjusted-value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
  notes: "Returns status, upper/lower/default/current limits, wide/narrow adjustment widths. Source example (brightness): '03h 05h 00h 00h 03h 00h 00h 00h 0Bh'."

- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04: 00h=not available, 01h=available), profile/clock/sleep-timer function (DATA05)."

- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling process, power on/off process, and operation status (standby/power-on/cooling/error/power-saving/network-standby)."

- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (returned value is practical number - 1), selection signal type, signal list type, test-pattern display, and content displayed."

- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=off / 01h=on)."

- id: model_name_request_078_5
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name NUL-terminated string (DATA01-32)."

- id: cover_status_request_078_6
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {state} {CKS}"
  params:
    - name: state
      type: integer
      description: "DATA01: 01h=freeze ON, 02h=freeze OFF."

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {info_type} 01h {CKS}"
  params:
    - name: info_type
      type: integer
      description: "DATA01 information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."
  notes: "Returns label string length (DATA02) and label/info strings NUL-terminated (DATA03-??)."

- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns DATA01 eco-mode value (Light mode or Lamp mode depending on model). Enum in appendix (not in source)."

- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name NUL-terminated string (DATA01-17)."

- id: lan_mac_address_status_request_2_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address (DATA01-06)."

- id: pip_picture_by_picture_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {CKS}"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  notes: "Returns DATA02 setting value (mode enum: 00h=PIP, 01h=PICTURE BY PICTURE; start position: 00h=TOP-LEFT ... 03h=BOTTOM-RIGHT; sub-input enums in appendix)."

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {CKS}"
  params:
    - name: value
      type: integer
      description: "DATA01 eco-mode value (Light mode or Lamp mode depending on model). Enum in appendix (not in source)."

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_bytes_01-16} 00h {CKS}"
  params:
    - name: name_bytes_01-16
      type: string
      description: "DATA01-DATA16 projector name, up to 16 bytes."
  notes: "Trailing 00h NUL terminator is part of the documented frame."

- id: pip_picture_by_picture_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} {CKS}"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: value
      type: integer
      description: "DATA02 setting value (same enums as 097-198 request). Sub-input value enums in appendix (not in source)."

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {CKS}"
  params:
    - name: value
      type: integer
      description: "DATA01: 00h=OFF, 01h=ON."

- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02), model name NUL string (DATA03-11), second base model type (DATA12-13). Enum in appendix (not in source)."

- id: serial_number_request_305_2
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number NUL-terminated string (DATA01-16)."

- id: basic_information_request_305_3
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input_terminal} {value} {CKS}"
  params:
    - name: input_terminal
      type: integer
      description: "DATA01 input terminal code. Enum in appendix (not in source)."
    - name: value
      type: integer
      description: "DATA02 setting value: 00h=the terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
# All queries above also act as observable-state reads. Key discrete-state enums
# captured here for quick reference; payload encodings are in the relevant Actions.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06"

- id: error_status
  type: bitmask
  values: [cover_error, temperature_error_bimetal, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, lamp2_off, fpga_error, temperature_sensor_error, lamp_not_present, lamp_data_error, mirror_cover_error, lamp2_replacement_due, lamp2_usage_exceeded, ballast_comm_error, iris_calibration_error, lens_not_installed, foreign_matter_sensor_error, portrait_cover_side_up, interlock_switch_open, system_error_slave_cpu, system_error_formatter]
  source: "009 ERROR STATUS REQUEST DATA01-DATA12"

- id: mute_state
  type: enum
  values: [picture_on, picture_off, sound_on, sound_off, onscreen_on, onscreen_off, forced_onscreen_on, forced_onscreen_off]
  source: "078-4 MUTE STATUS REQUEST DATA01-DATA04"

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST DATA01"
```

## Variables
```yaml
# Settable continuous parameters (each driven by a dedicated SET/ADJUST action
# and readable via the matching REQUEST). See Actions for byte-level payloads.

- id: brightness
  type: integer
  range: null  # UNRESOLVED: actual min/max resolved at runtime via 060-1 GAIN PARAMETER REQUEST 3
  action_set: picture_adjust_030_1 (target 00h)
  action_get: gain_parameter_request_3_060_1 (name 00h)

- id: contrast
  type: integer
  range: null  # UNRESOLVED: runtime-resolved via 060-1
  action_set: picture_adjust_030_1 (target 01h)
  action_get: gain_parameter_request_3_060_1 (name 01h)

- id: color
  type: integer
  range: null  # UNRESOLVED: runtime-resolved via 060-1
  action_set: picture_adjust_030_1 (target 02h)
  action_get: gain_parameter_request_3_060_1 (name 02h)

- id: hue
  type: integer
  range: null  # UNRESOLVED: runtime-resolved via 060-1
  action_set: picture_adjust_030_1 (target 03h)
  action_get: gain_parameter_request_3_060_1 (name 03h)

- id: sharpness
  type: integer
  range: null  # UNRESOLVED: runtime-resolved via 060-1
  action_set: picture_adjust_030_1 (target 04h)
  action_get: gain_parameter_request_3_060_1 (name 04h)

- id: volume
  type: integer
  range: null  # UNRESOLVED: runtime-resolved via 060-1
  action_set: volume_adjust_030_2
  action_get: gain_parameter_request_3_060_1 (name 05h)

- id: lamp_light_adjust
  type: integer
  range: null  # UNRESOLVED: runtime-resolved via 060-1
  action_set: other_adjust_030_15 (target 96h/FFh)
  action_get: gain_parameter_request_3_060_1 (name 96h)

- id: lamp_usage_time_seconds
  type: integer
  range: null
  action_get: lamp_information_request_3_037_4 (content 01h)

- id: lamp_remaining_life_percent
  type: integer
  range: null
  action_get: lamp_information_request_3_037_4 (content 04h)

- id: filter_usage_time_seconds
  type: integer
  range: null
  action_get: filter_usage_information_request_037_3
```

## Events
```yaml
# No unsolicited notifications documented. All reads are poll-style REQUEST commands.
# UNRESOLVED: source does not describe any push/event mechanism.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
# UNRESOLVED: power-on/off implicitly block all other commands during the transition;
# a safe poll-loop (issue 078-2 RUNNING STATUS REQUEST until operation status = power on)
# is implied but not authored as a macro by the vendor.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes (not safety procedures, but operational constraints):
#   - POWER ON/OFF accept no other command while the transition is in progress.
#   - 018 INPUT SW CHANGE clears picture/onscreen mute; clears sound mute on input/video switch.
#   - 009 ERROR STATUS exposes interlock-switch-open and cover errors as read bits.
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements are stated in the source text. Lamp/cover/temperature
# faults are only observable (via 009), not controllable from this command set.
```

## Notes
- **Document basis:** Projector Control Command Reference Manual, document no. BDT140013, Revision 7.1. This is a generic NEC/Sharp-NEC projector command reference; model-specific enum tables ("Supplementary Information by Command" appendix) are referenced throughout but are NOT present in the refined source. Enum-bearing parameters (input terminal, aspect, eco-mode, base-model-type, PIP sub-inputs) are therefore flagged UNRESOLVED for their concrete value lists.
- **ID1 / ID2 placeholders:** Literal command bytes in the source use `00h 00h` at the ID1/ID2 positions as placeholders. At runtime byte positions 3 and 4 must be replaced with the projector's control ID (ID1) and model code (ID2), and the trailing checksum (CKS) recomputed as the low byte of the sum of all preceding bytes.
- **Checksum worked example (section 2.2):** `20h 81h 01h 60h 01h 00h` sums to `103h` -> CKS = `03h`.
- **Response framing:** Successful command responses begin with a type byte in `{20h,21h,22h,23h}` (mirrors command class). Error responses begin with `{A0h,A1h,A2h,A3h}` and carry ERR1/ERR2 per the section 2.4 error-code table (e.g. `00h/00h`=unrecognized command, `02h/0Dh`=power off, `02h/0Fh`=no authority).
- **Time granularity:** Lamp/filter usage times are returned in one-second units but updated only at one-minute intervals.
- **Signal list number:** 078-3 returns practical number − 1; add 1 to get the real list number.
<!-- UNRESOLVED: concrete model-name string for Ma491 Mpi4E (not in this command-reference source). -->
<!-- UNRESOLVED: all enum tables delegated to the missing "Supplementary Information by Command" appendix (input terminal, aspect, eco-mode, base-model-type, PIP sub-input values). -->
<!-- UNRESOLVED: wireless-LAN transport details deferred to a separate wireless-LAN-unit manual not provided. -->
```

Spec built. 53 actions — full command catalogue coverage, no skips. Both transports (serial+TCP 7142) captured. Checksum rule + ID1/ID2 placeholder quirk noted. Enums delegated to missing appendix marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:13:59.768Z
last_checked_at: 2026-06-18T08:27:08.945Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:27:08.945Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact commercial model name string returned by MODEL NAME REQUEST not stated (this manual is a generic projector command reference, not a model-specific datasheet)."
- "supported \"base model type\" enum values, input terminal enum values, aspect values, eco-mode values, and PIP sub-input values are delegated to an \"Appendix / Supplementary Information by Command\" that is not present in the refined source."
- "source states \"Full duplex\" communication mode but does not name an explicit flow-control standard; marked none as no hardware flow control is described"
- "actual min/max resolved at runtime via 060-1 GAIN PARAMETER REQUEST 3"
- "runtime-resolved via 060-1"
- "source does not describe any push/event mechanism."
- "power-on/off implicitly block all other commands during the transition;"
- "no explicit safety warnings, interlock procedures, or power-on"
- "concrete model-name string for Ma491 Mpi4E (not in this command-reference source)."
- "all enum tables delegated to the missing \"Supplementary Information by Command\" appendix (input terminal, aspect, eco-mode, base-model-type, PIP sub-input values)."
- "wireless-LAN transport details deferred to a separate wireless-LAN-unit manual not provided."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
