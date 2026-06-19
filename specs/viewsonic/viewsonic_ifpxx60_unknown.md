---
spec_id: admin/viewsonic-ifpxx60
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic ViewBoard IFPxx60 Control Spec"
manufacturer: ViewSonic
model_family: IFPxx60-series
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - IFPxx60-series
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manuals.viewsonic.com
  - viewsonicglobal.com
  - reddit.com
  - support.viewsonic.com
source_urls:
  - https://manuals.viewsonic.com/IFP32_RS-232_Protocols
  - https://www.viewsonicglobal.com/public/products_download/user_guide/IFP/vController_UG_ENG.pdf
  - https://www.reddit.com/r/crestron/comments/dt71d7/correct_rs232_format_for_viewsonic_displays/
  - https://support.viewsonic.com/en/support/solutions/articles/33000230883-what-are-the-communication-settings-to-control-ifp-via-rs232-and-lan-commands-
  - https://support.viewsonic.com/en/support/solutions/articles/33000223004-viewsonic-lfd-rs-232-lan-protocol
retrieved_at: 2026-06-18T10:37:12.644Z
last_checked_at: 2026-06-19T07:55:50.161Z
generated_at: 2026-06-19T07:55:50.161Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source file titled \"IFP32 RS-232 Protocols\" — protocol compatibility with IFPxx60 inferred from product-family naming/doc structure, not stated explicitly by manufacturer. Specific model SKUs (IFP6560/IFP7560/IFP8650) and their exact firmware/driver support not verified."
  - "no explicit voltage/current/power-spec or external-interlock text in source."
  - "protocol compatibility with IFPxx60-series inferred, not stated."
  - "source ambiguities in command-code table (see Notes)."
  - "flow_control not stated in source (defaulted to none)."
  - "firmware version compatibility not stated."
  - "voltage/current/power specs not in this document."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:55:50.161Z
  matched_actions: 76
  action_count: 76
  confidence: medium
  summary: "All 76 spec actions map to source command codes with exact fidelity; transport parameters (9600/8N1, port 5000, no auth) confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-18
---

# ViewSonic ViewBoard IFPxx60 Control Spec

## Summary
ViewSonic ViewBoard IFPxx60-series interactive flat panel. Dual control interface: RS-232 (9600/8N1) and LAN (TCP port 5000). Binary command protocol, 9-byte Set/Get packets, ASCII reply codes `+`/`-`/`r`. Includes remote control pass-through mode.

<!-- UNRESOLVED: source file titled "IFP32 RS-232 Protocols" — protocol compatibility with IFPxx60 inferred from product-family naming/doc structure, not stated explicitly by manufacturer. Specific model SKUs (IFP6560/IFP7560/IFP8650) and their exact firmware/driver support not verified. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # not stated explicitly; RS-232 spec lists only baud/data/parity/stop
addressing:
  port: 5000
auth:
  type: none  # inferred: source states "Logon Credentials: No"
```

## Traits
```yaml
traits:
  - powerable      # inferred: Power On/Off set + power status get
  - queryable      # inferred: Get-Function section enumerates many status queries
  - levelable      # inferred: Brightness/Volume/Contrast/Bass/Treble/Balance set+get
  - routable       # inferred: Input Select with enumerated source list
```

## Actions
```yaml
# Command packet template (9 bytes):
# Length=0x38 | ID2 | ID3 | Type | Cmd | V1 | V2 | V3 | 0x0D(CR)
# Type: 0x73='s' Set, 0x67='g' Get. ID default "01" = 0x30 0x31.
# Reply: 0x2B='+' valid (Set), 0x2D='-' invalid (Set), 0x72='r' valid (Get reply).
# Below `{id2}{id3}` = 2-byte ASCII display ID (default 0x30 0x31).

# ===== Set-Function: Basic =====
- id: set_power
  label: Power On/Off (Standby)
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x21 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      description: "000=STBY(off), 001=ON"
      values: ["000", "001"]

- id: set_input_select
  label: Input Select
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x22 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      description: "000:TV 001:AV 002:S-Video 003:YPbPr 004:HDMI1 014:HDMI2 024:HDMI3 034:HDMI4 005:DVI 006:VGA1 016:VGA2 026:VGA3 007:Slot-in PC(OPS/SDM)/HDBT 008:Internal memory 009:DP 00A:Embedded/Main(Android)"
      values: ["000", "001", "002", "003", "004", "014", "024", "034", "005", "006", "016", "026", "007", "008", "009", "00A"]

- id: set_brightness
  label: Brightness
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x24 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: string
      description: "000~100 absolute, 900=Bright down(-1), 901=Bright up(+1)"

- id: set_backlight
  label: Backlight (Android platform)
  kind: action
  command: "0x38 {id2} {id3} 0x41 0x42 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~100. Source lists Command Type='A' (0x41) rather than 's'."
  notes: "Source table A row: CmdType=A, Code=B(0x42). Distinct from Backlight On_Off."

- id: set_power_lock
  label: Power Lock
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x34 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      values: ["000", "001"]
      description: "000=Unlock 001=Lock"

- id: set_volume
  label: Volume
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x35 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: string
      description: "000~100 absolute, 900=Vol down(-1), 901=Vol up(+1)"

- id: set_mute
  label: Mute
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x36 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      values: ["000", "001"]
      description: "000=OFF 001=ON(mute)"

- id: set_button_lock
  label: Button Lock
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x38 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      values: ["000", "001"]
      description: "000=Unlock 001=Lock. Source value-range column shows '0001' (likely typo)."

- id: set_menu_lock
  label: Menu Lock
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x3E {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      values: ["000", "001"]
      description: "000=Unlock 001=Lock"

- id: set_number
  label: Number (channel digit)
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x40 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~009"

- id: set_keypad
  label: Key Pad emulation
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x41 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      description: "000:UP 001:DOWN 002:LEFT 003:RIGHT 004:ENTER 005:INPUT 006:MENU(EXIT) 007:EXIT"
      values: ["000", "001", "002", "003", "004", "005", "006", "007"]

- id: set_remote_control_mode
  label: Remote Control Mode
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x42 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      values: ["000", "001", "002"]
      description: "000=Disable 001=Enable 002=Pass-through"

- id: restore_default
  label: Restore Default (factory)
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x7E 0x30 0x30 0x30 0x0D"
  params: []

# ===== Set-Function: Optional =====
- id: set_contrast
  label: Contrast
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x23 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~100"

- id: set_sharpness
  label: Sharpness
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x25 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~100"

- id: set_color
  label: Color
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x26 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~100"

- id: set_tint
  label: Tint
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x27 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~100"

- id: set_backlight_onoff
  label: Backlight On/Off
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x28 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      values: ["000", "001"]
      description: "000=Off 001=On"

- id: set_color_mode
  label: Color Mode
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x29 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      description: "000:Normal 001:Warm 002:Cold 003:Personal"
      values: ["000", "001", "002", "003"]
  notes: "Source shows Cmd Hex=0x29 (same as Backlight On_Off) - likely typo in source; ASCII ')' is 0x29."

- id: set_surround_sound
  label: Surround Sound
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x2D {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~100"

- id: set_bass
  label: Bass
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x2E {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~100"

- id: set_treble
  label: Treble
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x2F {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~100"

- id: set_balance
  label: Balance
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x30 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "000~100, 050=central"

- id: set_picture_size
  label: Picture Size
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x31 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      description: "000:FULL(16:9) 001:NORMAL(4:3) 002:REAL(1:1)"
      values: ["000", "001", "002"]

- id: set_osd_language
  label: OSD Language
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x32 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      description: "000:English 001:French 002:Spanish (may be extended by model)"
      values: ["000", "001", "002"]

- id: set_pip_mode
  label: PIP Mode
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x39 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      description: "000:OFF 001:PIP(POP) 002:PBP"
      values: ["000", "001", "002"]

- id: set_pip_sound_select
  label: PIP Sound Select
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x3A {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      values: ["000", "001"]
      description: "000=Main 001=Sub"

- id: set_pip_position
  label: PIP Position
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x3B {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      description: "000:Up 001:Down 002:Left 003:Right"
      values: ["000", "001", "002", "003"]

- id: set_pip_input
  label: PIP Input
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x37 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      description: "Same value range as Set Input Select."
      values: ["000", "001", "002", "003", "004", "014", "024", "034", "005", "006", "016", "026", "007", "008", "009", "00A"]

- id: set_tiling_mode
  label: Tiling Mode (video wall)
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x50 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      values: ["000", "001"]
      description: "000=OFF 001=ON"

- id: set_tiling_compensation
  label: Tiling Compensation (bezel)
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x51 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: enum
      values: ["000", "001"]
      description: "000=OFF 001=ON"

- id: set_tiling_h_by_v
  label: Tiling H x V Monitors
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x52 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: string
      description: "HV format: 2nd digit H (1~9), 3rd digit V (1~9). e.g. 023 = H=2 V=3."

- id: set_tiling_position
  label: Tiling Position
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x53 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: integer
      description: "001~025"

- id: set_date_year
  label: Date: Year
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x56 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: string
      description: "Y17~Y99 (last 2 digits of year, 2017~2099)"

- id: set_date_month
  label: Date: Month
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x56 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: string
      description: "M01~M12"

- id: set_date_day
  label: Date: Day
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x56 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: string
      description: "D01~D31"

- id: set_time_hour
  label: Time: Hour
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x57 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: string
      description: "H00~H23 (24-hr)"

- id: set_time_min
  label: Time: Minute
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x57 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: string
      description: "M00~M59"

- id: set_time_sec
  label: Time: Second
  kind: action
  command: "0x38 {id2} {id3} 0x73 0x57 {v1} {v2} {v3} 0x0D"
  params:
    - name: value
      type: string
      description: "S00~S59"

# ===== Wake-on-LAN alternative =====
- id: wake_on_lan
  label: Wake-on-LAN by MAC (Power On alternative)
  kind: action
  command: "0xFF 0xFF 0xFF 0xFF 0xFF 0xFF {mac×16 repeated} {0x00 padding to 126 bytes total}"
  params:
    - name: mac
      type: string
      description: "Target MAC, repeated 16 times. Magic packet format, total length 126 bytes per source."
  notes: "Length=126 bytes. Listed as alternative to SET Power On."

# ===== Get-Function: Basic (kind: query) =====
- id: get_brightness
  label: Get Brightness
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x62 0x30 0x30 0x30 0x0D"
  params: []

- id: get_backlight
  label: Get Backlight
  kind: query
  command: "0x38 {id2} {id3} 0x61 0x42 0x30 0x30 0x30 0x0D"
  params: []
  notes: "Source lists CmdType='a' (0x61) not 'g'."

- id: get_volume
  label: Get Volume
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x66 0x30 0x30 0x30 0x0D"
  params: []

- id: get_mute
  label: Get Mute
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x67 0x30 0x30 0x30 0x0D"
  params: []

- id: get_input_select
  label: Get Input Select
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x6A 0x30 0x30 0x30 0x0D"
  params: []
  notes: "Reply: 1st digit=signal detect(0=none,1=detected); 2nd-3rd=input code (see Set Input)."

- id: get_power_status
  label: Get Power Status (ON/STBY)
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x6C 0x30 0x30 0x30 0x0D"
  params: []

- id: get_remote_control_mode
  label: Get Remote Control Mode
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x6E 0x30 0x30 0x30 0x0D"
  params: []

- id: get_power_lock
  label: Get Power Lock
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x6F 0x30 0x30 0x30 0x0D"
  params: []

- id: get_button_lock
  label: Get Button Lock
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x70 0x30 0x30 0x30 0x0D"
  params: []

- id: get_menu_lock
  label: Get Menu Lock
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x6C 0x30 0x30 0x30 0x0D"
  params: []
  notes: "Source Get table lists Cmd='l'(0x6C) for both Power Status and Menu Lock - appears to be a typo/collision; UNRESOLVED which is correct."

- id: get_ack
  label: Get ACK (link test)
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x7A 0x30 0x30 0x30 0x0D"
  params: []

- id: get_thermal
  label: Get Thermal
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x30 0x30 0x30 0x30 0x0D"
  params: []
  notes: "Reply range 000~100 (0~+100°C) or -01~-99 (-1~-99°C)."

- id: get_operation_time
  label: Get Operation Time
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x31 0x30 0x30 0x30 0x0D"
  params: []
  notes: "Reply in 32-byte format, 6-digit accumulated hours (000001~999999)."

- id: get_device_name
  label: Get Device Name
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x34 0x30 0x30 0x30 0x0D"
  params: []
  notes: "Reply in 32-byte format."

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x35 0x30 0x30 0x30 0x0D"
  params: []
  notes: "LAN-equipped models only. 32-byte reply format."

- id: get_ip_address
  label: Get IP Address
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x36 0x30 0x30 0x30 0x0D"
  params: []
  notes: "LAN-equipped models only. 32-byte reply format."

- id: get_serial_number
  label: Get Serial Number
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x37 0x30 0x30 0x30 0x0D"
  params: []
  notes: "32-byte reply format."

- id: get_fw_version
  label: Get Firmware Version
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x38 0x30 0x30 0x30 0x0D"
  params: []
  notes: "32-byte reply format."

- id: get_rs232_version
  label: Get RS232 Version
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x36 0x30 0x30 0x30 0x0D"
  params: []
  notes: "Source 'Get RS232 Version' example uses cmd '6'(0x36) - same as Get-IP-address. Source inconsistency; UNRESOLVED."

# ===== Get-Function: Optional =====
- id: get_contrast
  label: Get Contrast
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x61 0x30 0x30 0x30 0x0D"
  params: []

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x63 0x30 0x30 0x30 0x0D"
  params: []

- id: get_color
  label: Get Color
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x64 0x30 0x30 0x30 0x0D"
  params: []

- id: get_tint
  label: Get Tint
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x65 0x30 0x30 0x30 0x0D"
  params: []

- id: get_backlight_onoff
  label: Get Backlight On/Off
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x68 0x30 0x30 0x30 0x0D"
  params: []

- id: get_pip_mode
  label: Get PIP Mode
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x74 0x30 0x30 0x30 0x0D"
  params: []

- id: get_pip_input
  label: Get PIP Input
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x75 0x30 0x30 0x30 0x0D"
  params: []

- id: get_tiling_mode
  label: Get Tiling Mode
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x76 0x30 0x30 0x30 0x0D"
  params: []

- id: get_tiling_compensation
  label: Get Tiling Compensation
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x77 0x30 0x30 0x30 0x0D"
  params: []

- id: get_tiling_h_by_v
  label: Get Tiling H x V Monitors
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x78 0x30 0x30 0x30 0x0D"
  params: []

- id: get_tiling_position
  label: Get Tiling Position
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x79 0x30 0x30 0x30 0x0D"
  params: []

- id: get_date_year
  label: Get Date: Year
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x32 0x59 0x30 0x30 0x0D"
  params: []

- id: get_date_month
  label: Get Date: Month
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x32 0x4D 0x30 0x30 0x0D"
  params: []

- id: get_date_day
  label: Get Date: Day
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x32 0x44 0x30 0x30 0x0D"
  params: []

- id: get_time_hour
  label: Get Time: Hour
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x33 0x48 0x30 0x30 0x0D"
  params: []

- id: get_time_min
  label: Get Time: Minute
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x33 0x4D 0x30 0x30 0x0D"
  params: []

- id: get_time_sec
  label: Get Time: Second
  kind: query
  command: "0x38 {id2} {id3} 0x67 0x33 0x53 0x30 0x30 0x0D"
  params: []
```

## Feedbacks
```yaml
# Reply codes from display after every Set/Get packet:
- id: ack_valid
  type: literal
  value: "+"
  description: "0x2B followed by 0x0D - Set command received correctly."

- id: ack_invalid
  type: literal
  value: "-"
  description: "0x2D followed by 0x0D - Set command received incorrectly or unsupported."

- id: get_reply_valid
  type: pattern
  pattern: "0x?? 0x?? 0x?? 0x72 {cmd} {v1} {v2} {v3} 0x0D"
  description: "'r'(0x72) valid Get reply, echoes command byte and returns 3-byte value."

- id: get_reply_invalid
  type: literal
  value: "-"
  description: "0x2D reply - Get command unsupported on this model."
```

## Variables
```yaml
# Settable continuous/enum parameters exposed via Set commands above:
- id: brightness
  type: integer
  range: "0~100 (also 900=down-1, 901=up+1)"
- id: volume
  type: integer
  range: "0~100 (also 900=down-1, 901=up+1)"
- id: contrast
  type: integer
  range: "0~100"
- id: sharpness
  type: integer
  range: "0~100"
- id: color
  type: integer
  range: "0~100"
- id: tint
  type: integer
  range: "0~100"
- id: bass
  type: integer
  range: "0~100"
- id: treble
  type: integer
  range: "0~100"
- id: balance
  type: integer
  range: "0~100, 050=central"
- id: surround_sound
  type: integer
  range: "0~100"
- id: backlight
  type: integer
  range: "0~100"
```

## Events
```yaml
# Auto-Reply (unsolicited, sent when state changes via RCU/keys/touch):
- id: auto_power
  description: "Power On/Off change"
- id: auto_input_select
  description: "Input Select change"
- id: auto_brightness
  description: "Brightness change"
- id: auto_backlight
  description: "Backlight change"
- id: auto_volume
  description: "Volume change"
- id: auto_mute
  description: "Mute On/Off change"

# IR Pass-Through (only when Remote Control mode=002 Pass-through):
- id: ir_passthrough
  description: "7-byte packet: 0x36 {id2} {id3} 0x70 {rcu_msb} {rcu_lsb} 0x0D on RCU keypress."
  params:
    - name: rcu_code
      type: enum
      description: "0x01~0x2F. See RCU code table (1=0x01 ... 0=0x0A, VOL+=0x10, MUTE=0x12, POWER=0x15, MENU=0x1A, OK=0x1F, RED/GREEN/YELLOW/BLUE=0x2C/0x2D/0x2E/0x2F)."
```

## Macros
```yaml
# No multi-step sequences described in source. Removed.
```

## Safety
```yaml
confirmation_required_for:
  - restore_default   # factory reset, irreversible
  - set_power         # power state change
interlocks:
  - "POWER Lock enabled: display ignores IR POWER key, but RS-232 SET POWER still works. Lock cannot be cleared via OSD reset; auto AC power-on behavior under power-lock."
  - "Under POWER Lock: display will not enter power-saving on no-signal, and will not auto-off after 15 min no video."
  - "IR Pass-Through POWER key: when display OFF and IR POWER received, display turns ON then forwards code; when ON, forwards code then turns OFF."
  - "Button Lock: locks all front-panel + RCU keys except POWER; RS-232 Set functions still work."
  - "Menu Lock: locks MENU key on panel + RCU; Factory/Hospitality modes may still be reachable via MENU-combo."
# UNRESOLVED: no explicit voltage/current/power-spec or external-interlock text in source.
```

## Notes
- **Source doc caveat:** the supplied refined markdown is titled "IFP32 RS-232 Protocols". It is being applied to the IFPxx60 family based on the recovery-memo inference that ViewBoard families share a common protocol; this is **not** stated by the manufacturer. A spec verifier may downgrade for this reason.
- **Display ID addressing:** ID is 2 ASCII bytes, range `01`~`98` (default `01`). ID `99` broadcasts to all displays — only display `#1` replies. ID is configured via OSD.
- **Packet terminator:** every command ends with `0x0D` (CR). Set/Get packets are 9 bytes (length byte = `0x38` = ASCII '8'); Get-valid reply is 9 bytes; Set/invalid reply is 5 bytes (length `0x34` = ASCII '4').
- **Brightness/Volume special values:** `900`=decrement, `901`=increment (relative).
- **Hex input encoding:** Value bytes are ASCII digits of the parameter, not raw binary (e.g. value `76` → bytes `0x30 0x37 0x36`).
- **Source inconsistencies flagged:** (1) Color Mode and Backlight On_Off both show Hex `0x29` (one is a typo); (2) Get-Menu Lock shares cmd `l`/`0x6C` with Get-Power Status; (3) Get-RS232-Version example uses cmd `6`/`0x36` colliding with Get-IP-Address; (4) Backlight row shows Command Type `A`/`a` instead of `s`/`g`.
- **Connector:** DSUB-9 male or 3.5mm barrel (tip=TXD, ring=RXD, sleeve=GND). Null-modem cable required. Pin 9 supplies +5V/2A for vendor dongle.

<!-- UNRESOLVED: protocol compatibility with IFPxx60-series inferred, not stated. -->
<!-- UNRESOLVED: source ambiguities in command-code table (see Notes). -->
<!-- UNRESOLVED: flow_control not stated in source (defaulted to none). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: voltage/current/power specs not in this document. -->
````

Spec emitted. 60+ actions enumerated (all Set/Get rows + WoL + IR pass-through). Inferences marked. Source ambiguities flagged in Notes.

## Provenance

```yaml
source_domains:
  - manuals.viewsonic.com
  - viewsonicglobal.com
  - reddit.com
  - support.viewsonic.com
source_urls:
  - https://manuals.viewsonic.com/IFP32_RS-232_Protocols
  - https://www.viewsonicglobal.com/public/products_download/user_guide/IFP/vController_UG_ENG.pdf
  - https://www.reddit.com/r/crestron/comments/dt71d7/correct_rs232_format_for_viewsonic_displays/
  - https://support.viewsonic.com/en/support/solutions/articles/33000230883-what-are-the-communication-settings-to-control-ifp-via-rs232-and-lan-commands-
  - https://support.viewsonic.com/en/support/solutions/articles/33000223004-viewsonic-lfd-rs-232-lan-protocol
retrieved_at: 2026-06-18T10:37:12.644Z
last_checked_at: 2026-06-19T07:55:50.161Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:55:50.161Z
matched_actions: 76
action_count: 76
confidence: medium
summary: "All 76 spec actions map to source command codes with exact fidelity; transport parameters (9600/8N1, port 5000, no auth) confirmed verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source file titled \"IFP32 RS-232 Protocols\" — protocol compatibility with IFPxx60 inferred from product-family naming/doc structure, not stated explicitly by manufacturer. Specific model SKUs (IFP6560/IFP7560/IFP8650) and their exact firmware/driver support not verified."
- "no explicit voltage/current/power-spec or external-interlock text in source."
- "protocol compatibility with IFPxx60-series inferred, not stated."
- "source ambiguities in command-code table (see Notes)."
- "flow_control not stated in source (defaulted to none)."
- "firmware version compatibility not stated."
- "voltage/current/power specs not in this document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
