---
spec_id: admin/sharp-nec-v754q-pc4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC V754Q Pc4 Control Spec"
manufacturer: Sharp/NEC
model_family: "V754Q Pc4"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "V754Q Pc4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:53:23.623Z
last_checked_at: 2026-06-18T09:14:19.598Z
generated_at: 2026-06-18T09:14:19.598Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic projector command reference (BDT140013 Rev 7.1) covering multiple models; V754Q-specific command support subset, firmware compatibility, voltage/power specs, and which \"Supplementary Information by Command\" appendix values apply are not present in the refined excerpt."
  - "full input code list not in refined excerpt"
  - "aspect enum not in refined excerpt"
  - "eco mode enum values not in refined excerpt"
  - "enum not in refined excerpt"
  - "terminal code list not in refined excerpt"
  - "source contains no explicit safety interlock procedures, voltage/current"
verification:
  verdict: verified
  checked_at: 2026-06-18T09:14:19.598Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC V754Q Pc4 Control Spec

## Summary
The Sharp/NEC V754Q Pc4 is a large-format professional projector controllable via an RS-232C serial port (PC CONTROL D-SUB 9P) or wired/wireless LAN. This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Revision 7.1): hex-byte frames with a trailing checksum byte, used over both serial and TCP (port 7142).

<!-- UNRESOLVED: source is a generic projector command reference (BDT140013 Rev 7.1) covering multiple models; V754Q-specific command support subset, firmware compatibility, voltage/power specs, and which "Supplementary Information by Command" appendix values apply are not present in the refined excerpt. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps (selectable); default not stated - UNRESOLVED
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: full duplex; hardware flow lines (RTS/CTS) wired per pin table, no XON/XOFF noted
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
# Notes: serial cable is cross (null-modem); PC CONTROL pinout: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
# LAN is RJ-45 (10/100 Mbps auto). TCP port 7142 used for send+receive.
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: many *REQUEST commands returning values
  - levelable      # inferred: PICTURE ADJUST / VOLUME ADJUST with absolute+relative values
  - routable       # inferred: INPUT SW CHANGE selects input terminal
```

## Actions
```yaml
# Framing: all commands are hex-byte frames terminated by a checksum (CKS) byte.
# CKS = low-order byte of sum of all preceding bytes (including fixed header).
# <ID1> = control ID; <ID2> = model code (both projector-set). For request/response
# frames the literal "<ID1> <ID2>" placeholders are emitted by the projector.
# Source uses command numbers (e.g. 015. POWER ON); each documented command = 1 action.

actions:
  # --- 009. ERROR STATUS REQUEST (query) ---
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    # Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS> - 12 bytes of error bitfields

  # --- 015. POWER ON ---
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: While turning on, no other command accepted.

  # --- 016. POWER OFF ---
  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: During power-off incl. cooling, no other command accepted.

  # --- 018. INPUT SW CHANGE ---
  - id: input_switch_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: Input terminal code (e.g. 06h = video). See "Supplementary Information by Command" appendix. # UNRESOLVED: full input code list not in refined excerpt
    notes: Example (select video, DATA01=06h) => "02h 03h 00h 00h 02h 01h 06h 0Eh".

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
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
    params:
      - name: target
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: value_low
        type: integer
        description: Adjustment value low-order 8 bits
      - name: value_high
        type: integer
        description: Adjustment value high-order 8 bits
    notes: Example set brightness=10 => "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h".

  # --- 030-2. VOLUME ADJUST ---
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
    params:
      - name: mode
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: value_low
        type: integer
        description: Adjustment value low-order 8 bits
      - name: value_high
        type: integer
        description: Adjustment value high-order 8 bits
    notes: Example set volume=10 => "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

  # --- 030-12. ASPECT ADJUST ---
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect_value
        type: integer
        description: Value set for the aspect. See "Supplementary Information by Command" appendix. # UNRESOLVED: aspect enum not in refined excerpt

  # --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
  - id: other_adjust_lamp_light
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01>-<DATA05> <CKS>"
    params:
      - name: target_low
        type: integer
        description: "DATA01=96h (LAMP ADJUST / LIGHT ADJUST)"
      - name: target_high
        type: integer
        description: "DATA02=FFh"
      - name: mode
        type: integer
        description: "DATA03 adjustment mode: 00h=absolute, 01h=relative"
      - name: value_low
        type: integer
        description: DATA04 adjustment value low-order 8 bits
      - name: value_high
        type: integer
        description: DATA05 adjustment value high-order 8 bits

  # --- 037. INFORMATION REQUEST ---
  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Response DATA01-49 projector name; DATA83-86 lamp usage seconds; DATA87-90 filter usage seconds.

  # --- 037-3. FILTER USAGE INFORMATION REQUEST ---
  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Response DATA01-04 filter usage seconds; DATA05-08 filter alarm start seconds (-1 if undefined).

  # --- 037-4. LAMP INFORMATION REQUEST 3 ---
  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: lamp
        type: integer
        description: "DATA01 lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: integer
        description: "DATA02 content: 01h=usage time (s), 04h=remaining life (%)"
    notes: Example get lamp 1 usage => "03h 96h 00h 00h 02h 00h 01h 9Ch". Negative remaining-life % if replacement deadline exceeded.

  # --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: content
        type: integer
        description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999).

  # --- 050. REMOTE KEY CODE ---
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code split across DATA01 (low) and DATA02 (high). Source-documented codes: POWER ON(02h,00h), POWER OFF(03h,00h), AUTO(05h,00h), MENU(06h,00h), UP(07h,00h), DOWN(08h,00h), RIGHT(09h,00h), LEFT(0Ah,00h), ENTER(0Bh,00h), EXIT(0Ch,00h), HELP(0Dh,00h), MAGNIFY UP(0Fh,00h), MAGNIFY DOWN(10h,00h), MUTE(13h,00h), PICTURE(29h,00h), COMPUTER1(4Bh,00h), COMPUTER2(4Ch,00h), VIDEO1(4Fh,00h), S-VIDEO1(51h,00h), VOLUME UP(84h,00h), VOLUME DOWN(85h,00h), FREEZE(8Ah,00h), ASPECT(A3h,00h), SOURCE(D7h,00h), LAMP MODE/ECO(EEh,00h)"
    notes: Example send AUTO => "02h 0Fh 00h 00h 02h 05h 00h 18h".

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01 target: 06h=Periphery Focus (other lens-axis codes not enumerated in refined excerpt - UNRESOLVED)"
      - name: action
        type: integer
        description: "DATA02 content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: Send 00h to stop after 7Fh/81h continuous drive.

  # --- 053-1. LENS CONTROL REQUEST ---
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: target
        type: integer
        description: Lens axis target (matches 053 LENS CONTROL targets).
    notes: Response returns upper/lower bounds + current value (DATA02-07).

  # --- 053-2. LENS CONTROL 2 ---
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01 target; FFh=Stop (mode/value ignored when Stop)"
      - name: mode
        type: integer
        description: "DATA02 adjustment mode: 00h=absolute, 02h=relative"
      - name: value_low
        type: integer
        description: DATA03 adjustment value low-order 8 bits
      - name: value_high
        type: integer
        description: DATA04 adjustment value high-order 8 bits

  # --- 053-3. LENS MEMORY CONTROL ---
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

  # --- 053-4. REFERENCE LENS MEMORY CONTROL ---
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Operates on profile selected via 053-10 LENS PROFILE SET.

  # --- 053-5. LENS MEMORY OPTION REQUEST ---
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  # --- 053-6. LENS MEMORY OPTION SET ---
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "DATA02: 00h=OFF, 01h=ON"

  # --- 053-7. LENS INFORMATION REQUEST ---
  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Response DATA01 bitfield - Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=Stop, 1=Operating).

  # --- 053-10. LENS PROFILE SET ---
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: profile
        type: integer
        description: "DATA01 profile: 00h=Profile 1, 01h=Profile 2"

  # --- 053-11. LENS PROFILE REQUEST ---
  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: Response DATA01 profile (00h=Profile 1, 01h=Profile 2).

  # --- 060-1. GAIN PARAMETER REQUEST 3 ---
  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: Example get brightness => "03h 05h 00h 00h 03h 00h 00h 00h 0Bh".

  # --- 078-1. SETTING REQUEST ---
  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Response DATA01-03 base model type; DATA04 sound function (00h=No, 01h=Yes); DATA05 profile/timer function.

  # --- 078-2. RUNNING STATUS REQUEST ---
  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Response DATA03 power (00h=Standby, 01h=Power on); DATA04 cooling; DATA05 power process; DATA06 operation status.

  # --- 078-3. INPUT STATUS REQUEST ---
  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Response DATA01 signal switch; DATA02 signal list number; DATA03/04 selection signal type 1/2; DATA05 list type; DATA06 test pattern; DATA09 content displayed.

  # --- 078-4. MUTE STATUS REQUEST ---
  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (all 00h=Off, 01h=On).

  # --- 078-5. MODEL NAME REQUEST ---
  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: Response DATA01-32 model name (NUL-terminated).

  # --- 078-6. COVER STATUS REQUEST ---
  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: Response DATA01 status: 00h=Normal (cover opened), 01h=Cover closed.

  # --- 079. FREEZE CONTROL ---
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "DATA01: 01h=freeze on, 02h=freeze off"

  # --- 084. INFORMATION STRING REQUEST ---
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: info_type
        type: integer
        description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  # --- 097-8. ECO MODE REQUEST ---
  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: Returns Light mode or Lamp mode value depending on projector. # UNRESOLVED: eco mode enum values not in refined excerpt

  # --- 097-45. LAN PROJECTOR NAME REQUEST ---
  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: Response DATA01-17 projector name (NUL-terminated).

  # --- 097-155. LAN MAC ADDRESS STATUS REQUEST 2 ---
  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: Response DATA01-06 MAC address bytes.

  # --- 097-198. PIP / PICTURE BY PICTURE REQUEST ---
  - id: pip_pbp_request
    label: PIP/Picture-by-Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  # --- 097-243-1. EDGE BLENDING MODE REQUEST ---
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: Response DATA01: 00h=OFF, 01h=ON.

  # --- 098-8. ECO MODE SET ---
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "DATA01 eco mode value. See 'Supplementary Information by Command' appendix." # UNRESOLVED: enum not in refined excerpt

  # --- 098-45. LAN PROJECTOR NAME SET ---
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: Projector name, up to 16 bytes (NUL-padded).

  # --- 098-198. PIP / PICTURE BY PICTURE SET ---
  - id: pip_pbp_set
    label: PIP/Picture-by-Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "DATA02 setting (MODE: 00h=PIP,01h=PBP; POSITION: 00h-03h TL/TR/BL/BR; SUB INPUT: terminal code)"

  # --- 098-243-1. EDGE BLENDING MODE SET ---
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "DATA01: 00h=OFF, 01h=ON"

  # --- 305-1. BASE MODEL TYPE REQUEST ---
  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: Response DATA01-02 base model type; DATA03-11 model name (NUL-terminated); DATA12-13 base model type.

  # --- 305-2. SERIAL NUMBER REQUEST ---
  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: Response DATA01-16 serial number (NUL-terminated).

  # --- 305-3. BASIC INFORMATION REQUEST ---
  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: Response DATA01 operation status; DATA02 content displayed; DATA03/04 selection signal type 1/2; DATA05 display signal type; DATA06 video mute; DATA07 sound mute; DATA08 onscreen mute; DATA09 freeze status.

  # --- 319-10. AUDIO SELECT SET ---
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: DATA01 input terminal code. See "Supplementary Information by Command" appendix. # UNRESOLVED: terminal code list not in refined excerpt
      - name: value
        type: integer
        description: "DATA02 setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: 078-2 RUNNING STATUS REQUEST DATA03/DATA06 + 305-3 BASIC INFORMATION REQUEST DATA01

  - id: error_status
    type: bitfield
    description: 12-byte error bitfield from 009 ERROR STATUS REQUEST. DATA01-04 + DATA09 documented in source (cover, fan, temp, power, lamp, formatter, FPGA, mirror cover, foreign matter, ballast, iris, interlock switch, system errors).

  - id: execution_result
    type: enum
    values: [success, error]
    description: Most set/adjust commands return DATA01+DATA02 = 0000h success / other = error.

  - id: response_error
    type: composite
    description: Failed commands return A<h> frame with <ERR1> <ERR2>. See source §2.4 error code table (00h-03h ranges).
```

## Variables
```yaml
# All settable parameters are exposed as Actions (030-1 PICTURE ADJUST targets,
# 030-2 VOLUME, 030-12 ASPECT, 030-15 LAMP/LIGHT, lens control values, eco mode,
# projector name, etc.). No additional discrete variables beyond the action set.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are replies to commands.
```

## Macros
```yaml
# Source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off    # source: during power-off incl. cooling, no other command accepted
interlocks:
  - power_on_blocks_other_commands_while_in_progress
  - power_off_blocks_other_commands_during_cooling
# UNRESOLVED: source contains no explicit safety interlock procedures, voltage/current
# specs, or power-on sequencing beyond the "no other command accepted" notes above.
```

## Notes
- **Protocol type:** binary hex-byte frames, NOT ASCII. Every frame ends in a checksum byte (CKS) = low-order byte of the sum of all preceding bytes. Worked example from source: `20h 81h 01h 60h 01h 00h <CKS>` → `20+81+01+60+01+00 = 103h` → CKS = `03h`.
- **Frame roles:** command frames start with header bytes; success responses start with `2xh` (where x matches command header); error responses start with `Axh` carrying `<ERR1> <ERR2>`. Set commands with `03h` header respond with `23h`; `02h` header responds with `22h`; `00h`/`01h`/`03h` etc. follow the same pattern (response header = command header + `20h`).
- **Placeholder fields** `<ID1>` (control ID), `<ID2>` (model code), `<CKS>` (checksum), `<LEN>` (data length), `<DATA??>` (variable bytes) are documented in source §2.2.
- **Cooling lockout:** POWER OFF blocks all other commands during the cooling interval; POWER ON blocks other commands during power-on. Do not pipeline.
- **Filter usage / lamp usage counters:** updated in one-second units but only refreshed to the bus at one-minute intervals.
- **Two-lamp models:** LAMP INFORMATION REQUEST 3 with `DATA01=01h` (Lamp 2) is only valid on two-lamp projector models.

<!-- UNRESOLVED: -->
<!-- - "Supplementary Information by Command" appendix (input terminal codes, aspect values, eco-mode enum, base model type values, sub-input setting values) is referenced repeatedly but NOT present in the refined excerpt. Several param enums above are therefore incomplete. -->
<!-- - Default baud rate not stated (source lists 5 selectable rates). -->
<!-- - Firmware version compatibility range not stated. -->
<!-- - Whether the V754Q Pc4 is a one-lamp or two-lamp model not stated in the refined excerpt. -->
<!-- - Wireless LAN transport (mentioned in §1.1) carries no protocol details — only wired TCP port 7142 is documented. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:53:23.623Z
last_checked_at: 2026-06-18T09:14:19.598Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:14:19.598Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic projector command reference (BDT140013 Rev 7.1) covering multiple models; V754Q-specific command support subset, firmware compatibility, voltage/power specs, and which \"Supplementary Information by Command\" appendix values apply are not present in the refined excerpt."
- "full input code list not in refined excerpt"
- "aspect enum not in refined excerpt"
- "eco mode enum values not in refined excerpt"
- "enum not in refined excerpt"
- "terminal code list not in refined excerpt"
- "source contains no explicit safety interlock procedures, voltage/current"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
