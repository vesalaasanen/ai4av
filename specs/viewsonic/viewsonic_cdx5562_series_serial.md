---
spec_id: admin/viewsonic-cdx5562-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Viewsonic CDX5562 Series Control Spec"
manufacturer: Viewsonic
model_family: CDX5562
aliases: []
compatible_with:
  manufacturers:
    - Viewsonic
  models:
    - CDX5562
    - CDX5562-1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
  - manualslib.com
  - viewsonic.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - "https://www.manualslib.com/manual/3900742/Viewsonic-Cdx5562.html#manual"
  - https://www.viewsonic.com/us/cdx5562.html
retrieved_at: 2026-04-29T10:24:07.729Z
last_checked_at: 2026-05-14T18:17:21.380Z
generated_at: 2026-05-14T18:17:21.380Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; model-family coverage (e.g. CDX5562 vs CDX5562-1 sub-variants) not enumerated beyond product label."
  - "flow control not stated in source"
  - "source does not document composite macros; only single-command"
  - "source contains no electrical-safety, fire, or shock warnings;"
  - "firmware version compatibility not stated in source; per-model availability of get_thermal / get_power_on_off_log / get_date / get_time is flagged in source as \"For specific models only\" but the model list is not enumerated; flow control (RTS/CTS, XON/XOFF) is not stated; maximum packet rate / inter-frame timing is not stated."
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.380Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 61 verifiable spec commands matched literally in source tables; transport parameters verified verbatim; complete coverage of source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Viewsonic CDX5562 Series Control Spec

## Summary
RS-232C control protocol for the Viewsonic CDX5562-series commercial display / digital signage. Specifies 9-byte framed Set/Get command packets, fixed 9600 8N1 serial, DSUB 9-pin (or 2.5 mm barrel) connection, and an IR pass-through mode that forwards RCU key codes to the host.

<!-- UNRESOLVED: firmware version compatibility not stated; model-family coverage (e.g. CDX5562 vs CDX5562-1 sub-variants) not enumerated beyond product label. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600       # source: "9600bps (fixed)"
  data_bits: 8          # source: "8 bits (fixed)"
  parity: none          # source: "Parity: None (fixed)"
  stop_bits: 1          # source: "Stop Bits: 1 (fixed)"
  flow_control: none    # UNRESOLVED: flow control not stated in source
  connector: DSUB-9 male  # source: "DSUB 9-Pin Male"; 2.5 mm barrel documented as special case
  cable: null-modem (crossover)  # source: "Use of crossover (null modem) cable required"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: power on/off commands present
- routable     # inferred: input-select commands present
- queryable    # inferred: Get-Function queries present
- levelable    # inferred: volume/brightness/contrast/treble/bass control present
```

## Actions

All Set/Get commands share the same 9-byte frame:

```
Length  ID     Type  Command  Value1 Value2 Value3  CR
0x38    0x3n m 0x67/0x73  0xnn  0x3n 0x3n  0x3n  0x0D
```

Where `Length` is the ASCII byte `0x38` (the digit `"8"`); `ID` is two ASCII digits `"01"`–`"98"` (broadcast `"99"` receives no reply); `Type` is `"s"` (0x73) for Set or `"g"` (0x67) for Get; `Command` is one ASCII byte; `Value[1..3]` is three ASCII bytes (Set) or `"000"` (Get); `CR` is `0x0D`. Set reply is 5 bytes: `0x34 ID "+"|"-" 0x0D`. Get reply is 9 bytes: `0x38 ID "r"|"-" Command V1 V2 V3 0x0D`. Acknowledgement is `"+"` (0x2B), rejection is `"-"` (0x2D).

Example (Set Brightness = 76 on display ID 02): bytes `38 30 32 73 24 30 37 36 0D`.

```yaml
# --- Set-Function commands (command type "s") ---

- id: set_power
  label: Power On/Off (Standby)
  kind: action
  command: "8{id}s!{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID ("01"-"98"; "99" = broadcast, no reply)
    - name: value
      type: string
      description: Three ASCII bytes - "000" = STBY, "001" = ON
  notes: Command code ASCII "!" (0x21). Source: "Power on/off (standby)".

- id: set_input_select
  label: Input Select
  kind: action
  command: "8{id}s\"{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: |
        Three ASCII bytes - 000:TV, 001:AV, 002:S-Video, 003:YPbPr,
        004:HDMI1, 014:HDMI2, 024:HDMI3, 034:HDMI4, 005:DVI,
        006:VGA1, 016:VGA2, 026:VGA3, 007:Slot-in PC (OPS/SDM)/HDBT,
        008:Internal memory, 009:DP, 00A:Embedded/Main (Android).
        Source notes the 2nd digit of duplicate source codes flags an extension.
  notes: Command code ASCII '"' (0x22).

- id: set_brightness
  label: Brightness
  kind: action
  command: "8{id}s${value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "000"-"100"
  notes: Command code ASCII "$" (0x24).

- id: set_power_lock
  label: Power Lock
  kind: action
  command: "8{id}s4{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000" = Unlock, "001" = Lock
  notes: Command code ASCII "4" (0x34). Source: "*See note in details".

- id: set_volume
  label: Volume
  kind: action
  command: "8{id}s5{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: |
        Three ASCII bytes - "000"-"100" for absolute level,
        "900" = Volume down (-1), "901" = Volume up (+1)
  notes: Command code ASCII "5" (0x35).

- id: set_mute
  label: Mute
  kind: action
  command: "8{id}s6{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000" = OFF, "001" = ON (mute)
  notes: Command code ASCII "6" (0x36).

- id: set_button_lock
  label: Button Lock
  kind: action
  command: "8{id}s8{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000" = Unlock, "001" = Lock
  notes: Command code ASCII "8" (0x38). Source: "*See note in details".

- id: set_menu_lock
  label: Menu Lock
  kind: action
  command: "8{id}s>{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000" = Unlock, "001" = Lock
  notes: Command code ASCII ">" (0x3E). Source: "*See note in details".

- id: set_remote_control
  label: Remote Control Mode
  kind: action
  command: "8{id}sB{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: |
        Three ASCII bytes - "000" = Disable, "001" = Enable,
        "002" = Pass-through. Pass-through: display bypasses RCU
        code to connected device via RS232 but does not react itself.
  notes: Command code ASCII "B" (0x42).

- id: set_contrast
  label: Contrast
  kind: action
  command: "8{id}s#{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "000"-"100"
  notes: Command code ASCII "#" (0x23).

- id: set_sharpness
  label: Sharpness
  kind: action
  command: "8{id}s%{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "000"-"100"
  notes: Command code ASCII "%" (0x25).

- id: set_color
  label: Color
  kind: action
  command: "8{id}s&{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "000"-"100"
  notes: Command code ASCII "&" (0x26).

- id: set_tint
  label: Tint
  kind: action
  command: "8{id}s'{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "000"-"100"
  notes: Command code ASCII "'" (0x27).

- id: set_color_mode
  label: Color Mode
  kind: action
  command: "8{id}s){value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000"=Normal, "001"=Warm, "002"=Cold, "003"=Personal
  notes: Command code ASCII ")" (0x29).

- id: set_surround_sound
  label: Surround Sound
  kind: action
  command: "8{id}s-{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000" = Off, "001" = On
  notes: Command code ASCII "-" (0x2D).

- id: set_bass
  label: Bass
  kind: action
  command: "8{id}s.{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "000"-"100"
  notes: Command code ASCII "." (0x2E).

- id: set_treble
  label: Treble
  kind: action
  command: "8{id}s/{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "000"-"100"
  notes: Command code ASCII "/" (0x2F).

- id: set_balance
  label: Balance
  kind: action
  command: "8{id}s0{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "000"-"100" (050 = central)
  notes: Command code ASCII "0" (0x30).

- id: set_picture_size
  label: Picture Size
  kind: action
  command: "8{id}s1{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000"=FULL (16:9), "001"=NORMAL (4:3), "002"=REAL (1:1). Source marks REAL as "3.1.0".
  notes: Command code ASCII "1" (0x31).

- id: set_osd_language
  label: OSD Language
  kind: action
  command: "8{id}s2{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000"=English, "001"=French, "002"=Spanish (model-dependent extension)
  notes: Command code ASCII "2" (0x32).

- id: set_pip_mode
  label: PIP Mode
  kind: action
  command: "8{id}s9{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000"=OFF, "001"=PIP (POP), "002"=PBP
  notes: Command code ASCII "9" (0x39).

- id: set_pip_sound_select
  label: PIP Sound Select
  kind: action
  command: "8{id}s:{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000"=Main, "001"=PIP (POP)
  notes: Command code ASCII ":" (0x3A).

- id: set_pip_position
  label: PIP Position
  kind: action
  command: "8{id}s;{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000"=Up, "001"=Down, "002"=Left, "003"=Right
  notes: Command code ASCII ";" (0x3B).

- id: set_pip_input
  label: PIP Input
  kind: action
  command: "8{id}s7{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - same code table as set_input_select
  notes: Command code ASCII "7" (0x37). Source marks command as "37*2.9" (likely a version note).

- id: set_number
  label: Number
  kind: action
  command: "8{id}s@{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "000"-"009"
  notes: Command code ASCII "@" (0x40).

- id: set_keypad
  label: Key Pad
  kind: action
  command: "8{id}sA{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: |
        Three ASCII bytes - "000"=UP, "001"=DOWN, "002"=LEFT,
        "003"=RIGHT, "004"=ENTER, "005"=INPUT, "006"=MENU/(EXIT),
        "007"=EXIT
  notes: Command code ASCII "A" (0x41).

- id: set_tiling_mode
  label: Tiling Mode (video wall)
  kind: action
  command: "8{id}sP{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000"=OFF, "001"=ON
  notes: Command code ASCII "P" (0x50).

- id: set_tiling_compensation
  label: Tiling Compensation (bezel width)
  kind: action
  command: "8{id}sQ{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - "000"=OFF, "001"=ON
  notes: Command code ASCII "Q" (0x51).

- id: set_tiling_h_by_v
  label: Tiling H by V Monitors
  kind: action
  command: "8{id}sR{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: |
        Three ASCII bytes - 2nd digit is H monitor count
        ("1"-"9"), 3rd digit is V monitor count ("1"-"9").
        Example "132" = 1 H x 3 V.
  notes: Command code ASCII "R" (0x52).

- id: set_tiling_position
  label: Tiling Position
  kind: action
  command: "8{id}sS{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes, "001"-"025" - screen position to copy to the addressed display
  notes: Command code ASCII "S" (0x53).

- id: set_date
  label: Date (Year/Month/Day)
  kind: action
  command: "8{id}sV{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: |
        Three ASCII bytes - prefix with field tag then 2 digits:
        Y17-Y99 for Year (last 2 digits of 20YY),
        M01-M12 for Month, D01-D31 for Day.
  notes: Command code ASCII "V" (0x56).

- id: set_time
  label: Time (Hour/Min/Sec)
  kind: action
  command: "8{id}sW{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: |
        Three ASCII bytes - prefix with field tag then 2 digits:
        H00-H23 (24-hr Hour), M00-M59 (Minute), S00-S59 (Second).
  notes: Command code ASCII "W" (0x57).

# --- Get-Function commands (command type "g") ---

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "8{id}ga0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "a" (0x61). Response value range "000"-"100".

- id: get_brightness
  label: Get Brightness
  kind: query
  command: "8{id}gb0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "b" (0x62). Response value range "000"-"100".

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "8{id}gc0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "c" (0x63). Response value range "000"-"100".

- id: get_color
  label: Get Color
  kind: query
  command: "8{id}gd0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "d" (0x64). Response value range "000"-"100".

- id: get_tint
  label: Get Tint
  kind: query
  command: "8{id}ge0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "e" (0x65). Response value range "000"-"100".

- id: get_volume
  label: Get Volume
  kind: query
  command: "8{id}gf0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "f" (0x66). Response value range "000"-"100".

- id: get_mute
  label: Get Mute
  kind: query
  command: "8{id}gg0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "g" (0x67). Response "000"=OFF, "001"=ON.

- id: get_input_select
  label: Get Input Select
  kind: query
  command: "8{id}gj0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "j" (0x6A). Response range per set_input_select table (source truncated at "000~").

- id: get_power_status
  label: Get Power Status (ON/STBY)
  kind: query
  command: "8{id}gl0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "l" (0x6C). Response "000"=STBY, "001"=ON.

- id: get_remote_control
  label: Get Remote Control Mode
  kind: query
  command: "8{id}gn0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "n" (0x6E). Response "000"=Disable, "001"=Enable, "002"=Pass-through.

- id: get_power_lock
  label: Get Power Lock
  kind: query
  command: "8{id}go0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "o" (0x6F). Response "000"=Unlock, "001"=Lock.

- id: get_button_lock
  label: Get Button Lock
  kind: query
  command: "8{id}gp0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "p" (0x70). Response "000"=Unlock, "001"=Lock.

- id: get_menu_lock
  label: Get Menu Lock
  kind: query
  command: "8{id}gq0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "q" (0x71). Response "000"=Unlock, "001"=Lock.

- id: get_pip_mode
  label: Get PIP Mode
  kind: query
  command: "8{id}gt0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "t" (0x74). Response "000"=OFF, "001"=PIP (POP), "002"=PBP.

- id: get_pip_input
  label: Get PIP Input
  kind: query
  command: "8{id}gu0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "u" (0x75). Response range per set_input_select table (source truncated at "000 ~").

- id: get_tiling_mode
  label: Get Tiling Mode
  kind: query
  command: "8{id}gv0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "v" (0x76). Response "000"=OFF, "001"=ON.

- id: get_tiling_compensation
  label: Get Tiling Compensation
  kind: query
  command: "8{id}gw0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "w" (0x77). Response "000"=OFF, "001"=ON.

- id: get_tiling_h_by_v
  label: Get Tiling H by V Monitors
  kind: query
  command: "8{id}gx0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: |
    Command code ASCII "x" (0x78). Response: 2nd digit = H monitors
    "1"-"9", 3rd digit = V monitors "1"-"9".

- id: get_tiling_position
  label: Get Tiling Position
  kind: query
  command: "8{id}gy0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "y" (0x79). Response "000"=OFF, "001"-"025"=position.

- id: get_ack
  label: Get ACK (link test)
  kind: query
  command: "8{id}gz0000x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
  notes: Command code ASCII "z" (0x7A). Used to test the communication link. Response always "000".

- id: get_thermal
  label: Get Thermal (temperature)
  kind: query
  command: "8{id}g0{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - typically "000"
  notes: |
    Command code ASCII "0" (0x30). Specific models only.
    Response "000"-"100" = 0 to +100 deg C, "-01" to "-99" = -1 to -99 deg C.

- id: get_power_on_off_log
  label: Get Power On/Off Log
  kind: query
  command: "8{id}g1{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - typically "000"
  notes: Command code ASCII "1" (0x31). Specific models only. Response format referenced by source note.

- id: get_date
  label: Get Date (Year/Month/Day)
  kind: query
  command: "8{id}g2{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - typically "000"
  notes: |
    Command code ASCII "2" (0x32). Specific models only.
    Response prefix indicates field: "Y17"-"Y99" Year, "M01"-"M12" Month,
    "D01"-"D31" Day.

- id: get_time
  label: Get Time (Hour/Min/Sec)
  kind: query
  command: "8{id}g3{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - typically "000"
  notes: |
    Command code ASCII "3" (0x33). Specific models only.
    Response prefix indicates field: "H00"-"H23" Hour, "M00"-"M59" Minute,
    "S00"-"S59" Second.

- id: get_rs232_version
  label: Get RS232 Protocol Version
  kind: query
  command: "8{id}g6{value}0x0D"
  params:
    - name: id
      type: string
      description: Two-ASCII-digit display ID
    - name: value
      type: string
      description: Three ASCII bytes - typically "000"
  notes: |
    Command code ASCII "6" (0x36). Response range "001~" - version
    formatted as "0.0.1" through "9.9.9".
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [stby, on]
  source: get_power_status
- id: mute_state
  type: enum
  values: [off, on]
  source: get_mute
- id: input_source
  type: string
  description: |
    Three-ASCII-byte code per set_input_select table (000/001/002/003/004/014/024/034/005/006/016/026/007/008/009/00A).
  source: get_input_select
- id: remote_control_mode
  type: enum
  values: [disable, enable, pass_through]
  source: get_remote_control
- id: lock_state
  type: enum
  values: [unlock, lock]
  source: get_power_lock / get_button_lock / get_menu_lock
- id: tiling_mode_state
  type: enum
  values: [off, on]
  source: get_tiling_mode
- id: tiling_compensation_state
  type: enum
  values: [off, on]
  source: get_tiling_compensation
- id: tiling_geometry
  type: string
  description: Three ASCII bytes - 2nd digit H monitors (1-9), 3rd digit V monitors (1-9)
  source: get_tiling_h_by_v
- id: tiling_position_state
  type: string
  description: "000"=OFF or "001"-"025" position
  source: get_tiling_position
- id: pip_mode_state
  type: enum
  values: [off, pip_pop, pbp]
  source: get_pip_mode
- id: pip_input_state
  type: string
  description: Three-ASCII-byte code per set_input_select table
  source: get_pip_input
- id: ack_link
  type: string
  description: Always "000" when link is healthy
  source: get_ack
- id: thermal_celsius
  type: integer
  description: |
    0-100 from response "000"-"100"; negative 1-99 from response "-01"-"-99".
    Specific models only.
  source: get_thermal
- id: rs232_version
  type: string
  description: Protocol version string in 0.0.1 - 9.9.9 format
  source: get_rs232_version
- id: set_command_ack
  type: enum
  values: [valid, invalid]
  description: |
    Valid (Command Type "+", 0x2B) or invalid (Command Type "-", 0x2D)
    reply to any Set command. Reply is 5 bytes: 0x34 ID 0x2B|0x2D 0x0D.
  source: set-command reply
- id: ir_pass_through_key
  type: string
  description: |
    Unsolicited 7-byte packet (Command Type "p", 0x70) sent when the
    display is in Remote Control Pass-through mode. Packet layout:
    0x36 ID 0x70 RCU_Code1 RCU_Code2 0x0D. RCU_Code2 is the MSB,
    RCU_Code1 the LSB. See the IR code table in the source document
    for the full key-to-code map (1=0x01 ... 0=0x0A, VOL+=0x10,
    VOL-=0x11, MUTE=0x12, POWER=0x15, SOURCES=0x16, MENU=0x1A,
    UP=0x1B, DOWN=0x1C, LEFT=0x1D, RIGHT=0x1E, OK=0x1F, EXIT=0x20,
    RED/F1=0x2C, GREEN/F2=0x2D, YELLOW/F3=0x2E, BLUE/F4=0x2F, ...).
  source: IR pass-through reply
```

## Variables
```yaml
- id: contrast
  type: integer
  range: [0, 100]
  description: Contrast level
  source: get_contrast / set_contrast
- id: brightness
  type: integer
  range: [0, 100]
  description: Brightness level
  source: get_brightness / set_brightness
- id: sharpness
  type: integer
  range: [0, 100]
  description: Sharpness level
  source: get_sharpness / set_sharpness
- id: color
  type: integer
  range: [0, 100]
  description: Color saturation level
  source: get_color / set_color
- id: tint
  type: integer
  range: [0, 100]
  description: Tint level
  source: get_tint / set_tint
- id: volume
  type: integer
  range: [0, 100]
  description: |
    Volume level. Use set_volume values 900/901 for relative -1/+1 steps.
  source: get_volume / set_volume
- id: bass
  type: integer
  range: [0, 100]
  source: set_bass
- id: treble
  type: integer
  range: [0, 100]
  source: set_treble
- id: balance
  type: integer
  range: [0, 100]
  description: 050 = central
  source: set_balance
- id: color_mode
  type: enum
  values: [normal, warm, cold, personal]
  source: set_color_mode
- id: surround_sound
  type: enum
  values: [off, on]
  source: set_surround_sound
- id: picture_size
  type: enum
  values: [full_16_9, normal_4_3, real_1_1]
  source: set_picture_size
- id: osd_language
  type: enum
  values: [english, french, spanish]
  description: Model-dependent - may be extended
  source: set_osd_language
- id: date
  type: object
  description: |
    Year/Month/Day, each field a 2-digit decimal. Set/get via single
    command code (sV / g2) with a Y/M/D prefix in the value/response.
  fields: [year, month, day]
  source: set_date / get_date
- id: time
  type: object
  description: |
    Hour (00-23, 24-hr)/Minute(00-59)/Second(00-59). Set/get via
    single command code (sW / g3) with a H/M/S prefix in the
    value/response.
  fields: [hour, minute, second]
  source: set_time / get_time
- id: number_input
  type: integer
  range: [0, 9]
  description: Numeric keypad entry 000-009
  source: set_number
```

## Events
```yaml
- id: ir_pass_through
  description: |
    When the display is in Remote Control Pass-through mode (set via
    set_remote_control value 002), the display forwards every RCU key
    press to the host as a 7-byte packet:

      0x36 ID 0x70 RCU_MSB RCU_LSB 0x0D

    where ID is the display ID and the two RCU bytes encode the
    pressed key (see source IR code table). POWER key has a special
    sequence - see Safety section.
  packet_format: "0x36 {id} 0x70 {rcu_msb} {rcu_lsb} 0x0D"
- id: set_command_reply
  description: |
    Every Set command produces a 5-byte reply:
    0x34 ID 0x2B 0x0D  (valid, "+" = 0x2B)
    0x34 ID 0x2D 0x0D  (invalid, "-" = 0x2D)
  packet_format: "0x34 {id} 0x2B|0x2D 0x0D"
- id: get_command_reply
  description: |
    Every Get command produces a 9-byte reply on success (Command
    Type "r", 0x72): 0x38 ID 0x72 CMD V1 V2 V3 0x0D. On error the
    reply collapses to 5 bytes: 0x34 ID 0x2D 0x0D ("-" = invalid).
  packet_format: "0x38 {id} 0x72 {cmd} {v1} {v2} {v3} 0x0D"
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
# UNRESOLVED: source does not document composite macros; only single-command
# Set/Get functions and the IR pass-through mode are specified. IR press-and-hold
# for VOLUME UP/DOWN "will repeatedly output when you press and hold the keys"
# is the only multi-frame behaviour noted (treat as repeated single-key events).
```

## Safety
```yaml
confirmation_required_for:
  - set_power           # source: power on/off (standby)
interlocks:
  - id: power_lock
    description: |
      When set_power_lock is enabled (value 001), the display ignores the
      POWER key. IR pass-through of the POWER key is also suppressed in
      this state.
    source: set_power_lock; IR pass-through note 2-3
  - id: power_ir_sequence
    description: |
      In IR pass-through mode, POWER has a special two-step sequence:
      (a) display OFF + IR POWER -> display turns ON, then forwards POWER
          code to host;
      (b) display ON + IR POWER -> display forwards POWER code to host,
          then turns OFF.
      The PC host receives the POWER code in both cases and can decide
      whether to keep the display on.
    source: IR pass-through note 2-1, 2-2
# UNRESOLVED: source contains no electrical-safety, fire, or shock warnings;
# no firmware downgrade or recovery procedure is documented.
```

## Notes

**Command frame (9 bytes).** Every Set and Get command follows the layout `Length ID Type Command V1 V2 V3 CR` where Length is the literal ASCII byte `0x38` (digit "8"), ID is two ASCII digits `"01"`–`"98"`, Type is `"s"` / `"g"` / `"+"` / `"-"` / `"r"` / `"p"`, Command is one ASCII byte per the tables, V1–V3 are three ASCII bytes, and CR is `0x0D`. Get sends V1–V3 as `"000"`; the response echoes the actual value. Set reply is 5 bytes; Get reply is 9 bytes (or 5 bytes on error).

**ID 99 broadcast.** Sending to ID `"99"` writes all displays; no reply is generated. With multiple displays, only the unit with ID `"01"` is required to acknowledge on the host's behalf.

**Source table duplication.** The Get-Function tables list four commands (contrast/sharpness/color/tint) in both the "Basic function" and "Optional function" tables with identical opcodes. They are the same commands; the spec lists them once each. The same is true of the four tiling Get commands (mode/compensation/H-by-V/position), which also appear in both tables.

**Set-Date / Set-Time are single commands with field-tagged values.** The Set-Date Year/Month/Day and Set-Time Hour/Min/Sec each use a single command code (V / W) with a Y/M/D or H/M/S prefix in the value bytes. The spec exposes them as one action with the prefix documented in `params`.

**Exceptions for VT2405LED-1 and VT3205LED.** The source notes that those models (not part of the CDX5562 series) have a different "Power on" reply (`0x32 0x2B 0x0D` = `"2+<CR>"`) and a different "Power STBY status" reply (`0x36 0x72 0x6C 0x30 0x30 0x30 0x0D` = `"6rl000<CR>"`). These exceptions are not applicable to the CDX5562 series and are listed here only for completeness.

**Cable and connector.** Source specifies a crossover (null-modem) DB9 cable, male connector on the display. A 2.5 mm barrel connector variant is documented as a special case with tip=TXD, ring=RXD, sleeve=GND.

**Volume relative steps.** Volume `"900"` decrements by 1 and `"901"` increments by 1; absolute volume is `"000"`–`"100"`.

**Tiling H-by-V value format.** The 2nd ASCII digit of the value specifies H monitor count and the 3rd digit specifies V monitor count, each `"1"`–`"9"`. Example `"132"` = 1 H x 3 V.

<!-- UNRESOLVED: firmware version compatibility not stated in source; per-model availability of get_thermal / get_power_on_off_log / get_date / get_time is flagged in source as "For specific models only" but the model list is not enumerated; flow control (RTS/CTS, XON/XOFF) is not stated; maximum packet rate / inter-frame timing is not stated. -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
  - manualslib.com
  - viewsonic.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - "https://www.manualslib.com/manual/3900742/Viewsonic-Cdx5562.html#manual"
  - https://www.viewsonic.com/us/cdx5562.html
retrieved_at: 2026-04-29T10:24:07.729Z
last_checked_at: 2026-05-14T18:17:21.380Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.380Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 61 verifiable spec commands matched literally in source tables; transport parameters verified verbatim; complete coverage of source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; model-family coverage (e.g. CDX5562 vs CDX5562-1 sub-variants) not enumerated beyond product label."
- "flow control not stated in source"
- "source does not document composite macros; only single-command"
- "source contains no electrical-safety, fire, or shock warnings;"
- "firmware version compatibility not stated in source; per-model availability of get_thermal / get_power_on_off_log / get_date / get_time is flagged in source as \"For specific models only\" but the model list is not enumerated; flow control (RTS/CTS, XON/XOFF) is not stated; maximum packet rate / inter-frame timing is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
