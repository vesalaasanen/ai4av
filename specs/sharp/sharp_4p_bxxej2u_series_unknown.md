---
spec_id: admin/sharp-4p-bxxej2u-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp 4P BxxEJ2U Series Control Spec"
manufacturer: Sharp
model_family: "4P BxxEJ2U Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "4P BxxEJ2U Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.aws.sharp.eu
  - manualslib.com
  - assets.sharpnecdisplays.us
source_urls:
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/External_Control_ME2_Series_EN_Rev1.4.pdf
  - "https://www.manualslib.com/manual/3921793/Sharp-Aquos-4p-B86ej2u.html?page=55"
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4p-b-series_emanual.pdf
retrieved_at: 2026-06-11T00:05:07.559Z
last_checked_at: 2026-06-11T13:44:56.147Z
generated_at: 2026-06-11T13:44:56.147Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated in source"
  - "flow control not stated in source"
  - "HTTP base URL not applicable (raw TCP)"
  - "source does not document explicit safety warnings, interlocks, or"
  - "device family is \"4P BxxEJ2U Series\" (per spec_id); source document title says \"NEC LCD monitor\". The two may differ - flag for verification."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:44:56.147Z
  matched_actions: 133
  action_count: 133
  confidence: medium
  summary: "All 133 spec actions (28 CTL + 105 VCP) confirmed verbatim in source command tables; transport parameters match; complete bilateral coverage 133/133. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Sharp 4P BxxEJ2U Series Control Spec

## Summary
External control spec for the Sharp 4P BxxEJ2U Series LCD monitor (NEC-derived protocol). Covers RS-232C (9-pin D-sub, 9600/8/N/1) and LAN (TCP, port 7142) transports, plus a framed VCP/CTL command protocol with SOH/STX/ETX/CR framing, XOR BCC checksum, and ASCII-encoded hex payloads. Commands drive power, input select, picture/audio/OSD, schedule, lock, network, and self-diagnosis functions.

<!-- UNRESOLVED: firmware version not stated in source -->

## Transport
```yaml
# Source: section 2.1 RS-232C, 2.2 LAN, 3.1 RS-232C, 3.2 LAN
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: 7142  # LAN: communication system "7142 (Fixed)"; TCP layer
  base_url: ""  # UNRESOLVED: HTTP base URL not applicable (raw TCP)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
powerable: true  # inferred from CTL-C203-D6 Power control and CTL-01D6 Power status read
queryable: true  # inferred from Get VCP, Get Timing, F/W read, Serial read, Model read, MAC read commands
routable: true  # inferred from VCP 00h/60h, 11h/06h Input Source Select and Schedule input switching
levelable: true  # inferred from VCP volume/treble/bass/balance/backlight/contrast/brightness commands
```

## Actions
```yaml
# Each entry corresponds to one command-bearing row in the source CTL table (5.1) and
# the VCP table (6.1). VCP entries are listed under "id: vcp_<page>_<op>" to keep them
# individually addressable; each is a separate row in the source.
#
# All commands share the wire format: SOH(01h) Reserved(30h) Destination Source Type
# LengthHi LengthLo STX ...Message... ETX(03h) BCC CR(0Dh). See sections 4-4.4.

# ===== CTL commands (section 5) =====

- id: ctl_07_get_timing
  label: CTL-07 Get Timing Report
  kind: query
  command: "01 30 41 30 30 30 30 32 30 37 30 33 <BCC> 0D"  # SOH,'0','A','0','0',Len,STX,'0','7',ETX,BCC,CR
  params: []
  notes: |
    Message: STX '0''7' ETX. Reply (5.2.1) returns H Freq / V Freq (4 ASCII hex bytes each, 0.01kHz / 0.01Hz units).

- id: ctl_0c_save_settings
  label: CTL-0C Save Current Settings
  kind: action
  command: "01 30 41 30 30 30 30 32 30 43 30 33 <BCC> 0D"  # STX '0''C' ETX
  params: []
  notes: "Persists current settings to EEPROM. Reply command code: '0''0''0''C' (30h 30h 30h 43h)."

- id: ctl_b1_self_diagnosis
  label: CTL-B1 Self-diagnosis status read
  kind: query
  command: "01 30 41 30 30 30 30 32 42 31 30 33 <BCC> 0D"  # STX 'B''1' ETX
  params: []
  notes: |
    Reply: STX 'A''1' <status codes> ETX. Error codes (ASCII pairs):
    'A''0' temperature shutdown, 'A''1' temperature half-brightness,
    'B''0' NO SIGNAL, 'E''0' system/EEPROM error. '0''0' = no error.

- id: ctl_be_null_message
  label: CTL-BE NULL Message
  kind: action
  command: "01 30 41 30 30 30 30 32 42 45 30 33 <BCC> 0D"  # STX 'B''E' ETX
  params: []
  notes: "Monitor-initiated reply for unsupported CTL or non-executable state. See 5.2.4."

- id: ctl_01d6_power_status
  label: CTL-01D6 Power status read
  kind: query
  command: "01 30 41 30 30 30 30 32 30 31 44 36 30 33 <BCC> 0D"  # STX '0''1''D''6' ETX
  params: []
  notes: |
    Reply (5.2.5): STX '0''2' ResultCode 'D''6' '0''0''0''4' PowerStatus ETX.
    Result: '0''0' ok / '0''1' error.
    PowerStatus: '0''0''0''1' on, '0''0''0''2' power save, '0''0''0''3' reserved, '0''0''0''4' off.

- id: ctl_c203_d6_power_control
  label: CTL-C203-D6 Power control
  kind: action
  command: "01 30 41 30 30 30 30 32 43 32 30 33 44 36 <state> 30 33 <BCC> 0D"
  params:
    - name: state
      type: string
      description: '4 ASCII hex bytes. "0''0''0''1" (30303031) = power on, "0''0''0''4" (30303034) = power off.'
  notes: "Section 5.2.6. Wait ~15 seconds before next command after power on/off."

- id: ctl_c03f_fw_revision_read
  label: CTL-C03F F/W Revision Read Request
  kind: query
  command: "01 30 41 30 30 30 30 32 43 30 33 46 30 33 <BCC> 0D"  # STX 'C''0''3''F' ETX
  params: []
  notes: "Reply command code: 'C''1''3''F'. FW string returned via per-character mapping (5.2.7 table)."

- id: ctl_c211_date_time_read
  label: CTL-C211 Date & Time Read
  kind: query
  command: "01 30 41 30 30 30 30 32 43 32 31 31 30 33 <BCC> 0D"  # STX 'C''2''1''1' ETX
  params: []
  notes: "Reply command code: 'C''3''1''1'. Returns Y/M/D/Weekday/Hour/Min ASCII pairs (year offset 2000)."

- id: ctl_c212_date_time_write
  label: CTL-C212 Date & Time Write
  kind: action
  command: "01 30 41 30 30 30 30 32 43 32 31 32 <YY> <MM> <DD> <WK> <HH> <MN> 30 30 30 33 <BCC> 0D"
  params:
    - name: YY
      type: string
      description: "Year offset 2000 as 2 ASCII hex bytes (e.g. '1''7' = 2023)."
    - name: MM
      type: string
      description: "Month as 2 ASCII hex bytes (01-0C)."
    - name: DD
      type: string
      description: "Day as 2 ASCII hex bytes (01-1F)."
    - name: WK
      type: string
      description: "Weekday 00-06 (Sun..Sat)."
    - name: HH
      type: string
      description: "Hour 00-17 (00-23)."
    - name: MN
      type: string
      description: "Minute 00-3B (00-59)."
  notes: "Reply command code: 'C''3''1''2'. Result code 00h/01h."

- id: ctl_c216_serial_read
  label: CTL-C216 Serial No. Read
  kind: query
  command: "01 30 41 30 30 30 30 32 43 32 31 36 30 33 <BCC> 0D"  # STX 'C''2''1''6' ETX
  params: []
  notes: "Reply command code: 'C''3''1''6'. Serial string encoded via per-character mapping (5.2.10)."

- id: ctl_c217_model_name_read
  label: CTL-C217 Model Name Read
  kind: query
  command: "01 30 41 30 30 30 30 32 43 32 31 37 30 33 <BCC> 0D"  # STX 'C''2''1''7' ETX
  params: []
  notes: "Reply command code: 'C''3''1''7'. Model string encoded via per-character mapping (5.2.11)."

- id: ctl_c21d_security_lock
  label: CTL-C21D Security Lock Control
  kind: action
  command: "01 30 41 30 30 30 30 32 43 32 31 44 <mode> <d1> <d2> <d3> <d4> 30 33 <BCC> 0D"
  params:
    - name: mode
      type: string
      description: "Mode bits as 2 ASCII hex bytes. bit0 start-up lock, bit1 control lock, bit2 lock admin setting. e.g. '0''1' start-up only, '0''3' start-up+control, '0''4' admin lock."
    - name: d1
      type: string
      description: "4-digit passcode digit 1 as 2 ASCII hex bytes (00-09)."
    - name: d2
      type: string
      description: "4-digit passcode digit 2 as 2 ASCII hex bytes (00-09)."
    - name: d3
      type: string
      description: "4-digit passcode digit 3 as 2 ASCII hex bytes (00-09)."
    - name: d4
      type: string
      description: "4-digit passcode digit 4 as 2 ASCII hex bytes (00-09)."
  notes: |
    Only works for 4-digit passcode; other lengths return error. Reply command code: 'C''3''1''D'.

- id: ctl_c220_mac_address_read
  label: CTL-C220 MAC Address Read
  kind: query
  command: "01 30 41 30 30 30 30 32 43 32 32 30 30 30 30 33 <BCC> 0D"  # STX 'C''2''2''0' '0''0' ETX
  params: []
  notes: |
    Reply command code: 'C''3''2''0'. 6th-7th byte is Select Device ('0''0' for single MAC).
    Returns 12 ASCII hex chars representing MAC octets (5.2.13).

- id: ctl_c22b_0e_04_ping
  label: CTL-C22B-0E-04 Ping Command (IPv4)
  kind: action
  command: "01 30 41 30 30 30 30 32 43 32 32 42 30 45 30 34 <o1> <o2> <o3> <o4> 30 33 <BCC> 0D"
  params:
    - name: o1
      type: string
      description: "IP octet 1 as 2 ASCII hex bytes (00-FF)."
    - name: o2
      type: string
      description: "IP octet 2 as 2 ASCII hex bytes (00-FF)."
    - name: o3
      type: string
      description: "IP octet 3 as 2 ASCII hex bytes (00-FF)."
    - name: o4
      type: string
      description: "IP octet 4 as 2 ASCII hex bytes (00-FF)."
  notes: "Reply command code 'C''3''1''D'. Result: '0''0' ok, '0''1' ping failed."

- id: ctl_c23d_schedule_read
  label: CTL-C23D Schedule Read
  kind: query
  command: "01 30 41 30 30 30 30 32 43 32 33 44 <prog> 30 33 <BCC> 0D"
  params:
    - name: prog
      type: string
      description: "Program number 00-0E (No.1-No.15) as 2 ASCII hex bytes."
  notes: "Reply command code: 'C''3''3''D'. See 5.2.15 for full 36-byte reply layout."

- id: ctl_c23e_schedule_write
  label: CTL-C23E Schedule Write
  kind: action
  command: "01 30 41 30 30 30 30 32 43 32 33 45 <prog> <event> <hh> <mm> <input> <week> <type> <pm> <yy> <mo> <dd> <ord> <e1> <e2> <e3> 30 33 <BCC> 0D"
  params:
    - name: prog
      type: string
      description: "Program number 00-0E."
    - name: event
      type: string
      description: "Schedule event: '0''1' power on, '0''2' power off, '0''3' reserved, '0''4' reboot."
    - name: hh
      type: string
      description: "Hour 00-17 or '1''8' for default."
    - name: mm
      type: string
      description: "Minute 00-3B or '3''C' for default."
    - name: input
      type: string
      description: "Input terminal: '0''0' last memory, '1''1' HDMI1, '1''2' HDMI2, '8''2' HDMI3, '8''9' USB-C, '8''7' Home."
    - name: week
      type: string
      description: "Day-of-week bit pattern 00-7F (bit0 Mon .. bit6 Sun)."
    - name: type
      type: string
      description: "Schedule type bit pattern. bit2 enables/disables the program."
    - name: pm
      type: string
      description: "Picture mode (don't care; send '0''0')."
    - name: yy
      type: string
      description: "Year (don't care; send '0''0')."
    - name: mo
      type: string
      description: "Month (don't care; send '0''0')."
    - name: dd
      type: string
      description: "Day (don't care; send '0''0')."
    - name: ord
      type: string
      description: "Order (don't care; send '0''0')."
    - name: e1
      type: string
      description: "Ext1 (don't care; send '0''0')."
    - name: e2
      type: string
      description: "Ext2 (don't care; send '0''0')."
    - name: e3
      type: string
      description: "Ext3 (don't care; send '0''0')."
  notes: "Reply command code: 'C''3''3''E'. Result 00h ok / 01h error."

- id: ctl_c23f_schedule_enable
  label: CTL-C23F Enable/Disable Schedule writes
  kind: action
  command: "01 30 41 30 30 30 30 32 43 32 33 46 <prog> <en> 30 33 <BCC> 0D"
  params:
    - name: prog
      type: string
      description: "Program number 00-0D (No.1-No.14)."
    - name: en
      type: string
      description: "'0''0' disable, '0''1' enable, '0''2' delete."
  notes: "Reply command code: 'C''3''3''F'. Result 00h ok / 01h error."

- id: ctl_ca04_00_input_name_read
  label: CTL-CA04-00 Input Name Read Request (current)
  kind: query
  command: "01 30 41 30 30 30 30 32 43 41 30 34 30 30 30 33 <BCC> 0D"  # STX 'C''A''0''4''0''0' ETX
  params: []
  notes: "Reply command code: 'C''B''0''4''0''0'. Max 28 bytes / 14 chars via per-char mapping."

- id: ctl_ca04_01_input_name_write
  label: CTL-CA04-01 Input Name Write Request (current)
  kind: action
  command: "01 30 41 30 30 30 30 32 43 41 30 34 30 31 <encoded name bytes> 30 33 <BCC> 0D"
  params:
    - name: encoded_name
      type: string
      description: "Input name encoded via per-character hex pair table (5.2.18). Max 28 bytes (14 chars)."
  notes: "Reply command code: 'C''B''0''4''0''1' ACK with no body."

- id: ctl_ca04_02_input_name_reset
  label: CTL-CA04-02 Input Name Reset Request (current)
  kind: action
  command: "01 30 41 30 30 30 30 32 43 41 30 34 30 32 30 33 <BCC> 0D"  # STX 'C''A''0''4''0''2' ETX
  params: []
  notes: "Resets name of currently selected input. Reply command code: 'C''B''0''4''0''2' with ResultCode."

- id: ctl_ca04_03_input_name_read_designated
  label: CTL-CA04-03 Input Name Read (Designated Terminal)
  kind: query
  command: "01 30 41 30 30 30 30 32 43 41 30 34 30 33 <term> 30 33 <BCC> 0D"
  params:
    - name: term
      type: string
      description: "Input terminal: '1''1' HDMI1, '1''2' HDMI2, '8''2' HDMI3, '8''9' USB-C, '8''7' HOME."
  notes: "Reply command code: 'C''B''0''4''0''3'. Returns result, terminal echo, encoded name."

- id: ctl_ca04_04_input_name_write_designated
  label: CTL-CA04-04 Input Name Write (Designated Terminal)
  kind: action
  command: "01 30 41 30 30 30 30 32 43 41 30 34 30 34 <term> <encoded name bytes> 30 33 <BCC> 0D"
  params:
    - name: term
      type: string
      description: "Input terminal: '1''1' HDMI1, '1''2' HDMI2, '8''2' HDMI3, '8''9' USB-C, '8''7' HOME."
    - name: encoded_name
      type: string
      description: "Input name encoded via per-character hex pair table. Max 28 bytes."
  notes: "Reply command code: 'C''B''0''4''0''4' with ResultCode."

- id: ctl_ca04_05_input_name_reset_designated
  label: CTL-CA04-05 Input Name Reset (Designated Terminal)
  kind: action
  command: "01 30 41 30 30 30 30 32 43 41 30 34 30 35 <term> 30 33 <BCC> 0D"
  params:
    - name: term
      type: string
      description: "Input terminal: '1''1' HDMI1, '1''2' HDMI2, '8''2' HDMI3, '8''9' USB-C, 'C''0' HOME, 'C''1'-'C''6' Application1-6."
  notes: "Reply command code: 'C''B''0''4''0''5' with ResultCode."

- id: ctl_ca0b_00_power_save_mode_read
  label: CTL-CA0B-00 Power Save Mode Read
  kind: query
  command: "01 30 41 30 30 30 30 32 43 41 30 42 30 30 30 33 <BCC> 0D"  # STX 'C''A''0''B' '0''0' ETX
  params: []
  notes: "Reply command code: 'C''B''0''B'. Power Save Mode: '0''0' ENABLE, '0''1' Not Support, '0''2' DISABLE."

- id: ctl_ca0b_01_power_save_mode_write
  label: CTL-CA0B-01 Power Save Mode Write
  kind: action
  command: "01 30 41 30 30 30 30 32 43 41 30 42 30 31 <mode> 30 33 <BCC> 0D"
  params:
    - name: mode
      type: string
      description: "'0''0' ENABLE, '0''1' Not Support, '0''2' DISABLE."
  notes: "Reply command code: 'C''B''0''B' ACK with ResultCode."

- id: ctl_ca0b_02_auto_power_save_time_read
  label: CTL-CA0B-02 Auto Power Save Time Read
  kind: query
  command: "01 30 41 30 30 30 30 32 43 41 30 42 30 32 30 33 <BCC> 0D"  # STX 'C''A''0''B''0''2' ETX
  params: []
  notes: |
    Reply command code: 'C''B''0''B''0''2'. Time Setting as 2 ASCII hex bytes (1 step = 5 sec),
    e.g. '0''1' = 5 sec, '7''8' = 120 (600 sec).

- id: ctl_ca0b_03_auto_power_save_time_write
  label: CTL-CA0B-03 Auto Power Save Time Write
  kind: action
  command: "01 30 41 30 30 30 30 32 43 41 30 42 30 33 <time> 30 33 <BCC> 0D"
  params:
    - name: time
      type: string
      description: "Time setting 01-78 (1 step = 5 sec) as 2 ASCII hex bytes."
  notes: "Reply command code: 'C''B''0''B''0''3' with ResultCode."

- id: ctl_ca0f_00_get_terminal_list
  label: CTL-CA0F-00 Get Terminal List
  kind: query
  command: "01 30 41 30 30 30 30 32 43 41 30 46 30 30 30 33 <BCC> 0D"  # STX 'C''A''0''F' '0''0' ETX
  params: []
  notes: |
    Reply command code: 'C''B''0''F'. Returns terminal count and list.
    For this model: 5 terminals -> HOME('8''7')/HDMI1('1''1')/HDMI2('1''2')/HDMI3('8''2')/USB-C('8''9').

# ===== VCP commands (section 6) =====
# Each VCP op is enumerated as a separate action keyed on OP code page + op code.
# Parameter value ranges documented in source are noted; the source documents them
# as parameterized ranges inside one opcode, so the params field below covers
# the documented range.

- id: vcp_00_10_backlight
  label: VCP 00h/10h Backlight
  kind: action
  command: "VCP page=00h op=10h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (dark) - 0064H (bright). 16-bit ASCII hex in Set VCP command."
  notes: "Read via Get VCP page=00h op=10h."

- id: vcp_00_12_contrast
  label: VCP 00h/12h Contrast
  kind: action
  command: "VCP page=00h op=12h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (low) - 0064H (high)."
  notes: "Read via Get VCP."

- id: vcp_00_14_color_temp_preset
  label: VCP 00h/14h Color (preset)
  kind: action
  command: "VCP page=00h op=14h"
  params:
    - name: value
      type: string
      description: "0002h Thru, 0009h 10000K, 000Bh Custom. Monitor replies 0009h for other presets."
  notes: "Read via Get VCP."

- id: vcp_00_16_r_gain
  label: VCP 00h/16h R Gain
  kind: action
  command: "VCP page=00h op=16h set value 0000H-00FFH"
  params:
    - name: value
      type: integer
      description: "0000H (dark) - 00FFH (bright)."

- id: vcp_00_18_g_gain
  label: VCP 00h/18h G Gain
  kind: action
  command: "VCP page=00h op=18h set value 0000H-00FFH"
  params:
    - name: value
      type: integer
      description: "0000H-00FFH."

- id: vcp_00_1a_b_gain
  label: VCP 00h/1Ah B Gain
  kind: action
  command: "VCP page=00h op=1Ah set value 0000H-00FFH"
  params:
    - name: value
      type: integer
      description: "0000H-00FFH."

- id: vcp_00_54_color_temperature
  label: VCP 00h/54h Color Temperature
  kind: action
  command: "VCP page=00h op=54h set value 0000H-004AH"
  params:
    - name: value
      type: integer
      description: "0000H (2600K) - 004AH (10000K). 1 step = 100K. Cannot set Thru via this op."

- id: vcp_00_60_input_select
  label: VCP 00h/60h Input Source Select
  kind: action
  command: "VCP page=00h op=60h set value"
  params:
    - name: value
      type: string
      description: "0011h HDMI1, 0012h HDMI2, 0082h HDMI3, 0089h USB-C, 0087h Home."

- id: vcp_00_62_volume
  label: VCP 00h/62h Audio Volume
  kind: action
  command: "VCP page=00h op=62h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (small) - 0064H (big)."

- id: vcp_00_68_language
  label: VCP 00h/68h Language
  kind: action
  command: "VCP page=00h op=68h set value"
  params:
    - name: value
      type: string
      description: "0000H none, 0001H English, 0002H German, 0003H French, 0004H Spanish, 0005H Japanese, 0006H Italian, 0007H Swedish, 0009H Russian, 000EH Chinese."

- id: vcp_00_87_sharpness
  label: VCP 00h/87h Sharpness
  kind: action
  command: "VCP page=00h op=87h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (soft) - 0064H (sharp)."

- id: vcp_00_8a_color
  label: VCP 00h/8Ah Color
  kind: action
  command: "VCP page=00h op=8Ah set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (pale) - 0064H (deep)."

- id: vcp_00_8c_sharpness_alt
  label: VCP 00h/8Ch Sharpness (alt)
  kind: action
  command: "VCP page=00h op=8Ch set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "Same range as 00h/87h."
  notes: "Alias of 00h/87h per source."

- id: vcp_00_8d_mute
  label: VCP 00h/8Dh Audio Mute
  kind: action
  command: "VCP page=00h op=8Dh set value"
  params:
    - name: value
      type: string
      description: "0000H un mute, 0001H mute, 0002H un mute."

- id: vcp_00_8f_treble
  label: VCP 00h/8Fh Audio Treble
  kind: action
  command: "VCP page=00h op=8Fh set value 0000H-000AH"
  params:
    - name: value
      type: integer
      description: "0000H (de-emphasized) - 000AH (emphasized)."

- id: vcp_00_91_bass
  label: VCP 00h/91h Audio Bass
  kind: action
  command: "VCP page=00h op=91h set value 0000H-000AH"
  params:
    - name: value
      type: integer
      description: "0000H-000AH."

- id: vcp_00_92_video_black_level
  label: VCP 00h/92h Video Black Level
  kind: action
  command: "VCP page=00h op=92h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (dark) - 0064H (bright)."

- id: vcp_00_93_balance
  label: VCP 00h/93h Audio Balance
  kind: action
  command: "VCP page=00h op=93h set value 0000H-0032H"
  params:
    - name: value
      type: integer
      description: "0000H (L50) - 0019H (center) - 0032H (R50). 1 step = 2."

- id: vcp_00_9b_6axis_red
  label: VCP 00h/9Bh 6-axis Red
  kind: action
  command: "VCP page=00h op=9Bh set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (to magenta) - 0064H (to yellow). 1 step = 2."

- id: vcp_00_9c_6axis_yellow
  label: VCP 00h/9Ch 6-axis Yellow
  kind: action
  command: "VCP page=00h op=9Ch set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (to red) - 0064H (to green). 1 step = 2."

- id: vcp_00_9d_6axis_green
  label: VCP 00h/9Dh 6-axis Green
  kind: action
  command: "VCP page=00h op=9Dh set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (to yellow) - 0064H (to cyan). 1 step = 2."

- id: vcp_00_9e_6axis_cyan
  label: VCP 00h/9Eh 6-axis Cyan
  kind: action
  command: "VCP page=00h op=9Eh set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (to green) - 0064H (to blue). 1 step = 2."

- id: vcp_00_9f_6axis_blue
  label: VCP 00h/9Fh 6-axis Blue
  kind: action
  command: "VCP page=00h op=9Fh set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (to cyan) - 0064H (to magenta). 1 step = 2."

- id: vcp_00_a0_6axis_magenta
  label: VCP 00h/A0h 6-axis Magenta
  kind: action
  command: "VCP page=00h op=A0h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (to blue) - 0064H (to red). 1 step = 2."

- id: vcp_00_d6_power_status
  label: VCP 00h/D6h Power status (read only)
  kind: query
  command: "VCP page=00h op=D6h get"
  params: []
  notes: "Read only. 0001h on, 0002h power save, 0003h reserved, 0004h off."

- id: vcp_00_e1_power_save
  label: VCP 00h/E1h Power save
  kind: action
  command: "VCP page=00h op=E1h set value"
  params:
    - name: value
      type: string
      description: "0000h DISABLE, 0001h ENABLE."

- id: vcp_00_fc_osd_time
  label: VCP 00h/FCh OSD time
  kind: action
  command: "VCP page=00h op=FCh set value"
  params:
    - name: value
      type: string
      description: "0000H ignored, 0001H ignored, 0002H-0030H (10s - 240s)."

- id: vcp_02_1a_picture_mode
  label: VCP 02h/1Ah Picture mode
  kind: action
  command: "VCP page=02h op=1Ah set value"
  params:
    - name: value
      type: string
      description: "0003H HIGHBRIGHT, 0008H CUSTOM1, 001CH RETAIL, 001DH CONFERENCING, 001EH TRANSPORTATION, 001FH NATIVE."

- id: vcp_02_1f_color
  label: VCP 02h/1Fh Color
  kind: action
  command: "VCP page=02h op=1Fh set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "Alias of 00h/8Ah."

- id: vcp_02_3d_information_osd
  label: VCP 02h/3Dh Information OSD
  kind: action
  command: "VCP page=02h op=3Dh set value"
  params:
    - name: value
      type: string
      description: "0000H OFF, 0001H ON."

- id: vcp_02_3e_monitor_id
  label: VCP 02h/3Eh Monitor ID
  kind: action
  command: "VCP page=02h op=3Eh set value 0001H-0019H"
  params:
    - name: value
      type: integer
      description: "0001H-0019H (1-25)."

- id: vcp_02_40_auto_input_change
  label: VCP 02h/40h Auto Input Change
  kind: action
  command: "VCP page=02h op=40h set value"
  params:
    - name: value
      type: string
      description: "0000H FIRST DETECT, 0001H LAST DETECT, 0002H NONE, 0004H CUSTOM DETECT."

- id: vcp_02_41_screen_rotation
  label: VCP 02h/41h Screen Rotation
  kind: action
  command: "VCP page=02h op=41h set value"
  params:
    - name: value
      type: string
      description: "0000H LANDSCAPE, 0001H PORTRAIT, 0003H 180 degree."

- id: vcp_02_68_gamma
  label: VCP 02h/68h Gamma
  kind: action
  command: "VCP page=02h op=68h set value"
  params:
    - name: value
      type: string
      description: "0001H NATIVE, 0004H 2.2, 0005H DICOM SIM., 0006H PROGRAMABLE, 0007H S GAMMA, 0008H 2.4."

- id: vcp_02_6f_aspect_zoom
  label: VCP 02h/6Fh Aspect - zoom
  kind: action
  command: "VCP page=02h op=6Fh set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H-00C9H (100% - 300%)."

- id: vcp_02_70_aspect
  label: VCP 02h/70h Aspect
  kind: action
  command: "VCP page=02h op=70h set value"
  params:
    - name: value
      type: string
      description: "0001H Normal, 0002H Full, 0003H Wide, 0004H Zoom, 0007H OFF(1:1)."

- id: vcp_02_79_temperature
  label: VCP 02h/79h Temperature (read)
  kind: query
  command: "VCP page=02h op=79h get"
  params: []
  notes: "0000H-FFFFH, 1 step = 0.5 C. Two's complement for negative. Sensor selected by 02h/78h."

- id: vcp_02_8d_adaptive_contrast
  label: VCP 02h/8Dh Adaptive Contrast
  kind: action
  command: "VCP page=02h op=8Dh set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H Low, 0004H High."

- id: vcp_02_b4_als_illuminance
  label: VCP 02h/B4h ALS Illuminance (read only)
  kind: query
  command: "VCP page=02h op=B4h get"
  params: []
  notes: "0000H-FFFFH, read only."

- id: vcp_02_be_power_indicator
  label: VCP 02h/BEh Power Indicator
  kind: action
  command: "VCP page=02h op=BEh set value"
  params:
    - name: value
      type: string
      description: "0001h ON, 0002h OFF."

- id: vcp_02_cb_menu_tree_reset
  label: VCP 02h/CBh Menu Tree Reset
  kind: action
  command: "VCP page=02h op=CBh set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H All(factory reset), 0002H Picture, 0004H Audio, 0010H Network, 0011H Protect, 0012H System, 0013H Input & Output, 0014H Setup, 0015H Application."

- id: vcp_02_d0_tile_h
  label: VCP 02h/D0h Tile Matrix H Monitors
  kind: action
  command: "VCP page=02h op=D0h set value 0001H-0005H"
  params:
    - name: value
      type: integer
      description: "0001H-0005H (1-5)."

- id: vcp_02_d1_tile_v
  label: VCP 02h/D1h Tile Matrix V Monitors
  kind: action
  command: "VCP page=02h op=D1h set value 0001H-0005H"
  params:
    - name: value
      type: integer
      description: "0001H-0005H (1-5)."

- id: vcp_02_d2_tile_position
  label: VCP 02h/D2h Tile Matrix Position
  kind: action
  command: "VCP page=02h op=D2h set value 0001H-0019H"
  params:
    - name: value
      type: integer
      description: "0001H-0019H (1-25)."

- id: vcp_02_d3_tile_confirm
  label: VCP 02h/D3h Tile Matrix Confirm Settings
  kind: action
  command: "VCP page=02h op=D3h set value"
  params:
    - name: value
      type: string
      description: "0001H Disable(off), 0002H Enable(on)."

- id: vcp_02_d5_tile_comp
  label: VCP 02h/D5h Tile Comp
  kind: action
  command: "VCP page=02h op=D5h set value"
  params:
    - name: value
      type: string
      description: "0001H NO, 0002H YES."

- id: vcp_02_d8_power_on_delay
  label: VCP 02h/D8h Power on delay time
  kind: action
  command: "VCP page=02h op=D8h set value 0000H-0032H"
  params:
    - name: value
      type: integer
      description: "0000H (0 sec) - 0032H (50 sec)."

- id: vcp_10_10_carbon_savings_g
  label: VCP 10h/10h Carbon Savings (g) (read)
  kind: query
  command: "VCP page=10h op=10h get"
  params: []
  notes: "0000H-03E7H, read only."

- id: vcp_10_11_carbon_savings_kg
  label: VCP 10h/11h Carbon Savings (kg) (read)
  kind: query
  command: "VCP page=10h op=11h get"
  params: []
  notes: "0000H-FFFFH, read only."

- id: vcp_10_26_carbon_usage_g
  label: VCP 10h/26h Carbon Usage (g) (read)
  kind: query
  command: "VCP page=10h op=26h get"
  params: []
  notes: "0000H-03E7H, read only."

- id: vcp_10_27_carbon_usage_kg
  label: VCP 10h/27h Carbon Usage (kg) (read)
  kind: query
  command: "VCP page=10h op=27h get"
  params: []
  notes: "0000H-FFFFH, read only."

- id: vcp_10_28_carbon_savings_g_unreset
  label: VCP 10h/28h Carbon Savings (g) unresettable (read)
  kind: query
  command: "VCP page=10h op=28h get"
  params: []
  notes: "Returns same as 10h/10h."

- id: vcp_10_29_carbon_savings_kg_unreset
  label: VCP 10h/29h Carbon Savings (kg) unresettable (read)
  kind: query
  command: "VCP page=10h op=29h get"
  params: []
  notes: "Returns same as 10h/11h."

- id: vcp_10_2a_carbon_usage_g_unreset
  label: VCP 10h/2Ah Carbon Usage (g) unresettable (read)
  kind: query
  command: "VCP page=10h op=2Ah get"
  params: []
  notes: "Returns same as 10h/26h."

- id: vcp_10_2b_carbon_usage_kg_unreset
  label: VCP 10h/2Bh Carbon Usage (kg) unresettable (read)
  kind: query
  command: "VCP page=10h op=2Bh get"
  params: []
  notes: "Returns same as 10h/27h."

- id: vcp_10_2e_auto_input_priority1
  label: VCP 10h/2Eh Auto Input Change Priority 1
  kind: action
  command: "VCP page=10h op=2Eh set value"
  params:
    - name: value
      type: string
      description: "0000H ---, 0011H HDMI1, 0012H HDMI2, 0082H HDMI3, 0089H USB-C, 0087H Home."

- id: vcp_10_2f_auto_input_priority2
  label: VCP 10h/2Fh Auto Input Change Priority 2
  kind: action
  command: "VCP page=10h op=2Fh set value"
  params:
    - name: value
      type: string
      description: "Same enum as 10h/2Eh."

- id: vcp_10_30_auto_input_priority3
  label: VCP 10h/30h Auto Input Change Priority 3
  kind: action
  command: "VCP page=10h op=30h set value"
  params:
    - name: value
      type: string
      description: "Same enum as 10h/2Eh."

- id: vcp_10_33_als_in_bright_backlight
  label: VCP 10h/33h ALS In-Bright Backlight
  kind: action
  command: "VCP page=10h op=33h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (dark) - 0064H (bright)."

- id: vcp_10_34_als_in_dark_backlight
  label: VCP 10h/34h ALS In-Dark Backlight
  kind: action
  command: "VCP page=10h op=34h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H-0064H."

- id: vcp_10_40_video_range
  label: VCP 10h/40h Video Range
  kind: action
  command: "VCP page=10h op=40h set value"
  params:
    - name: value
      type: string
      description: "0001H EXPANDED SIGNAL, 0002H RAW SIGNAL, 0003H AUTO."

- id: vcp_10_75_human_sensor_mode
  label: VCP 10h/75h Human Sensor Mode
  kind: action
  command: "VCP page=10h op=75h set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H AUTO OFF, 0004H CUSTOM."

- id: vcp_10_78_human_sensor_wait
  label: VCP 10h/78h Human Sensor Wait Time
  kind: action
  command: "VCP page=10h op=78h set value 001EH-0258H"
  params:
    - name: value
      type: integer
      description: "001EH (30 sec) - 0258H (600 sec)."

- id: vcp_10_81_line_out
  label: VCP 10h/81h Line Out
  kind: action
  command: "VCP page=10h op=81h set value"
  params:
    - name: value
      type: string
      description: "0001H FIXED, 0002H VARIABLE."

- id: vcp_10_b6_video_mute
  label: VCP 10h/B6h Video Mute
  kind: action
  command: "VCP page=10h op=B6h set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H video mute, 0002H video unmute."

- id: vcp_10_c6_human_sensor_backlight
  label: VCP 10h/C6h Human Sensor Backlight
  kind: action
  command: "VCP page=10h op=C6h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (small) - 0064H (big)."

- id: vcp_10_c7_human_sensor_volume
  label: VCP 10h/C7h Human Sensor Volume
  kind: action
  command: "VCP page=10h op=C7h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H-0064H."

- id: vcp_10_c8_als_mode
  label: VCP 10h/C8h ALS Mode
  kind: action
  command: "VCP page=10h op=C8h set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H ON."

- id: vcp_10_ca_audio_delay
  label: VCP 10h/CAh Audio Delay
  kind: action
  command: "VCP page=10h op=CAh set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H ON."

- id: vcp_10_cb_audio_delay_time
  label: VCP 10h/CBh Audio Delay Time
  kind: action
  command: "VCP page=10h op=CBh set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (small) - 0064H (big)."

- id: vcp_10_d0_human_sensor_input
  label: VCP 10h/D0h Human Sensor Input Select
  kind: action
  command: "VCP page=10h op=D0h set value"
  params:
    - name: value
      type: string
      description: "0011h HDMI1, 0012h HDMI2, 0082h HDMI3, 0089h USB-C, 0087h Home."

- id: vcp_10_d4_ir_lock_mode
  label: VCP 10h/D4h IR Lock Mode Select
  kind: action
  command: "VCP page=10h op=D4h set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H UNLOCK, 0002H ALL LOCK, 0003H CUSTOM LOCK."

- id: vcp_10_d5_ir_lock_power
  label: VCP 10h/D5h IR Lock Power
  kind: action
  command: "VCP page=10h op=D5h set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H UNLOCK, 0002H LOCK."

- id: vcp_10_d6_ir_lock_volume
  label: VCP 10h/D6h IR Lock Volume
  kind: action
  command: "VCP page=10h op=D6h set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H UNLOCK, 0002H LOCK."

- id: vcp_10_d7_ir_lock_min_vol
  label: VCP 10h/D7h IR Lock Min Vol
  kind: action
  command: "VCP page=10h op=D7h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (0-100)."

- id: vcp_10_d8_ir_lock_max_vol
  label: VCP 10h/D8h IR Lock Max Vol
  kind: action
  command: "VCP page=10h op=D8h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (0-100)."

- id: vcp_10_d9_ir_lock_input
  label: VCP 10h/D9h IR Lock Input
  kind: action
  command: "VCP page=10h op=D9h set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H UNLOCK, 0002H LOCK."

- id: vcp_10_dd_human_sensor_backlight_onoff
  label: VCP 10h/DDh Human Sensor Backlight on/off
  kind: action
  command: "VCP page=10h op=DDh set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H ON."

- id: vcp_10_de_human_sensor_volume_onoff
  label: VCP 10h/DEh Human Sensor Volume on/off
  kind: action
  command: "VCP page=10h op=DEh set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H ON."

- id: vcp_10_df_human_sensor_input_onoff
  label: VCP 10h/DFh Human Sensor Input on/off
  kind: action
  command: "VCP page=10h op=DFh set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H ON."

- id: vcp_11_06_input_select
  label: VCP 11h/06h Input Source Select
  kind: action
  command: "VCP page=11h op=06h set value"
  params:
    - name: value
      type: string
      description: "0011h HDMI1, 0012h HDMI2, 0082h HDMI3, 0089h USB-C, 0087h Home."

- id: vcp_11_17_communication_info
  label: VCP 11h/17h Communication Information
  kind: action
  command: "VCP page=11h op=17h set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H ON."

- id: vcp_11_2c_aspect_zoom
  label: VCP 11h/2Ch Aspect Zoom
  kind: action
  command: "VCP page=11h op=2Ch set value 005AH-012CH"
  params:
    - name: value
      type: integer
      description: "005AH (0.90%) - 012CH (3.00%)."

- id: vcp_11_4e_backlight_dimming
  label: VCP 11h/4Eh Backlight Dimming
  kind: action
  command: "VCP page=11h op=4Eh set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H ON."

- id: vcp_11_68_hdmi_mode
  label: VCP 11h/68h HDMI Mode
  kind: action
  command: "VCP page=11h op=68h set value"
  params:
    - name: value
      type: string
      description: "0001H settings 1, 0002H settings 2."

- id: vcp_11_6a_key_lock_mode
  label: VCP 11h/6Ah Key Lock Mode Select
  kind: action
  command: "VCP page=11h op=6Ah set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H UNLOCK, 0002H ALL LOCK, 0003H CUSTOM LOCK."

- id: vcp_11_6b_key_lock_power
  label: VCP 11h/6Bh Key Lock Power
  kind: action
  command: "VCP page=11h op=6Bh set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H UNLOCK, 0002H LOCK."

- id: vcp_11_6c_key_lock_volume
  label: VCP 11h/6Ch Key Lock Volume
  kind: action
  command: "VCP page=11h op=6Ch set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H UNLOCK, 0002H LOCK."

- id: vcp_11_6d_key_lock_min_vol
  label: VCP 11h/6Dh Key Lock Min Vol
  kind: action
  command: "VCP page=11h op=6Dh set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (0-100)."

- id: vcp_11_6e_key_lock_max_vol
  label: VCP 11h/6Eh Key Lock Max Vol
  kind: action
  command: "VCP page=11h op=6Eh set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H-0064H (0-100)."

- id: vcp_11_6f_key_lock_input
  label: VCP 11h/6Fh Key Lock Input
  kind: action
  command: "VCP page=11h op=6Fh set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H UNLOCK, 0002H LOCK."

- id: vcp_11_75_usb_power
  label: VCP 11h/75h USB Power
  kind: action
  command: "VCP page=11h op=75h set value"
  params:
    - name: value
      type: string
      description: "0001H ON, 0002H AUTO, 0003H OFF."

- id: vcp_11_76_cec
  label: VCP 11h/76h CEC
  kind: action
  command: "VCP page=11h op=76h set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H ON."

- id: vcp_11_77_power_control_link
  label: VCP 11h/77h Power Control Link
  kind: action
  command: "VCP page=11h op=77h set value"
  params:
    - name: value
      type: string
      description: "0001H DISABLE, 0002H ENABLE."

- id: vcp_11_78_audio_receiver
  label: VCP 11h/78h Audio Receiver
  kind: action
  command: "VCP page=11h op=78h set value"
  params:
    - name: value
      type: string
      description: "0001H DISABLE, 0002H ENABLE."

- id: vcp_11_7b_power_save_message
  label: VCP 11h/7Bh Power Save Message
  kind: action
  command: "VCP page=11h op=7Bh set value"
  params:
    - name: value
      type: string
      description: "0001H OFF, 0002H ON."

- id: vcp_11_bb_internal_speaker
  label: VCP 11h/BBh Internal Speaker
  kind: action
  command: "VCP page=11h op=BBh set value"
  params:
    - name: value
      type: string
      description: "0000H no mean, 0001H OFF, 0002H ON."

- id: vcp_11_d8_audio_mode
  label: VCP 11h/D8h Audio Mode
  kind: action
  command: "VCP page=11h op=D8h set value"
  params:
    - name: value
      type: string
      description: "0001H RETAIL, 0002H CONFERENCING, 0003H HIGHBRIGHT, 0004H TRANSPORTATION, 0005H CUSTOM1, 0007H NATIVE."

- id: vcp_11_e5_hdr_mode
  label: VCP 11h/E5h HDR Mode
  kind: action
  command: "VCP page=11h op=E5h set value"
  params:
    - name: value
      type: string
      description: "0004H Low, 0005H Mid, 0006H High."

- id: vcp_11_e9_mute_setting
  label: VCP 11h/E9h Mute Setting
  kind: action
  command: "VCP page=11h op=E9h set value"
  params:
    - name: value
      type: string
      description: "0001H AUDIO, 0002H VIDEO, 0003H AUDIO&VIDEO."

- id: vcp_11_ea_quick_start
  label: VCP 11h/EAh Quick Start
  kind: action
  command: "VCP page=11h op=EAh set value"
  params:
    - name: value
      type: string
      description: "0001H DISABLE, 0002H ENABLE."

- id: vcp_11_ee_power_save_mode
  label: VCP 11h/EEh Power Save Settings Mode
  kind: action
  command: "VCP page=11h op=EEh set value"
  params:
    - name: value
      type: string
      description: "0001H LOW POWER, 0002H NORMAL."

- id: vcp_11_f5_auto_dim_in_bright
  label: VCP 11h/F5h Auto Dimming In-Bright Illuminance
  kind: action
  command: "VCP page=11h op=F5h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H (dark) - 0064H (bright)."

- id: vcp_11_f6_auto_dim_in_dark
  label: VCP 11h/F6h Auto Dimming In-Dark Illuminance
  kind: action
  command: "VCP page=11h op=F6h set value 0000H-0064H"
  params:
    - name: value
      type: integer
      description: "0000H-0064H."

- id: vcp_11_fc_als_backlight_readonly
  label: VCP 11h/FCh ALS Backlight (read only)
  kind: query
  command: "VCP page=11h op=FCh get"
  params: []
  notes: "0000H-0064H (0-100), read only."
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  source: "CTL-01D6 reply / VCP 00h/D6h"
  values: [power_on, power_save, reserved, power_off]
  notes: "Reply codes: 0001 on, 0002 power save, 0003 reserved, 0004 off."

- id: timing_report
  type: object
  source: "CTL-07 reply"
  fields:
    h_freq_0p01khz: integer
    v_freq_0p01hz: integer

- id: self_diagnosis
  type: enum
  source: "CTL-B1 reply"
  values: [temperature_shutdown, temperature_half_brightness, no_signal, system_eeprom_error, no_error]
  notes: "Multiple codes may be returned concatenated. ASCII pairs 'A''0','A''1','B''0','E''0' or '0''0'."

- id: model_name
  type: string
  source: "CTL-C217 reply"

- id: serial_number
  type: string
  source: "CTL-C216 reply"

- id: fw_revision
  type: string
  source: "CTL-C03F reply (per-character mapping)"

- id: mac_address
  type: string
  source: "CTL-C220 reply (12 ASCII hex chars)"

- id: ping_result
  type: enum
  source: "CTL-C22B-0E-04 reply"
  values: [success, failed]

- id: current_input_name
  type: string
  source: "CTL-CA04-00 / CA04-03 reply"

- id: power_save_mode
  type: enum
  source: "CTL-CA0B-00 reply"
  values: [enable, not_support, disable]

- id: auto_power_save_time
  type: integer
  source: "CTL-CA0B-02 reply"
  notes: "1 step = 5 sec, range 01-78."

- id: terminal_list
  type: array
  source: "CTL-CA0F-00 reply"
  notes: "Count + list of terminal codes. For this model: HOME/HDMI1/HDMI2/HDMI3/USB-C."

- id: date_time
  type: object
  source: "CTL-C211 reply"
  fields:
    year_offset_2000: integer
    month: integer
    day: integer
    weekday: integer  # 0=Sun..6=Sat
    hour: integer
    minute: integer

- id: temperature_c
  type: number
  source: "VCP 02h/79h get"
  notes: "Raw is 0000H-FFFFH, 1 step = 0.5 C, two's complement for negative."

- id: als_illuminance
  type: integer
  source: "VCP 02h/B4h get (read only)"

- id: carbon_savings_g
  type: integer
  source: "VCP 10h/10h, 10h/28h (read only)"

- id: carbon_savings_kg
  type: integer
  source: "VCP 10h/11h, 10h/29h (read only)"

- id: carbon_usage_g
  type: integer
  source: "VCP 10h/26h, 10h/2Ah (read only)"

- id: carbon_usage_kg
  type: integer
  source: "VCP 10h/27h, 10h/2Bh (read only)"

- id: als_backlight_readonly
  type: integer
  source: "VCP 11h/FCh get (read only)"
```

## Variables
```yaml
# Settable parameters that are scalar/level-like, with full VCP op + range.
# Each is one VCP command (op) with a range. Enums documented inline.

- id: backlight
  source: "VCP 00h/10h"
  range: "0000H-0064H"
  unit: "level"
- id: contrast
  source: "VCP 00h/12h"
  range: "0000H-0064H"
- id: r_gain
  source: "VCP 00h/16h"
  range: "0000H-00FFH"
- id: g_gain
  source: "VCP 00h/18h"
  range: "0000H-00FFH"
- id: b_gain
  source: "VCP 00h/1Ah"
  range: "0000H-00FFH"
- id: color_temperature_k
  source: "VCP 00h/54h"
  range: "0000H (2600K) - 004AH (10000K), 1 step = 100K"
- id: volume
  source: "VCP 00h/62h"
  range: "0000H-0064H"
- id: sharpness
  source: "VCP 00h/87h / 00h/8Ch"
  range: "0000H-0064H"
- id: color
  source: "VCP 00h/8Ah / 02h/1Fh"
  range: "0000H-0064H"
- id: treble
  source: "VCP 00h/8Fh"
  range: "0000H-000AH"
- id: bass
  source: "VCP 00h/91h"
  range: "0000H-000AH"
- id: video_black_level
  source: "VCP 00h/92h"
  range: "0000H-0064H"
- id: audio_balance
  source: "VCP 00h/93h"
  range: "0000H (L50) - 0032H (R50), 1 step = 2"
- id: osd_time
  source: "VCP 00h/FCh"
  range: "0002H-0030H (10s - 240s)"
- id: monitor_id
  source: "VCP 02h/3Eh"
  range: "0001H-0019H (1-25)"
- id: tile_h
  source: "VCP 02h/D0h"
  range: "0001H-0005H"
- id: tile_v
  source: "VCP 02h/D1h"
  range: "0001H-0005H"
- id: tile_position
  source: "VCP 02h/D2h"
  range: "0001H-0019H (1-25)"
- id: power_on_delay
  source: "VCP 02h/D8h"
  range: "0000H-0032H (0-50 sec)"
- id: human_sensor_wait
  source: "VCP 10h/78h"
  range: "001EH-0258H (30-600 sec)"
- id: audio_delay_time
  source: "VCP 10h/CBh"
  range: "0000H-0064H"
- id: ir_lock_min_vol
  source: "VCP 10h/D7h"
  range: "0000H-0064H"
- id: ir_lock_max_vol
  source: "VCP 10h/D8h"
  range: "0000H-0064H"
- id: key_lock_min_vol
  source: "VCP 11h/6Dh"
  range: "0000H-0064H"
- id: key_lock_max_vol
  source: "VCP 11h/6Eh"
  range: "0000H-0064H"
- id: aspect_zoom_pct
  source: "VCP 11h/2Ch"
  range: "005AH-012CH (0.90% - 3.00%)"
- id: auto_dim_in_bright_illum
  source: "VCP 11h/F5h"
  range: "0000H-0064H"
- id: auto_dim_in_dark_illum
  source: "VCP 11h/F6h"
  range: "0000H-0064H"
```

## Events
```yaml
# Source documents a NULL message (CTL-BE) sent by the monitor when an unsupported
# CTL is received or the monitor is in a non-executable state.
- id: ctl_null_message
  source: "CTL-BE (5.2.4)"
  trigger: "unsupported CTL or non-executable state"
  payload: "STX 'B''E' ETX"
```

## Macros
```yaml
# Source 8.1 lists commands accepted while in power-off / power-save.
# The "Quick Start" toggle (VCP 11h/EAh) is required to accept the full set.
- id: commands_accepted_during_power_save
  description: "Commands accepted when monitor is in 'power off' or 'power save' state."
  ctl:
    - CTL-B1   # self-diagnosis
    - CTL-C03F # FW revision
    - CTL-01D6 # power status
    - CTL-C203-D6 # power control
    - CTL-C216 # serial
    - CTL-C217 # model
    - CTL-C220 # MAC
  vcp:
    - "00h/60h" # input select
    - "02h/3Eh" # monitor ID
    - "11h/06h" # input select
  notes: "Set VCP 11h/EAh (Quick Start) = ENABLE to accept the full command set even when off."
```

## Safety
```yaml
# UNRESOLVED: source does not document explicit safety warnings, interlocks, or
# power-on sequencing requirements beyond the timing notes in section 3.
confirmation_required_for: []
interlocks: []
# Implicit timing safety noted in source (section 3): wait ~15s after power on/off
# and ~10s after input switch / all-reset before next command. Not an interlock,
# just a timing constraint for the controller.
timing_constraints:
  - "Wait ~15s after CTL-C203-D6 power on/off before next command."
  - "Wait ~10s after input switching or all-reset before next command."
  - "TCP LAN: monitor disconnects after 15 minutes of communication loss."
  - "Keep command byte interval within 100ms when sending continuously."
```

## Notes
<!-- UNRESOLVED: device family is "4P BxxEJ2U Series" (per spec_id); source document title says "NEC LCD monitor". The two may differ - flag for verification. -->

Frame format (sections 4.1-4.4): every command is `SOH(01h) Reserved(30h) Dest Src Type LengthHi LengthLo STX ...Message... ETX(03h) BCC CR(0Dh)`. The Check Code is a Block Check Code (XOR) over bytes after SOH through ETX (section 4.3). Type byte selects VCP/CTL family and request vs reply.

The source uses per-character ASCII-hex-pair encoding for the following fields: input names (5.2.18-22), model name (5.2.11), serial number (5.2.10), FW revision (5.2.7), MAC address (5.2.13), terminal list (5.2.28). Implementations must apply the source mapping table when encoding/decoding these strings; they are NOT plain ASCII.

CTL-21D security lock only works with 4-digit passcodes. Other passcode lengths return error (5.2.12 note).

VCP 00h/8Ch sharpness is an alias of 00h/87h. VCP 02h/1Fh color is an alias of 00h/8Ah. (Section 6.1 footnotes.)

VCP replies use ASCII-hex 16-bit values. Setting values must be converted to ASCII hex characters (e.g. 0x3A -> "3A") before placing in the Set VCP message (section 4.2.3).

LAN transport uses TCP port 7142 (section 3.2). The source does not specify HTTP or any higher-level protocol above TCP.

## Provenance

```yaml
source_domains:
  - docs.aws.sharp.eu
  - manualslib.com
  - assets.sharpnecdisplays.us
source_urls:
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/External_Control_ME2_Series_EN_Rev1.4.pdf
  - "https://www.manualslib.com/manual/3921793/Sharp-Aquos-4p-B86ej2u.html?page=55"
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4p-b-series_emanual.pdf
retrieved_at: 2026-06-11T00:05:07.559Z
last_checked_at: 2026-06-11T13:44:56.147Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:44:56.147Z
matched_actions: 133
action_count: 133
confidence: medium
summary: "All 133 spec actions (28 CTL + 105 VCP) confirmed verbatim in source command tables; transport parameters match; complete bilateral coverage 133/133. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated in source"
- "flow control not stated in source"
- "HTTP base URL not applicable (raw TCP)"
- "source does not document explicit safety warnings, interlocks, or"
- "device family is \"4P BxxEJ2U Series\" (per spec_id); source document title says \"NEC LCD monitor\". The two may differ - flag for verification."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
