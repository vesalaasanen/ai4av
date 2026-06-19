---
spec_id: admin/sharp-nec-pn-hc861
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-HC861 Control Spec"
manufacturer: Sharp/NEC
model_family: PN-HC861
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-HC861
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:32:27.656Z
last_checked_at: 2026-06-18T09:05:43.235Z
generated_at: 2026-06-18T09:05:43.235Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for PN-HC861 not stated; must be read from device. Control ID (ID1) value not stated; assumed set per projector config. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base model type values) not present in refined source — several parameter enums incomplete. Firmware version compatibility not stated."
  - "flow control not stated (source lists \"Full duplex\" communication mode only)"
  - "complete input terminal enum not in source body"
  - "aspect value enum not in source body"
  - "complete lens target enum not fully visible in source body"
  - "eco-mode value enum not in source body"
  - "sub-input value enum not in source body"
  - "input terminal enum not in source body"
  - "no macros described in source."
  - "no power-on sequencing procedure or formal interlock command list"
  - "model code (ID2) for PN-HC861 not in source. Control ID (ID1) config value not stated. Appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, and sub-input enums but absent from refined source. Firmware version compatibility not stated. Baud-rate default among the listed values not stated. Lens-target DATA01 enum (053/053-1/053-2) truncated in source body (only 06h=Periphery Focus visible). Flow control not specified."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:05:43.235Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-HC861 Control Spec

## Summary
Projector control spec for the Sharp/NEC PN-HC861, covering RS-232C serial and wired/wireless LAN (TCP) control. Commands are binary frames expressed in hexadecimal; each command frame ends with a checksum byte computed as the low-order byte of the sum of all preceding bytes. The device exposes power, input selection, mute, picture/volume/lens adjustment, lens memory, status queries, and PIP/edge-blending operations.

<!-- UNRESOLVED: model code (ID2) value for PN-HC861 not stated; must be read from device. Control ID (ID1) value not stated; assumed set per projector config. Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco-mode values, base model type values) not present in refined source — several parameter enums incomplete. Firmware version compatibility not stated. -->

## Transport
```yaml
# Both serial and LAN are explicitly documented in the source (§1.1, §1.2).
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source §1.2 "Port number": TCP 7142
serial:
  baud_rate: 9600  # one of 115200/38400/19200/9600/4800 bps stated; default not specified
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (source lists "Full duplex" communication mode only)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands (015, 016)
  - queryable    # inferred: extensive request commands (009, 037, 060-1, 078-*, 097-*, 305-*)
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST (030-1, 030-2, 030-15)
  - routable     # inferred: INPUT SW CHANGE (018), AUDIO SELECT SET (319-10)
```

## Actions
```yaml
# Frame conventions (source §2.1-§2.3):
#  - Commands are shown verbatim as in source, in hexadecimal, space-separated.
#  - The LAST byte of each frame is the checksum (CKS) = (sum of all preceding
#    bytes) mod 256. For parameterized commands, the listed trailing byte is the
#    checksum of the shown literal; recompute when substituting <DATA> values.
#  - <ID1> = Control ID, <ID2> = Model code - appear in responses, not in the
#    command frames listed here. Read ID1/ID2 from the device.
#  - Response success frame: "2xh <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>"
#    (2xh = 20h/21h/22h/23h depending on command class).
#    Error frame:  "Axh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>".
#  - kind: action  = sets/executes a discrete state
#    kind: query   = requests data; response carries the requested payload
#    kind: set     = sets a named parameter value

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# --- 018. INPUT SW CHANGE ---
- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
  params:
    - name: input
      type: string
      description: >
        Input terminal value (DATA01) as a hex byte. Source example:
        06h = Video port. Full enum lives in appendix "Supplementary
        Information by Command", which is not present in the refined source.
        # UNRESOLVED: complete input terminal enum not in source body
    - name: checksum
      type: string
      description: CKS = (02h+03h+00h+00h+02h+01h+{input}) mod 256, as hex byte

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

# --- 021. PICTURE MUTE OFF ---
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- 022. SOUND MUTE ON ---
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

# --- 023. SOUND MUTE OFF ---
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- 024. ONSCREEN MUTE ON ---
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

# --- 025. ONSCREEN MUTE OFF ---
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- 030-1. PICTURE ADJUST ---
- id: picture_adjust
  label: Picture Adjust
  kind: set
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: string
      description: >
        DATA01 adjustment target (hex byte):
        00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: mode
      type: string
      description: "DATA02 adjustment mode: 00h=absolute, 01h=relative"
    - name: value_lo
      type: string
      description: DATA03 adjustment value (low-order 8 bits, hex byte)
    - name: value_hi
      type: string
      description: DATA04 adjustment value (high-order 8 bits, hex byte)
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: set
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: string
      description: "DATA01 adjustment mode: 00h=absolute, 01h=relative"
    - name: value_lo
      type: string
      description: DATA02 adjustment value (low-order 8 bits, hex byte)
    - name: value_hi
      type: string
      description: DATA03 adjustment value (high-order 8 bits, hex byte)
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: set
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {checksum}"
  params:
    - name: aspect
      type: string
      description: >
        DATA01 aspect value (hex byte). Enum lives in appendix
        "Supplementary Information by Command", not present in refined source.
        # UNRESOLVED: aspect value enum not in source body
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 030-15. OTHER ADJUST (LAMP / LIGHT ADJUST) ---
- id: lamp_light_adjust
  label: Lamp/Light Adjust
  kind: set
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: string
      description: "DATA03 adjustment mode: 00h=absolute, 01h=relative"
    - name: value_lo
      type: string
      description: DATA04 adjustment value (low-order 8 bits, hex byte)
    - name: value_hi
      type: string
      description: DATA05 adjustment value (high-order 8 bits, hex byte)
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: string
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: string
      description: "DATA02: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: string
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
  params:
    - name: key_lo
      type: string
      description: >
        DATA01 (low byte of WORD key code). Source key code list (DATA01 / DATA02 / name):
        02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU,
        07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER,
        0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN,
        13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2,
        4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN,
        8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO
    - name: key_hi
      type: string
      description: "DATA02 (high byte of WORD key code). All listed codes use 00h."
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 051. SHUTTER CLOSE ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

# --- 052. SHUTTER OPEN ---
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- 053. LENS CONTROL ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {content} {checksum}"
  params:
    - name: target
      type: string
      description: >
        DATA01 lens target (hex byte). Source shows 06h=Periphery Focus; full
        target list (Zoom/Focus/Lens Shift H/V) is truncated in refined source.
        # UNRESOLVED: complete lens target enum not fully visible in source body
    - name: content
      type: string
      description: >
        DATA02 action (hex byte):
        00h=Stop, 01h=Drive +1.0s, 02h=Drive +0.5s, 03h=Drive +0.25s,
        7Fh=Drive plus (continuous, stop with 00h), 81h=Drive minus (continuous),
        FDh=Drive -0.25s, FEh=Drive -0.5s, FFh=Drive -1.0s
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: string
      description: DATA01 lens target (hex byte) - see lens_control.target note
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: set
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: string
      description: "DATA01 lens target (hex byte); FFh=Stop (mode/value ignored)"
    - name: mode
      type: string
      description: "DATA02 adjustment mode: 00h=absolute, 02h=relative"
    - name: value_lo
      type: string
      description: DATA03 adjustment value (low-order 8 bits, hex byte)
    - name: value_hi
      type: string
      description: DATA04 adjustment value (high-order 8 bits, hex byte)
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: string
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: string
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: string
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: set
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: string
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: string
      description: "DATA02: 00h=OFF, 01h=ON"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: set
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: string
      description: "DATA01: 00h=Profile 1, 01h=Profile 2"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: string
      description: >
        DATA01 adjusted-value name (hex byte):
        00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR,
        03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: string
      description: "DATA01: 01h=Freeze On, 02h=Freeze Off"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
  params:
    - name: type
      type: string
      description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST 2 ---
- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP / PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
  params:
    - name: item
      type: string
      description: >
        DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1,
        09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: set
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: string
      description: >
        DATA01 eco-mode value (hex byte). Enum lives in appendix
        "Supplementary Information by Command", not present in refined source.
        # UNRESOLVED: eco-mode value enum not in source body
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: set
  command: "03h B1h 00h 00h 12h 2Ch {name_01} {name_02} {name_03} {name_04} {name_05} {name_06} {name_07} {name_08} {name_09} {name_10} {name_11} {name_12} {name_13} {name_14} {name_15} {name_16} 00h {checksum}"
  params:
    - name: name_01
      type: string
      description: "Projector name byte 1 (up to 16 bytes total; NUL-terminated)"
    - name: name_02
      type: string
      description: Projector name byte 2
    - name: name_03
      type: string
      description: Projector name byte 3
    - name: name_04
      type: string
      description: Projector name byte 4
    - name: name_05
      type: string
      description: Projector name byte 5
    - name: name_06
      type: string
      description: Projector name byte 6
    - name: name_07
      type: string
      description: Projector name byte 7
    - name: name_08
      type: string
      description: Projector name byte 8
    - name: name_09
      type: string
      description: Projector name byte 9
    - name: name_10
      type: string
      description: Projector name byte 10
    - name: name_11
      type: string
      description: Projector name byte 11
    - name: name_12
      type: string
      description: Projector name byte 12
    - name: name_13
      type: string
      description: Projector name byte 13
    - name: name_14
      type: string
      description: Projector name byte 14
    - name: name_15
      type: string
      description: Projector name byte 15
    - name: name_16
      type: string
      description: Projector name byte 16
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 098-198. PIP / PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: set
  command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
  params:
    - name: item
      type: string
      description: >
        DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1,
        09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: value
      type: string
      description: >
        DATA02 setting value (hex byte). When item=MODE: 00h=PIP, 01h=PBP.
        When item=START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT,
        03h=BOTTOM-RIGHT. Sub-input values live in appendix, not present in source.
        # UNRESOLVED: sub-input value enum not in source body
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: set
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: string
      description: "DATA01: 00h=OFF, 01h=ON"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: set
  command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
  params:
    - name: input
      type: string
      description: >
        DATA01 input terminal (hex byte). Enum lives in appendix
        "Supplementary Information by Command", not present in refined source.
        # UNRESOLVED: input terminal enum not in source body
    - name: value
      type: string
      description: "DATA02 audio source: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    - name: checksum
      type: string
      description: CKS = (sum of all preceding bytes) mod 256, as hex byte
```

## Feedbacks
```yaml
# Each entry maps to a query response payload documented in the source (§3).
# Success response frame shape:
#   "2xh <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>"
# Error response frame shape:
#   "Axh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: error_status
  source_query: error_status_request
  type: bitmask
  description: >
    12 bytes (DATA01-DATA12) of error flags. Bit=0 normal, Bit=1 error.
    DATA01: cover/fan/temperature/power/lamp errors.
    DATA02: lamp usage/formatter/lamp2 errors.
    DATA03: FPGA/temperature-sensor/lamp-presence/mirror-cover/lamp2 errors.
    DATA04: lamp2/temperature-dust/foreign-matter/ballast/iris/lens-install errors.
    DATA09: extended status (portrait cover, interlock switch open, system errors).

- id: projector_information
  source_query: information_request
  type: composite
  description: >
    DATA01-49 projector name (NUL-terminated); DATA83-86 lamp usage time (seconds);
    DATA87-90 filter usage time (seconds). Updated at one-minute intervals.

- id: filter_usage
  source_query: filter_usage_information_request
  type: composite
  description: "DATA01-04 filter usage time (seconds); DATA05-08 filter alarm start time (seconds); -1 if undefined."

- id: lamp_information
  source_query: lamp_information_request
  type: composite
  description: >
    DATA01 lamp (00h=Lamp1/01h=Lamp2), DATA02 content (01h=seconds, 04h=remaining %),
    DATA03-06 obtained value. Negative remaining-life % if replacement deadline exceeded.

- id: carbon_savings
  source_query: carbon_savings_information_request
  type: composite
  description: "DATA02-05 Carbon Savings (kg, max 99999); DATA06-09 Carbon Savings (mg, max 999999)."

- id: lens_position
  source_query: lens_control_request
  type: composite
  description: "DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (16-bit signed)."

- id: lens_memory_option
  source_query: lens_memory_option_request
  type: composite
  description: "DATA01 option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE), DATA02 value (00h=OFF, 01h=ON)."

- id: lens_information
  source_query: lens_information_request
  type: bitmask
  description: "DATA01 per-target operation state: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift H, Bit4 Lens Shift V (0=Stop, 1=During operation)."

- id: lens_profile
  source_query: lens_profile_request
  type: enum
  description: "DATA01 profile number: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter
  source_query: gain_parameter_request_3
  type: composite
  description: >
    DATA01 status (00h display-N/A, 01h adjust-N/A, 02h adjustable, FFh no such gain);
    DATA02-09 upper/lower/default/current limits; DATA10-13 wide/narrow adjustment widths;
    DATA14 default-valid flag.

- id: setting_info
  source_query: setting_request
  type: composite
  description: "DATA01-03 base model type; DATA04 sound function (00h N/A, 01h available); DATA05 profile (00h none, 01h clock, 02h sleep, 03h clock+sleep)."

- id: running_status
  source_query: running_status_request
  type: composite
  description: >
    DATA03 power status (00h Standby, 01h Power on, FFh unsupported);
    DATA04 cooling process; DATA05 power on/off process;
    DATA06 operation status (00h Standby/Sleep, 04h Power on, 05h Cooling, 06h Standby/error, 0Fh Standby/Power saving, 10h Network standby).

- id: input_status
  source_query: input_status_request
  type: composite
  description: >
    DATA01 signal switch process; DATA02 signal list number (value = list-1);
    DATA03 selection signal type 1; DATA04 selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER1-5, 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER6-10);
    DATA05 signal list type; DATA06 test pattern display; DATA09 content displayed.

- id: mute_status
  source_query: mute_status_request
  type: composite
  description: >
    DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute,
    DATA05 onscreen display (00h Off, 01h On for each).

- id: model_name
  source_query: model_name_request
  type: string
  description: "DATA01-32 model name (NUL-terminated)."

- id: cover_status
  source_query: cover_status_request
  type: enum
  values: [normal_cover_open, cover_closed]
  description: "DATA01: 00h Normal (cover opened), 01h Cover closed."

- id: information_string
  source_query: information_string_request
  type: string
  description: "DATA03+ label/information string (NUL-terminated). Type 03h=H-sync freq, 04h=V-sync freq."

- id: eco_mode
  source_query: eco_mode_request
  type: raw
  description: >
    DATA01 eco-mode value (hex byte). Enum lives in appendix, not present in source.
    # UNRESOLVED: eco-mode value enum not in source body

- id: lan_projector_name
  source_query: lan_projector_name_request
  type: string
  description: "DATA01-17 projector name (NUL-terminated)."

- id: lan_mac_address
  source_query: lan_mac_address_request_2
  type: string
  description: "DATA01-06 MAC address (6 bytes)."

- id: pip_pbp_state
  source_query: pip_pbp_request
  type: composite
  description: >
    DATA01 item; DATA02 value. MODE: 00h PIP/01h PBP. START POSITION: 00h TL/01h TR/02h BL/03h BR.
    Sub-input value enums live in appendix, not present in source.
    # UNRESOLVED: sub-input value enum not in source body

- id: edge_blending_mode
  source_query: edge_blending_mode_request
  type: enum
  values: [off, on]
  description: "DATA01: 00h OFF, 01h ON."

- id: base_model_type
  source_query: base_model_type_request
  type: composite
  description: "DATA01-02 / DATA12-13 base model type; DATA03-11 model name (NUL-terminated)."

- id: serial_number
  source_query: serial_number_request
  type: string
  description: "DATA01-16 serial number (NUL-terminated)."

- id: basic_information
  source_query: basic_information_request
  type: composite
  description: >
    DATA01 operation status; DATA02 content displayed; DATA03 signal type 1; DATA04 signal type 2;
    DATA05 display signal type (video standards); DATA06 video mute; DATA07 sound mute;
    DATA08 onscreen mute; DATA09 freeze status.
```

## Variables
```yaml
# Settable continuous parameters surfaced via the 030-* family. Each maps to
# the corresponding action; ranges are read at runtime via gain_parameter_request_3.

- id: brightness
  set_via: picture_adjust
  unit: arbitrary
  resolution: 16-bit signed  # source DATA03 (lo) + DATA04 (hi)

- id: contrast
  set_via: picture_adjust
  unit: arbitrary
  resolution: 16-bit signed

- id: color
  set_via: picture_adjust
  unit: arbitrary
  resolution: 16-bit signed

- id: hue
  set_via: picture_adjust
  unit: arbitrary
  resolution: 16-bit signed

- id: sharpness
  set_via: picture_adjust
  unit: arbitrary
  resolution: 16-bit signed

- id: volume
  set_via: volume_adjust
  unit: arbitrary
  resolution: 16-bit signed

- id: lamp_light_level
  set_via: lamp_light_adjust
  unit: arbitrary
  resolution: 16-bit signed
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are solicited
# by commands (source §2.3). Section intentionally empty.
```

## Macros
```yaml
# Source documents no explicit multi-step sequences.
# UNRESOLVED: no macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "Source §3.2: while POWER ON is executing, no other command can be accepted."
  - command: power_off
    note: "Source §3.3: while POWER OFF is executing (including cooling time), no other command can be accepted."
  - condition: cover_closed
    note: "Source 078-6 cover_status_request + error status DATA01 Bit0 (cover error): cover state is a reported safety condition."
  - condition: interlock_switch_open
    note: "Source error status DATA09 Bit1: 'The interlock switch is open.' Reported as an error bit."
  - condition: temperature_error
    note: "Source error status DATA01 Bit1/Bit5 and DATA03 Bit2/DATA04 Bit2: multiple temperature-error bits reported."
# UNRESOLVED: no power-on sequencing procedure or formal interlock command list
# described in source; only error bits and command-acceptance notes above.
```

## Notes
- **Protocol class bytes:** command frames begin with a class byte that also sets the response header: `00h`→`20h`/`A0h` (078/084/305), `01h`→`21h`/`A1h` (079), `02h`→`22h`/`A2h` (015/016/018/020–025/050/051/052/053-*), `03h`→`23h`/`A3h` (030/037/060/097/098/319).
- **Checksum:** every frame ends in CKS = (sum of all preceding bytes) mod 256. Verified against source example (POWER OFF: 02h+01h+00h+00h+00h = 03h).
- **ID1/ID2:** responses include Control ID (ID1) and Model code (ID2); command frames in the source do not carry them. ID1 is configured per projector; ID2 is model-specific. Neither value for PN-HC861 is stated in source.
- **Error reporting:** failure responses carry `<ERR1> <ERR2>` per source §2.4 error-code table (28 combinations, e.g. `02h 0Dh` = "command cannot be accepted because the power is off", `02h 0Fh` = "no authority for the operation").
- **Time fields:** lamp/filter usage returned in seconds, updated at one-minute intervals.
- **Remote key codes (050):** enumerated as a single parameterized command; the source lists 25 key codes as DATA values of one opcode, not as distinct opcodes.

<!-- UNRESOLVED: model code (ID2) for PN-HC861 not in source. Control ID (ID1) config value not stated. Appendix "Supplementary Information by Command" referenced for input-terminal, aspect, eco-mode, and sub-input enums but absent from refined source. Firmware version compatibility not stated. Baud-rate default among the listed values not stated. Lens-target DATA01 enum (053/053-1/053-2) truncated in source body (only 06h=Periphery Focus visible). Flow control not specified. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:32:27.656Z
last_checked_at: 2026-06-18T09:05:43.235Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:05:43.235Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for PN-HC861 not stated; must be read from device. Control ID (ID1) value not stated; assumed set per projector config. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base model type values) not present in refined source — several parameter enums incomplete. Firmware version compatibility not stated."
- "flow control not stated (source lists \"Full duplex\" communication mode only)"
- "complete input terminal enum not in source body"
- "aspect value enum not in source body"
- "complete lens target enum not fully visible in source body"
- "eco-mode value enum not in source body"
- "sub-input value enum not in source body"
- "input terminal enum not in source body"
- "no macros described in source."
- "no power-on sequencing procedure or formal interlock command list"
- "model code (ID2) for PN-HC861 not in source. Control ID (ID1) config value not stated. Appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, and sub-input enums but absent from refined source. Firmware version compatibility not stated. Baud-rate default among the listed values not stated. Lens-target DATA01 enum (053/053-1/053-2) truncated in source body (only 06h=Periphery Focus visible). Flow control not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
