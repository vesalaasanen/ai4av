---
spec_id: admin/hisense-85u75n-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 85U75N Series RS-232/IR Control Spec"
manufacturer: HiSense
model_family: 85U75N
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 85U75N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-02T01:56:39.285Z
last_checked_at: 2026-05-14T18:17:16.657Z
generated_at: 2026-05-14T18:17:16.657Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document lists \"Prosumer TV\" without enumerating the 85U75N as a supported model; the REVISION NOTES do not reference the 85U75N chassis."
  - "serial port number, baud rate beyond 9600, parity, and stop bits are the only transport parameters stated. No TCP/IP control is documented."
  - "source table is truncated at POIS with POIS0000..0003 enumerated; the"
  - "source does not document unsolicited notifications from the TV."
  - "source does not document multi-step macro sequences; each command must be issued individually."
  - "source example shows power-on requires PWRE=1 then POWR=1, but this is a documented sequence not a device-stored macro."
  - "no further safety warnings, interlock procedures, or power-on sequencing"
  - "source document revision is V3.6 (17-Apr-2017); applicability to the 85U75N chassis (a 2024 model) is not confirmed."
  - "source lists \"Prosumer TV\" without enumerating 85U75N as a supported model."
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.657Z
  matched_actions: 30
  action_count: 39
  confidence: medium
  summary: "All 30 spec actions and 17 feedback entries map to literal commands in source; transport parameters verified; complete RS-232 command coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 85U75N Series Control Spec

## Summary
RS-232C serial and discrete-IR control for the HiSense Prosumer TV line (protocol revision V3.6). RS-232 uses a fixed-length ASCII frame at 9600 8N1 over a DB9 chassis connector. IR is NEC-format (custom code 04FB) with Pronto CCF hex codes. This spec is generated from the V3.6 protocol document; applicability to the 85U75N chassis specifically is unverified.

<!-- UNRESOLVED: source document lists "Prosumer TV" without enumerating the 85U75N as a supported model; the REVISION NOTES do not reference the 85U75N chassis. -->
<!-- UNRESOLVED: serial port number, baud rate beyond 9600, parity, and stop bits are the only transport parameters stated. No TCP/IP control is documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  electrical: RS-232C
  connector: DB9 female chassis mount
  pinout:
    male: "1=N/C 2=RXD 3=TXD 4=DTR 5=GND 6=DSR 7=RTS 8=CTS 9=Power Input"
    female: "1=RI 2=TXD 3=RXD 4=DSR 5=GND 6=DTR 7=CTS 8=RTS 9=Power Input/DCD"
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame format (RS-232 set):** `S[CLIENT_ID 3B][COMMAND 4B][DATA 4B][CHECKSUM 1B]<CR 0x0D>`
**Frame format (RS-232 query):** `Q[CLIENT_ID 3B][COMMAND 4B][????][CHECKSUM 1B]<CR 0x0D>`
**Acknowledgement:** `[CLIENT_ID 3B]:[ACK 1B][DATA 4B][CHECKSUM 1B]<CR>` where ACK is most commonly `OKAY`, `EROR`, or `WAIT`.
**Termination:** `0x0D` (CR). **Colon:** `0x3A`. **Communication code:** ASCII.
**Checksum:** 8-bit sum of all preceding bytes such that the total string (including checksum byte) equals zero.
**CLIENT_ID:** last 3 bytes of MAC address (e.g. `5FA`), `ALL` for broadcast, or selected in TV menu. The example hex commands use MAC `465` and broadcast `ALL`.

## Traits
```yaml
- powerable       # inferred: POWR/POWR???? commands
- routable        # inferred: INPT/INPT???? commands
- queryable       # inferred: Q???? query commands returning state
- levelable       # inferred: VOLM/CONT/BRIT/COLR/TINT/SHRP/BKLV numeric set commands
```

## Actions
```yaml
# IR commands: each is a discrete NEC-format code with custom code 04FB and the
# data code below. A complete Pronto CCF hex pattern is also published per code.
# Hex codes are NEC: [04 FB] [DATA] [DATA XOR 0xFF]. Carrier ~38kHz.

- id: ir_power_toggle
  label: IR Power (toggle)
  kind: action
  command: "04 FB 70 8F"
  params: []
  notes: NEC custom 04FB, data 0x70, complement 0x8F

- id: ir_power_on
  label: IR Power On
  kind: action
  command: "04 FB 71 8E"
  params: []

- id: ir_power_off
  label: IR Power Off
  kind: action
  command: "04 FB 72 8D"
  params: []

- id: ir_input_toggle
  label: IR Input (toggle)
  kind: action
  command: "04 FB 73 8C"
  params: []

- id: ir_tv_tuner
  label: IR TV Tuner
  kind: action
  command: "04 FB 74 8B"
  params: []

- id: ir_hdmi1
  label: IR HDMI 1
  kind: action
  command: "04 FB 7C 83"
  params: []

- id: ir_hdmi2
  label: IR HDMI 2
  kind: action
  command: "04 FB 7D 82"
  params: []

- id: ir_hdmi3
  label: IR HDMI 3
  kind: action
  command: "04 FB 7E 81"
  params: []

- id: ir_hdmi4
  label: IR HDMI 4
  kind: action
  command: "04 FB 7F 80"
  params: []

- id: ir_hdmi5
  label: IR HDMI 5
  kind: action
  command: "04 FB 80 7F"
  params: []

- id: ir_vga
  label: IR VGA
  kind: action
  command: "04 FB 81 7E"
  params: []

- id: ir_usb
  label: IR USB
  kind: action
  command: "04 FB 82 7D"
  params: []

- id: ir_picture_mode_toggle
  label: IR Picture Mode (toggle)
  kind: action
  command: "04 FB 83 7C"
  params: []

- id: ir_sound_mode_toggle
  label: IR Sound Mode (toggle)
  kind: action
  command: "04 FB 84 7B"
  params: []

- id: ir_aspect_wide_16_9
  label: IR Aspect Ratio Wide 16:9
  kind: action
  command: "04 FB 85 7A"
  params: []

- id: ir_aspect_normal_4_3
  label: IR Aspect Ratio Normal 4:3
  kind: action
  command: "04 FB 86 79"
  params: []

- id: ir_aspect_cinema
  label: IR Aspect Ratio Cinema
  kind: action
  command: "04 FB 87 78"
  params: []

- id: ir_aspect_panorama
  label: IR Aspect Ratio Panorama
  kind: action
  command: "04 FB 88 77"
  params: []

- id: ir_aspect_zoom
  label: IR Aspect Ratio Zoom
  kind: action
  command: "04 FB 89 76"
  params: []

- id: ir_channel_list
  label: IR Channel List
  kind: action
  command: "04 FB 8A 75"
  params: []

- id: ir_fav_channel
  label: IR Favourite Channel
  kind: action
  command: "04 FB 8B 74"
  params: []

- id: ir_sleep
  label: IR Sleep
  kind: action
  command: "04 FB 8C 73"
  params: []

- id: ir_tv_menu_toggle
  label: IR TV Menu (toggle)
  kind: action
  command: "04 FB 8D 72"
  params: []

- id: ir_home
  label: IR Home
  kind: action
  command: "04 FB 8E 71"
  params: []

- id: ir_tools
  label: IR Tools (Second Menu)
  kind: action
  command: "04 FB 8F 70"
  params: []

- id: ir_digit_0
  label: IR Digit 0
  kind: action
  command: "04 FB 90 6F"
  params: []

- id: ir_digit_1
  label: IR Digit 1
  kind: action
  command: "04 FB 91 6E"
  params: []

- id: ir_digit_2
  label: IR Digit 2
  kind: action
  command: "04 FB 92 6D"
  params: []

- id: ir_digit_3
  label: IR Digit 3
  kind: action
  command: "04 FB 93 6C"
  params: []

- id: ir_digit_4
  label: IR Digit 4
  kind: action
  command: "04 FB 94 6B"
  params: []

- id: ir_digit_5
  label: IR Digit 5
  kind: action
  command: "04 FB 95 6A"
  params: []

- id: ir_digit_6
  label: IR Digit 6
  kind: action
  command: "04 FB 96 69"
  params: []

- id: ir_digit_7
  label: IR Digit 7
  kind: action
  command: "04 FB 97 68"
  params: []

- id: ir_digit_8
  label: IR Digit 8
  kind: action
  command: "04 FB 98 67"
  params: []

- id: ir_digit_9
  label: IR Digit 9
  kind: action
  command: "04 FB 99 66"
  params: []

- id: ir_digit_dash
  label: IR Digit Dash
  kind: action
  command: "04 FB 9A 65"
  params: []

- id: ir_previous_channel
  label: IR Previous Channel
  kind: action
  command: "04 FB 9B 64"
  params: []

- id: ir_up_arrow
  label: IR Up Arrow
  kind: action
  command: "04 FB 9C 63"
  params: []

- id: ir_down_arrow
  label: IR Down Arrow
  kind: action
  command: "04 FB 9D 62"
  params: []

- id: ir_left_arrow
  label: IR Left Arrow
  kind: action
  command: "04 FB 9E 61"
  params: []

- id: ir_right_arrow
  label: IR Right Arrow
  kind: action
  command: "04 FB 9F 60"
  params: []

- id: ir_enter
  label: IR Enter
  kind: action
  command: "04 FB A0 5F"
  params: []

- id: ir_select_ok
  label: IR Select (OK)
  kind: action
  command: "04 FB A1 5E"
  params: []

- id: ir_return
  label: IR Return
  kind: action
  command: "04 FB A2 5D"
  params: []

- id: ir_exit
  label: IR Exit
  kind: action
  command: "04 FB A3 5C"
  params: []

- id: ir_info_display_toggle
  label: IR Info/Display (toggle)
  kind: action
  command: "04 FB A4 5B"
  params: []

- id: ir_volume_down
  label: IR Volume Down
  kind: action
  command: "04 FB A5 5A"
  params: []

- id: ir_volume_up
  label: IR Volume Up
  kind: action
  command: "04 FB A6 59"
  params: []

- id: ir_channel_down
  label: IR Channel Down
  kind: action
  command: "04 FB A7 58"
  params: []

- id: ir_channel_up
  label: IR Channel Up
  kind: action
  command: "04 FB A8 57"
  params: []

- id: ir_pip_toggle
  label: IR PIP (toggle)
  kind: action
  command: "04 FB A9 56"
  params: []

- id: ir_pip_input
  label: IR PIP Input
  kind: action
  command: "04 FB AA 55"
  params: []

- id: ir_pip_swap
  label: IR PIP Swap
  kind: action
  command: "04 FB AB 54"
  params: []

- id: ir_pip_position
  label: IR PIP Position
  kind: action
  command: "04 FB AC 53"
  params: []

- id: ir_pip_size
  label: IR PIP Size
  kind: action
  command: "04 FB AD 52"
  params: []

- id: ir_guide_toggle
  label: IR Guide (toggle)
  kind: action
  command: "04 FB AE 51"
  params: []

- id: ir_freeze_toggle
  label: IR Freeze (toggle)
  kind: action
  command: "04 FB AF 50"
  params: []

# RS-232 set/query commands
# Frame: S|Q [3B CLIENT_ID] [4B COMMAND] [4B DATA] [1B CHECKSUM] <CR 0x0D>
# Generic broadcast example (CLIENT_ID=ALL): 53 41 4C 4C [COMMAND] [DATA] [CS] 0D
# MAC-specific example (CLIENT_ID=465):     53 34 36 35 [COMMAND] [DATA] [CS] 0D
# Both example hex strings are published in the source for every command below.

- id: pwre_disable_remote_power_on
  label: Disable RS-232 Remote Power On
  kind: action
  command: "S{client_id}PWRE0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
      description: "3-byte CLIENT ID (last 3 bytes of MAC, e.g. '5FA' or 'ALL')"
  notes: "Disables RS-232 wake. Generic HEX: 53 41 4C 4C 50 57 52 45 30 30 30 30 D6 0D"

- id: pwre_enable_remote_power_on
  label: Enable RS-232 Remote Power On
  kind: action
  command: "S{client_id}PWRE0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
      description: "3-byte CLIENT ID"
  notes: "Enables RS-232 wake. Must be enabled for the TV to power on from standby via serial. Generic HEX: 53 41 4C 4C 50 57 52 45 30 30 30 31 D5 0D"

- id: pwre_query
  label: Query Power On Command Setting
  kind: query
  command: "Q{client_id}PWRE????{checksum}<CR>"
  params:
    - name: client_id
      type: string
      description: "3-byte CLIENT ID"
  notes: "Returns 0=Disable, 1=Enable. Not available in STANDBY mode. Generic HEX: 51 41 4C 4C 50 57 52 45 3F 3F 3F 3F 9C 0D"

- id: powr_standby
  label: Set Power Standby
  kind: action
  command: "S{client_id}POWR0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
      description: "3-byte CLIENT ID"
  notes: "Generic HEX: 53 41 4C 4C 50 4F 57 52 30 30 30 30 CC 0D"

- id: powr_on
  label: Set Power On
  kind: action
  command: "S{client_id}POWR0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
      description: "3-byte CLIENT ID"
  notes: "Generic HEX: 53 41 4C 4C 50 4F 57 52 30 30 30 31 CB 0D"

- id: inpt_next
  label: Set Input: Cycle One at a Time
  kind: action
  command: "S{client_id}INPT0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 30 D9 0D"

- id: inpt_tv
  label: Set Input: TV
  kind: action
  command: "S{client_id}INPT0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 31 D8 0D"

- id: inpt_av
  label: Set Input: AV
  kind: action
  command: "S{client_id}INPT0004{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 34 D5 0D"

- id: inpt_component
  label: Set Input: Component
  kind: action
  command: "S{client_id}INPT0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 33 D6 0D"

- id: inpt_hdmi1
  label: Set Input: HDMI1
  kind: action
  command: "S{client_id}INPT0009{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 39 D0 0D"

- id: inpt_hdmi2
  label: Set Input: HDMI2
  kind: action
  command: "S{client_id}INPT0010{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 54 30 30 31 30 D8 0D"

- id: inpt_hdmi3
  label: Set Input: HDMI3
  kind: action
  command: "S{client_id}INPT0011{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 54 30 30 31 31 D7 0D"

- id: inpt_hdmi4
  label: Set Input: HDMI4
  kind: action
  command: "S{client_id}INPT0012{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 54 30 30 31 32 D6 0D"

- id: inpt_vga
  label: Set Input: VGA
  kind: action
  command: "S{client_id}INPT0006{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 54 30 30 30 36 D3 0D"

- id: inpt_query
  label: Query Current Input Source
  kind: query
  command: "Q{client_id}INPT????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 1=TV 4=AV 3=Component 9=HDMI1 10=HDMI2 11=HDMI3 12=HDMI4 6=VGA. Generic HEX: 51 41 4C 4C 49 4E 50 54 3F 3F 3F 3F 9F 0D"

- id: pmod_standard
  label: Set Picture Mode: Standard
  kind: action
  command: "S{client_id}PMOD0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 30 E4 0D"

- id: pmod_vivid
  label: Set Picture Mode: Vivid
  kind: action
  command: "S{client_id}PMOD0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 32 E2 0D"

- id: pmod_energysaving
  label: Set Picture Mode: EnergySaving
  kind: action
  command: "S{client_id}PMOD0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 33 E1 0D"

- id: pmod_theater
  label: Set Picture Mode: Theater
  kind: action
  command: "S{client_id}PMOD0004{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 34 E0 0D"

- id: pmod_game
  label: Set Picture Mode: Game
  kind: action
  command: "S{client_id}PMOD0005{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 35 DF 0D"

- id: pmod_sport
  label: Set Picture Mode: Sport
  kind: action
  command: "S{client_id}PMOD0006{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4D 4F 44 30 30 30 36 DE 0D"

- id: pmod_query
  label: Query Picture Mode
  kind: query
  command: "Q{client_id}PMOD????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Standard 2=Vivid 3=EnergySaving 4=Theater 5=Game 6=Sport. Generic HEX: 51 41 4C 4C 50 4D 4F 44 3F 3F 3F 3F AA 0D"

- id: brit_set
  label: Set Brightness
  kind: action
  command: "S{client_id}BRIT{value}{checksum}<CR>"
  params:
    - name: client_id
      type: string
    - name: value
      type: string
      description: "4-hex-digit value 0000-0100 (0-100 decimal)"
  notes: "Generic HEX example at 0x35: 53 41 4C 4C 42 52 49 54 30 30 33 35 DB 0D"

- id: brit_query
  label: Query Brightness
  kind: query
  command: "Q{client_id}BRIT????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0-100. Generic HEX: 51 41 4C 4C 42 52 49 54 3F 3F 3F 3F A9 0D"

- id: cont_set
  label: Set Contrast
  kind: action
  command: "S{client_id}CONT{value}{checksum}<CR>"
  params:
    - name: client_id
      type: string
    - name: value
      type: string
      description: "4-hex-digit value 0000-0100 (0-100 decimal)"
  notes: "Generic HEX example at 0x69: 53 41 4C 4C 43 4F 4E 54 30 30 36 39 D1 0D"

- id: cont_query
  label: Query Contrast
  kind: query
  command: "Q{client_id}CONT????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0-100. Generic HEX: 51 41 4C 4C 43 4F 4E 54 3F 3F 3F 3F A6 0D"

- id: colr_set
  label: Set Color Saturation
  kind: action
  command: "S{client_id}COLR{value}{checksum}<CR>"
  params:
    - name: client_id
      type: string
    - name: value
      type: string
      description: "4-hex-digit value 0000-0100 (0-100 decimal)"
  notes: "Generic HEX example at 0x0001: 53 41 4C 4C 43 4F 4C 52 30 30 30 31 E3 0D"

- id: colr_query
  label: Query Color Saturation
  kind: query
  command: "Q{client_id}COLR????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0-100. Generic HEX: 51 41 4C 4C 43 4F 4C 52 3F 3F 3F 3F AA 0D"

- id: tint_set
  label: Set Tint
  kind: action
  command: "S{client_id}TINT{value}{checksum}<CR>"
  params:
    - name: client_id
      type: string
    - name: value
      type: string
      description: "4-hex-digit value 0000-0100 (0-100 decimal)"
  notes: "Generic HEX example at 0x99: 53 41 4C 4C 54 49 4E 54 30 30 39 39 C3 0D"

- id: tint_query
  label: Query Tint
  kind: query
  command: "Q{client_id}TINT????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0-100. Generic HEX: 51 41 4C 4C 54 49 4E 54 3F 3F 3F 3F 9B 0D"

- id: shrp_set
  label: Set Sharpness
  kind: action
  command: "S{client_id}SHRP{value}{checksum}<CR>"
  params:
    - name: client_id
      type: string
    - name: value
      type: string
      description: "4-hex-digit value 0000-0020 (0-20 decimal)"
  notes: "Generic HEX example at 0x20: 53 41 4C 4C 53 48 52 50 30 30 32 30 D5 0D"

- id: shrp_query
  label: Query Sharpness
  kind: query
  command: "Q{client_id}SHRP????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0-20. Generic HEX: 51 41 4C 4C 53 48 52 50 3F 3F 3F 3F 9D 0D"

- id: aspt_auto
  label: Set Aspect Ratio: Auto
  kind: action
  command: "S{client_id}ASPT0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 54 30 30 30 30 DC 0D"

- id: aspt_normal
  label: Set Aspect Ratio: Normal
  kind: action
  command: "S{client_id}ASPT0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 54 30 30 30 32 DA 0D"

- id: aspt_zoom
  label: Set Aspect Ratio: Zoom
  kind: action
  command: "S{client_id}ASPT0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 54 30 30 30 33 D9 0D"

- id: aspt_wide
  label: Set Aspect Ratio: Wide
  kind: action
  command: "S{client_id}ASPT0004{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 54 30 30 30 34 D8 0D"

- id: aspt_direct
  label: Set Aspect Ratio: Direct
  kind: action
  command: "S{client_id}ASPT0005{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 54 30 30 30 35 D7 0D"

- id: aspt_1to1
  label: Set Aspect Ratio: 1:1 Pixel Map
  kind: action
  command: "S{client_id}ASPT0006{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 54 30 30 30 36 D6 0D"

- id: aspt_panoramic
  label: Set Aspect Ratio: Panoramic
  kind: action
  command: "S{client_id}ASPT0007{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 54 30 30 30 37 D5 0D"

- id: aspt_cinema
  label: Set Aspect Ratio: Cinema
  kind: action
  command: "S{client_id}ASPT0008{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 54 30 30 30 38 D4 0D"

- id: aspt_query
  label: Query Current Aspect Ratio
  kind: query
  command: "Q{client_id}ASPT????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Auto 2=Normal 3=Zoom 4=Wide 5=Direct 6=1:1 7=Panoramic 8=Cinema. Generic HEX: 51 41 4C 4C 41 53 50 54 3F 3F 3F 3F A2 0D"

- id: ovsn_on
  label: Set Overscan: On
  kind: action
  command: "S{client_id}OVSN0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4F 56 53 4E 30 30 30 30 CE 0D"

- id: ovsn_off
  label: Set Overscan: Off
  kind: action
  command: "S{client_id}OVSN0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4F 56 53 4E 30 30 30 32 CC 0D"

- id: ovsn_query
  label: Query Overscan
  kind: query
  command: "Q{client_id}OVSN????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=On 2=Off. Generic HEX: 51 41 4C 4C 4F 56 53 4E 3F 3F 3F 3F 94 0D"

- id: rstp1000_reset_picture
  label: Reset Picture Settings
  kind: action
  command: "S{client_id}RSTP1000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 52 53 54 50 31 30 30 30 CA 0D"

- id: ctem_high
  label: Set Color Temp: High
  kind: action
  command: "S{client_id}CTEM0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 43 54 45 4D 30 30 30 30 EB 0D"

- id: ctem_middle
  label: Set Color Temp: Middle
  kind: action
  command: "S{client_id}CTEM0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 43 54 45 4D 30 30 30 32 E9 0D"

- id: ctem_mid_low
  label: Set Color Temp: Mid-Low
  kind: action
  command: "S{client_id}CTEM0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 43 54 45 4D 30 30 30 33 E8 0D"

- id: ctem_low
  label: Set Color Temp: Low
  kind: action
  command: "S{client_id}CTEM0004{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 43 54 45 4D 30 30 30 34 E7 0D"

- id: ctem_query
  label: Query Color Temp
  kind: query
  command: "Q{client_id}CTEM????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=High 2=Middle 3=Mid-Low 4=Low. Generic HEX: 51 41 4C 4C 43 54 45 4D 3F 3F 3F 3F B1 0D"

- id: bklv_set
  label: Set Backlight Value
  kind: action
  command: "S{client_id}BKLV{value}{checksum}<CR>"
  params:
    - name: client_id
      type: string
    - name: value
      type: string
      description: "4-hex-digit value 0000-0100 (0-100 decimal)"
  notes: "Generic HEX example at 0x30: 53 41 4C 4C 42 4B 4C 56 30 30 33 30 E2 0D"

- id: bklv_query
  label: Query Backlight
  kind: query
  command: "Q{client_id}BKLV????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0-100. Generic HEX: 51 41 4C 4C 42 4B 4C 56 3F 3F 3F 3F AB 0D"

- id: amod_standard
  label: Set Sound Mode: Standard
  kind: action
  command: "S{client_id}AMOD0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 30 F3 0D"

- id: amod_theater
  label: Set Sound Mode: Theater
  kind: action
  command: "S{client_id}AMOD0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 32 F1 0D"

- id: amod_music
  label: Set Sound Mode: Music
  kind: action
  command: "S{client_id}AMOD0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 33 F0 0D"

- id: amod_speech
  label: Set Sound Mode: Speech
  kind: action
  command: "S{client_id}AMOD0004{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 34 EF 0D"

- id: amod_late_night
  label: Set Sound Mode: Late Night
  kind: action
  command: "S{client_id}AMOD0005{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 4D 4F 44 30 30 30 35 EE 0D"

- id: amod_query
  label: Query Sound Mode
  kind: query
  command: "Q{client_id}AMOD????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Standard 2=Theater 3=Music 4=Speech 5=Late night. Generic HEX: 51 41 4C 4C 41 4D 4F 44 3F 3F 3F 3F B9 0D"

- id: rsta2000_reset_audio
  label: Reset Audio Settings
  kind: action
  command: "S{client_id}RSTA2000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 52 53 54 41 32 30 30 30 D8 0D"

- id: volm_set
  label: Set Volume
  kind: action
  command: "S{client_id}VOLM{value}{checksum}<CR>"
  params:
    - name: client_id
      type: string
    - name: value
      type: string
      description: "4-hex-digit value 0000-0100 (0-100 decimal)"
  notes: "Generic HEX example at 0x15: 53 41 4C 4C 56 4F 4C 4D 30 30 31 35 D0 0D"

- id: volm_query
  label: Query Volume
  kind: query
  command: "Q{client_id}VOLM????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0-100. Generic HEX: 51 41 4C 4C 56 4F 4C 4D 3F 3F 3F 3F 9C 0D"

- id: mute_off
  label: Set Mute Off
  kind: action
  command: "S{client_id}MUTE0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4D 55 54 45 30 30 30 30 D9 0D"

- id: mute_on
  label: Set Mute On
  kind: action
  command: "S{client_id}MUTE0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4D 55 54 45 30 30 30 31 D8 0D"

- id: mute_query
  label: Query Mute Status
  kind: query
  command: "Q{client_id}MUTE????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Not Mute 1=Mute. Generic HEX: 51 41 4C 4C 4D 55 54 45 3F 3F 3F 3F 9F 0D"

- id: aspk_off
  label: Set TV Speaker Off
  kind: action
  command: "S{client_id}ASPK0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 4B 30 30 30 30 E5 0D"

- id: aspk_on
  label: Set TV Speaker On
  kind: action
  command: "S{client_id}ASPK0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 53 50 4B 30 30 30 32 E3 0D"

- id: aspk_query
  label: Query TV Speaker
  kind: query
  command: "Q{client_id}ASPK????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Off 2=On. Generic HEX: 51 41 4C 4C 41 53 50 4B 3F 3F 3F 3F AB 0D"

- id: tunr_antenna
  label: Set Tuner Mode: Antenna
  kind: action
  command: "S{client_id}TUNR0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 54 55 4E 52 30 30 30 30 CB 0D"

- id: tunr_cable
  label: Set Tuner Mode: Cable
  kind: action
  command: "S{client_id}TUNR0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 54 55 4E 52 30 30 30 32 C9 0D"

- id: tunr_query
  label: Query Tuner Mode
  kind: query
  command: "Q{client_id}TUNR????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Antenna 2=Cable. Generic HEX: 51 41 4C 4C 54 55 4E 52 3F 3F 3F 3F 91 0D"

- id: tscn0001_auto_search
  label: Automatic Channel Search
  kind: action
  command: "S{client_id}TSCN0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 54 53 43 4E 30 30 30 31 DB 0D"

- id: chan_down
  label: Channel Down
  kind: action
  command: "S{client_id}CHAN0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 43 48 41 4E 30 30 30 30 FA 0D"

- id: chan_up
  label: Channel Up
  kind: action
  command: "S{client_id}CHAN0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 43 48 41 4E 30 30 30 31 F9 0D"

- id: cc_off
  label: Caption Control: Off
  kind: action
  command: "S{client_id}CC##0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 43 43 23 23 30 30 30 30 48 0D"

- id: cc_on
  label: Caption Control: On
  kind: action
  command: "S{client_id}CC##0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 43 43 23 23 30 30 30 32 46 0D"

- id: cc_on_mute
  label: Caption Control: On When Mute
  kind: action
  command: "S{client_id}CC##0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 43 43 23 23 30 30 30 33 45 0D"

- id: cc_query
  label: Query Caption Control
  kind: query
  command: "Q{client_id}CC##????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Off 2=On 3=On when mute. Generic HEX: 51 41 4C 4C 43 43 23 23 3F 3F 3F 3F 0E 0D"

- id: rset9999_factory_reset
  label: Restore Factory Settings
  kind: action
  command: "S{client_id}RSET9999{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 52 53 45 54 39 39 39 39 B2 0D"

- id: lang_english
  label: Set OSD Language: English
  kind: action
  command: "S{client_id}LANG0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4C 41 4E 47 30 30 30 30 F2 0D"

- id: lang_spanish
  label: Set OSD Language: Español
  kind: action
  command: "S{client_id}LANG0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4C 41 4E 47 30 30 30 32 F0 0D"

- id: lang_french
  label: Set OSD Language: Français
  kind: action
  command: "S{client_id}LANG0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4C 41 4E 47 30 30 30 33 EF 0D"

- id: lang_query
  label: Query OSD Language
  kind: query
  command: "Q{client_id}LANG????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=English 2=Español 3=Français. Generic HEX: 51 41 4C 4C 4C 41 4E 47 3F 3F 3F 3F B8 0D"

- id: pled_off
  label: Set Standby LED: Off
  kind: action
  command: "S{client_id}PLED0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4C 45 44 30 30 30 30 EF 0D"

- id: pled_on
  label: Set Standby LED: On
  kind: action
  command: "S{client_id}PLED0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4C 45 44 30 30 30 32 ED 0D"

- id: pled_query
  label: Query Standby LED
  kind: query
  command: "Q{client_id}PLED????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Off 2=On. Generic HEX: 51 41 4C 4C 50 4C 45 44 3F 3F 3F 3F B5 0D"

- id: bttn_ch_up
  label: Simulate Remote: CH+
  kind: action
  command: "S{client_id}BTTN1034{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 34 D4 0D"

- id: bttn_ch_down
  label: Simulate Remote: CH-
  kind: action
  command: "S{client_id}BTTN1035{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 35 D3 0D"

- id: bttn_vol_down
  label: Simulate Remote: VOL-
  kind: action
  command: "S{client_id}BTTN1032{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 32 D6 0D"

- id: bttn_vol_up
  label: Simulate Remote: VOL+
  kind: action
  command: "S{client_id}BTTN1033{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 33 D5 0D"

- id: bttn_back
  label: Simulate Remote: BACK
  kind: action
  command: "S{client_id}BTTN1045{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 35 D2 0D"

- id: bttn_power
  label: Simulate Remote: POWER
  kind: action
  command: "S{client_id}BTTN1012{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 32 D8 0D"

- id: bttn_mute
  label: Simulate Remote: MUTE
  kind: action
  command: "S{client_id}BTTN1031{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 31 D7 0D"

- id: bttn_dash
  label: Simulate Remote: DASH
  kind: action
  command: "S{client_id}BTTN1010{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 30 DA 0D"

- id: bttn_input
  label: Simulate Remote: INPUT
  kind: action
  command: "S{client_id}BTTN1036{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 36 D2 0D"

- id: bttn_media_player
  label: Simulate Remote: Media Player (HiMedia)
  kind: action
  command: "S{client_id}BTTN1023{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 33 D6 0D"

- id: bttn_digit_0
  label: Simulate Remote: Digit 0
  kind: action
  command: "S{client_id}BTTN1000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 30 DB 0D"

- id: bttn_digit_1
  label: Simulate Remote: Digit 1
  kind: action
  command: "S{client_id}BTTN1001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 31 DA 0D"

- id: bttn_digit_2
  label: Simulate Remote: Digit 2
  kind: action
  command: "S{client_id}BTTN1002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 32 D9 0D"

- id: bttn_digit_3
  label: Simulate Remote: Digit 3
  kind: action
  command: "S{client_id}BTTN1003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 33 D8 0D"

- id: bttn_digit_4
  label: Simulate Remote: Digit 4
  kind: action
  command: "S{client_id}BTTN1004{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 34 D7 0D"

- id: bttn_digit_5
  label: Simulate Remote: Digit 5
  kind: action
  command: "S{client_id}BTTN1005{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 35 D6 0D"

- id: bttn_digit_6
  label: Simulate Remote: Digit 6
  kind: action
  command: "S{client_id}BTTN1006{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 36 D5 0D"

- id: bttn_digit_7
  label: Simulate Remote: Digit 7
  kind: action
  command: "S{client_id}BTTN1007{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 37 D4 0D"

- id: bttn_digit_8
  label: Simulate Remote: Digit 8
  kind: action
  command: "S{client_id}BTTN1008{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 38 D3 0D"

- id: bttn_digit_9
  label: Simulate Remote: Digit 9
  kind: action
  command: "S{client_id}BTTN1009{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 30 39 D2 0D"

- id: bttn_sleep
  label: Simulate Remote: SLEEP
  kind: action
  command: "S{client_id}BTTN1024{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 34 D5 0D"

- id: bttn_mts_sap
  label: Simulate Remote: MTS/SAP
  kind: action
  command: "S{client_id}BTTN1054{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 34 D2 0D"

- id: bttn_live_tv
  label: Simulate Remote: Live TV
  kind: action
  command: "S{client_id}BTTN1055{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 35 D1 0D"

- id: bttn_pause
  label: Simulate Remote: PAUSE
  kind: action
  command: "S{client_id}BTTN1018{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 38 D2 0D"

- id: bttn_play
  label: Simulate Remote: PLAY
  kind: action
  command: "S{client_id}BTTN1016{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 36 D4 0D"

- id: bttn_menu
  label: Simulate Remote: MENU
  kind: action
  command: "S{client_id}BTTN1038{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 38 D0 0D"

- id: bttn_exit
  label: Simulate Remote: EXIT
  kind: action
  command: "S{client_id}BTTN1046{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 36 D1 0D"

- id: bttn_stop
  label: Simulate Remote: STOP
  kind: action
  command: "S{client_id}BTTN1020{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 30 D9 0D"

- id: bttn_frw
  label: Simulate Remote: FRW <<
  kind: action
  command: "S{client_id}BTTN1015{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 35 D5 0D"

- id: bttn_cc
  label: Simulate Remote: CC
  kind: action
  command: "S{client_id}BTTN1027{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 37 D2 0D"

- id: bttn_red
  label: Simulate Remote: Red Button
  kind: action
  command: "S{client_id}BTTN1050{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 30 D6 0D"

- id: bttn_green
  label: Simulate Remote: Green Button
  kind: action
  command: "S{client_id}BTTN1051{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 31 D5 0D"

- id: bttn_yellow
  label: Simulate Remote: Yellow Button
  kind: action
  command: "S{client_id}BTTN1053{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 33 D3 0D"

- id: bttn_blue
  label: Simulate Remote: Blue Button
  kind: action
  command: "S{client_id}BTTN1052{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 35 32 D4 0D"

- id: bttn_up
  label: Simulate Remote: UP
  kind: action
  command: "S{client_id}BTTN1041{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 31 D6 0D"

- id: bttn_down
  label: Simulate Remote: DOWN
  kind: action
  command: "S{client_id}BTTN1042{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 32 D5 0D"

- id: bttn_left
  label: Simulate Remote: LEFT
  kind: action
  command: "S{client_id}BTTN1043{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 33 D4 0D"

- id: bttn_right
  label: Simulate Remote: RIGHT
  kind: action
  command: "S{client_id}BTTN1044{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 34 D3 0D"

- id: bttn_ok_enter
  label: Simulate Remote: OK/ENTER
  kind: action
  command: "S{client_id}BTTN1040{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 34 30 D7 0D"

- id: bttn_ffw
  label: Simulate Remote: FFW >>
  kind: action
  command: "S{client_id}BTTN1017{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 37 D3 0D"

- id: bttn_previous
  label: Simulate Remote: PREVIOUS
  kind: action
  command: "S{client_id}BTTN1019{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 31 39 D1 0D"

- id: bttn_next
  label: Simulate Remote: NEXT
  kind: action
  command: "S{client_id}BTTN1021{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 32 31 D8 0D"

- id: bttn_connected_home
  label: Simulate Remote: Connected Home (HiSmart)
  kind: action
  command: "S{client_id}BTTN1039{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 42 54 54 4E 31 30 33 39 CF 0D"

- id: pbtn_ac_only
  label: Power Off Control Mode: AC Only
  kind: action
  command: "S{client_id}PBTN0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 42 54 4E 30 30 30 30 E0 0D"

- id: pbtn_all
  label: Power Off Control Mode: All
  kind: action
  command: "S{client_id}PBTN0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 42 54 4E 30 30 30 31 DF 0D"

- id: pbtn_query
  label: Query Power Off Control Mode
  kind: query
  command: "Q{client_id}PBTN????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=AC Only 1=All. Generic HEX: 51 41 4C 4C 50 42 54 4E 3F 3F 3F 3F A6 0D"

- id: mavl_set
  label: Set Volume Range
  kind: action
  command: "S{client_id}MAVL{value}{checksum}<CR>"
  params:
    - name: client_id
      type: string
    - name: value
      type: string
      description: "4-hex-digit value 0000-0100 (0-100 decimal)"
  notes: "Generic HEX example at 0x100: 53 41 4C 4C 4D 41 56 4C 30 31 30 30 E3 0D"

- id: mavl_query
  label: Query Volume Range
  kind: query
  command: "Q{client_id}MAVL????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0-100. Generic HEX: 51 41 4C 4C 4D 41 56 4C 3F 3F 3F 3F AA 0D"

- id: svol_locked
  label: Volume Control: Locked
  kind: action
  command: "S{client_id}SVOL0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 53 56 4F 4C 30 30 30 30 D0 0D"

- id: svol_last_volume
  label: Volume Control: Last Volume
  kind: action
  command: "S{client_id}SVOL0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 53 56 4F 4C 30 30 30 31 CF 0D"

- id: svol_ac_reset
  label: Volume Control: AC Reset
  kind: action
  command: "S{client_id}SVOL0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 53 56 4F 4C 30 30 30 32 CE 0D"

- id: svol_standby_reset
  label: Volume Control: Standby Reset
  kind: action
  command: "S{client_id}SVOL0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 53 56 4F 4C 30 30 30 33 CD 0D"

- id: svol_query
  label: Query Volume Control
  kind: query
  command: "Q{client_id}SVOL????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Locked 1=Last Volume 2=AC Reset 3=Standby Reset. Generic HEX: 51 41 4C 4C 53 56 4F 4C 3F 3F 3F 3F 96 0D"

- id: vlfl_set
  label: Set Volume Locked Level
  kind: action
  command: "S{client_id}VLFL{value}{checksum}<CR>"
  params:
    - name: client_id
      type: string
    - name: value
      type: string
      description: "4-hex-digit value 0000-0100 (0-100 decimal)"
  notes: "Generic HEX example at 0x10: 53 41 4C 4C 56 4C 46 4C 30 30 31 30 DF 0D"

- id: vlfl_query
  label: Query Volume Locked Level
  kind: query
  command: "Q{client_id}VLFL????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0-100. Generic HEX: 51 41 4C 4C 56 4C 46 4C 3F 3F 3F 3F A6 0D"

- id: rmot_enable
  label: Remote Key: Enable
  kind: action
  command: "S{client_id}RMOT0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 52 4D 4F 54 30 30 30 30 D2 0D"

- id: rmot_disable
  label: Remote Key: Disable
  kind: action
  command: "S{client_id}RMOT0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 52 4D 4F 54 30 30 30 31 D1 0D"

- id: rmot_partial
  label: Remote Key: Partial
  kind: action
  command: "S{client_id}RMOT0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 52 4D 4F 54 30 30 30 32 D0 0D"

- id: rmot_query
  label: Query Remote Key
  kind: query
  command: "Q{client_id}RMOT????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Enable 1=Disable 2=Partial. Generic HEX: 51 41 4C 4C 52 4D 4F 54 3F 3F 3F 3F 98 0D"

- id: panl_enable
  label: Panel Key: Enable
  kind: action
  command: "S{client_id}PANL0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 41 4E 4C 30 30 30 30 E9 0D"

- id: panl_disable
  label: Panel Key: Disable
  kind: action
  command: "S{client_id}PANL0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 41 4E 4C 30 30 30 31 E8 0D"

- id: panl_query
  label: Query Panel Key
  kind: query
  command: "Q{client_id}PANL????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Enable 1=Disable. Generic HEX: 51 41 4C 4C 50 41 4E 4C 3F 3F 3F 3F AF 0D"

- id: menu_enable
  label: Menu Access: Enable
  kind: action
  command: "S{client_id}MENU0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4D 45 4E 55 30 30 30 30 DF 0D"

- id: menu_disable
  label: Menu Access: Disable
  kind: action
  command: "S{client_id}MENU0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4D 45 4E 55 30 30 30 31 DE 0D"

- id: menu_query
  label: Query Menu Access
  kind: query
  command: "Q{client_id}MENU????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Enable 1=Disable. Generic HEX: 51 41 4C 4C 4D 45 4E 55 3F 3F 3F 3F A5 0D"

- id: avmn_disable
  label: AV Setting Menu: Disable
  kind: action
  command: "S{client_id}AVMN0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 56 4D 4E 30 30 30 30 E2 0D"

- id: avmn_enable
  label: AV Setting Menu: Enable
  kind: action
  command: "S{client_id}AVMN0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 41 56 4D 4E 30 30 30 31 E1 0D"

- id: avmn_query
  label: Query AV Setting Menu
  kind: query
  command: "Q{client_id}AVMN????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Disable 1=Enable. Generic HEX: 51 41 4C 4C 41 56 4D 4E 3F 3F 3F 3F A8 0D"

- id: osd_enable
  label: OSD Mode: Enable
  kind: action
  command: "S{client_id}OSD#0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4F 53 44 23 30 30 30 30 0B 0D"

- id: osd_disable
  label: OSD Mode: Disable
  kind: action
  command: "S{client_id}OSD#0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 4F 53 44 23 30 30 30 31 0A 0D"

- id: osd_query
  label: Query OSD Mode
  kind: query
  command: "Q{client_id}OSD#????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Enable 1=Disable. Generic HEX: 51 41 4C 4C 4F 53 44 23 3F 3F 3F 3F D1 0D"

- id: inpm_locked
  label: Input Mode: Locked
  kind: action
  command: "S{client_id}INPM0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 4D 30 30 30 30 E0 0D"

- id: inpm_selectable
  label: Input Mode: Selectable
  kind: action
  command: "S{client_id}INPM0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 4D 30 30 30 31 DF 0D"

- id: inpm_ac_reset
  label: Input Mode: AC Reset
  kind: action
  command: "S{client_id}INPM0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 4D 30 30 30 32 DE 0D"

- id: inpm_standby_reset
  label: Input Mode: Standby Reset
  kind: action
  command: "S{client_id}INPM0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 49 4E 50 4D 30 30 30 33 DD 0D"

- id: inpm_query
  label: Query Input Mode
  kind: query
  command: "Q{client_id}INPM????{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Returns 0=Locked 1=Selectable 2=AC Reset 3=Standby Reset. Generic HEX: 51 41 4C 4C 49 4E 50 4D 3F 3F 3F 3F A6 0D"

- id: pois_last
  label: Power On Input: Last
  kind: action
  command: "S{client_id}POIS0000{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 30 D9 0D"

- id: pois_air
  label: Power On Input: Air
  kind: action
  command: "S{client_id}POIS0001{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 31 D8 0D"

- id: pois_av
  label: Power On Input: AV
  kind: action
  command: "S{client_id}POIS0002{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 32 D7 0D"

- id: pois_component
  label: Power On Input: Component
  kind: action
  command: "S{client_id}POIS0003{checksum}<CR>"
  params:
    - name: client_id
      type: string
  notes: "Generic HEX: 53 41 4C 4C 50 4F 49 53 30 30 30 33 D6 0D"

# UNRESOLVED: source table is truncated at POIS with POIS0000..0003 enumerated; the
# remaining POIS values for HDMI1..4, VGA, USB, and HDMI5 are present in the source
# under "POWER ON INPUT SELECTION" but the row is cut off in the refined doc.
# Adding only what is explicitly present.
```

## Feedbacks
```yaml
- id: ack_status
  type: enum
  values: [OKAY, EROR, WAIT]
  description: "Acknowledgement status returned by the TV in the [ACK] field of the response frame"
- id: power_state
  type: enum
  values: [standby, on]
  description: "Power state, returned from POWR???? if exposed; source exposes only PWRE (power-on enable) query"
- id: input_source
  type: enum
  values: [TV, AV, Component, HDMI1, HDMI2, HDMI3, HDMI4, VGA]
  description: "Current input source, from INPT???? return value (1/4/3/9/10/11/12/6)"
- id: picture_mode
  type: enum
  values: [Standard, Vivid, EnergySaving, Theater, Game, Sport]
  description: "Current picture mode, from PMOD???? return value (0/2/3/4/5/6)"
- id: aspect_ratio
  type: enum
  values: [Auto, Normal, Zoom, Wide, Direct, 1:1, Panoramic, Cinema]
  description: "Current aspect ratio, from ASPT???? return value (0/2/3/4/5/6/7/8)"
- id: color_temp
  type: enum
  values: [High, Middle, Mid-Low, Low]
  description: "Current color temperature, from CTEM???? return value (0/2/3/4)"
- id: sound_mode
  type: enum
  values: [Standard, Theater, Music, Speech, Late_night]
  description: "Current sound mode, from AMOD???? return value (0/2/3/4/5)"
- id: mute_state
  type: enum
  values: [off, on]
  description: "Current mute state, from MUTE???? return value (0/1)"
- id: tv_speaker_state
  type: enum
  values: [off, on]
  description: "Current TV speaker state, from ASPK???? return value (0/2)"
- id: tuner_mode
  type: enum
  values: [Antenna, Cable]
  description: "Current tuner mode, from TUNR???? return value (0/2)"
- id: caption_state
  type: enum
  values: [off, on, on_when_mute]
  description: "Closed caption state, from CC##???? return value (0/2/3)"
- id: osd_language
  type: enum
  values: [English, Espanol, Francais]
  description: "OSD language, from LANG???? return value (0/2/3)"
- id: standby_led
  type: enum
  values: [off, on]
  description: "Standby LED state, from PLED???? return value (0/2)"
- id: brightness
  type: integer
  description: "Brightness value 0-100, from BRIT???? return value"
- id: contrast
  type: integer
  description: "Contrast value 0-100, from CONT???? return value"
- id: color_saturation
  type: integer
  description: "Color saturation 0-100, from COLR???? return value"
- id: tint
  type: integer
  description: "Tint value 0-100, from TINT???? return value"
- id: sharpness
  type: integer
  description: "Sharpness value 0-20, from SHRP???? return value"
- id: backlight
  type: integer
  description: "Backlight value 0-100, from BKLV???? return value"
- id: volume
  type: integer
  description: "Volume 0-100, from VOLM???? return value"
- id: volume_range
  type: integer
  description: "Volume range 0-100, from MAVL???? return value"
- id: volume_locked_level
  type: integer
  description: "Volume locked level 0-100, from VLFL???? return value"
- id: volume_control
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
  description: "Volume control mode, from SVOL???? return value (0/1/2/3)"
- id: remote_key
  type: enum
  values: [enable, disable, partial]
  description: "Remote key lock state, from RMOT???? return value (0/1/2)"
- id: panel_key
  type: enum
  values: [enable, disable]
  description: "Panel key lock state, from PANL???? return value (0/1)"
- id: menu_access
  type: enum
  values: [enable, disable]
  description: "Menu access lock, from MENU???? return value (0/1)"
- id: av_setting_menu
  type: enum
  values: [disable, enable]
  description: "AV setting menu access, from AVMN???? return value (0/1)"
- id: osd_mode
  type: enum
  values: [enable, disable]
  description: "OSD display mode, from OSD#???? return value (0/1)"
- id: input_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
  description: "Input mode behavior, from INPM???? return value (0/1/2/3)"
- id: power_off_control
  type: enum
  values: [ac_only, all]
  description: "Power off control mode, from PBTN???? return value (0/1)"
- id: overscan
  type: enum
  values: [on, off]
  description: "Overscan state, from OVSN???? return value (0/2)"
```

## Variables
```yaml
- id: brit_value
  type: integer
  range: [0, 100]
  description: "Brightness 0-100, encoded as 4-hex-digit string 0000-0100 in BRIT command"
- id: cont_value
  type: integer
  range: [0, 100]
  description: "Contrast 0-100, encoded as 0000-0100 in CONT command"
- id: colr_value
  type: integer
  range: [0, 100]
  description: "Color saturation 0-100, encoded as 0000-0100 in COLR command"
- id: tint_value
  type: integer
  range: [0, 100]
  description: "Tint 0-100, encoded as 0000-0100 in TINT command"
- id: shrp_value
  type: integer
  range: [0, 20]
  description: "Sharpness 0-20, encoded as 0000-0020 in SHRP command"
- id: bklv_value
  type: integer
  range: [0, 100]
  description: "Backlight 0-100, encoded as 0000-0100 in BKLV command"
- id: volm_value
  type: integer
  range: [0, 100]
  description: "Volume 0-100, encoded as 0000-0100 in VOLM command"
- id: mavl_value
  type: integer
  range: [0, 100]
  description: "Volume range 0-100, encoded as 0000-0100 in MAVL command"
- id: vlfl_value
  type: integer
  range: [0, 100]
  description: "Volume locked level 0-100, encoded as 0000-0100 in VLFL command"
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the TV.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences; each command must be issued individually.
# UNRESOLVED: source example shows power-on requires PWRE=1 then POWR=1, but this is a documented sequence not a device-stored macro.
```

## Safety
```yaml
confirmation_required_for:
  - rset9999_factory_reset  # source: "Restore Factory Settings" - explicit factory reset
interlocks: []
# UNRESOLVED: no further safety warnings, interlock procedures, or power-on sequencing
# requirements are documented beyond the PWRE prerequisite for standby wake.
```

## Notes
- The protocol is case sensitive.
- To enable RS-232 control the TV must be configured: Quick Settings menu, then numeric string `7 3 1 0` to access the Custom Install menu, then `Custom Installation` set to `Enable`.
- The `PWRE` (Remote Power On) setting must be `Enable` for the TV to power on from standby via serial. `PWRE` query is not available in standby mode.
- CLIENT_ID is the last 3 bytes of the TV's MAC address, `ALL` for broadcast, or a value selected in the TV menu. Find the MAC at Menu > Network > Network Information.
- Checksum is the 8-bit sum such that the total string (including checksum byte) equals zero.
- Multi-TV control is supported via MAC-specific client IDs and broadcast `ALL` client ID.
- The source's `BTTN` commands (remote control button simulator) all carry a "1" prefix per REVISION V3.1.
- The refined source is truncated mid-way through the `POIS` (Power On Input Selection) command table; subsequent POIS rows for HDMI1..4, VGA, USB, HDMI5 are not included in the spec.

<!-- UNRESOLVED: source document revision is V3.6 (17-Apr-2017); applicability to the 85U75N chassis (a 2024 model) is not confirmed. -->
<!-- UNRESOLVED: source lists "Prosumer TV" without enumerating 85U75N as a supported model. -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-06-02T01:56:39.285Z
last_checked_at: 2026-05-14T18:17:16.657Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.657Z
matched_actions: 30
action_count: 39
confidence: medium
summary: "All 30 spec actions and 17 feedback entries map to literal commands in source; transport parameters verified; complete RS-232 command coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document lists \"Prosumer TV\" without enumerating the 85U75N as a supported model; the REVISION NOTES do not reference the 85U75N chassis."
- "serial port number, baud rate beyond 9600, parity, and stop bits are the only transport parameters stated. No TCP/IP control is documented."
- "source table is truncated at POIS with POIS0000..0003 enumerated; the"
- "source does not document unsolicited notifications from the TV."
- "source does not document multi-step macro sequences; each command must be issued individually."
- "source example shows power-on requires PWRE=1 then POWR=1, but this is a documented sequence not a device-stored macro."
- "no further safety warnings, interlock procedures, or power-on sequencing"
- "source document revision is V3.6 (17-Apr-2017); applicability to the 85U75N chassis (a 2024 model) is not confirmed."
- "source lists \"Prosumer TV\" without enumerating 85U75N as a supported model."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
