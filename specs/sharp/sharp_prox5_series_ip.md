---
spec_id: admin/sharp-prox5-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PROX5 Series Control Spec"
manufacturer: Sharp
model_family: "PROX5 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "PROX5 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-06-15T12:48:55.532Z
last_checked_at: 2026-06-16T07:17:44.300Z
generated_at: 2026-06-16T07:17:44.300Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source §1 text refers to \"NEC LCD monitor\" — document is a Sharp-rebadged NEC protocol manual. Exact PROX5 sub-models (e.g. Pro-60X5FD / Pro-70X5FD) are not named in this source text. Voltage / current / power specs not in source."
  - "flow control not stated in source"
  - "no other unsolicited push notifications documented in source."
  - "source contains no explicit safety interlock procedures, power-on"
  - "Exact PROX5 sub-model numbers (e.g. Pro-60X5FD / Pro-70X5FD) not present in this source text — only \"PROX5 Series\" generic."
  - "Firmware version compatibility range not stated."
  - "RS-232C flow control not specified (assumed none)."
  - "No password / authentication procedure documented; auth.type inferred none."
  - "VCP-02-78 and VCP-02-79 referenced only by name in §8 Monitor Information group — exact semantics (besides temp-sensor use shown in §6.2) not detailed."
  - "Voltage, current, power, and mechanical specs not in this source."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:17:44.300Z
  matched_actions: 86
  action_count: 86
  confidence: medium
  summary: "All 86 spec actions have verbatim wire-literal matches in the source; transport parameters confirmed; source and spec are bidirectionally complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Sharp PROX5 Series Control Spec

## Summary
External control spec for the Sharp PROX5 Series LCD monitor. Supports RS-232C remote control and LAN (TCP/IP) control using a framed ASCII protocol with a Header / Message / Check Code (BCC XOR) / Delimiter (CR) structure. Two command families: VCP (get/set parameter by OP code page + OP code) and CTL (system commands: power, save, timing report, serial/model/MAC read, remote-control key forwarding, firmware version, input-name edit, TV channel).

<!-- UNRESOLVED: Source §1 text refers to "NEC LCD monitor" — document is a Sharp-rebadged NEC protocol manual. Exact PROX5 sub-models (e.g. Pro-60X5FD / Pro-70X5FD) are not named in this source text. Voltage / current / power specs not in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # Fixed per §3.2
  ip_assignment: dhcp  # Default DHCP:On per §3.2
  idle_disconnect_minutes: 15  # Monitor disconnects after 15 min idle per §3.2
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
  connector: "9-pin D-Sub"
  cable: "Cross (null modem) cable"
  code_set: ASCII
  min_packet_interval_ms: 600  # >600 msec between commands per §3.1.1 / §3.2.1
auth:
  type: none  # inferred: no auth procedure in source
packet:
  structure: "SOH | Reserved '0' | Destination | Source '0' | MsgType | MsgLen | STX | Message | ETX | BCC | CR"
  soh: "01h"
  stx: "02h"
  etx: "03h"
  delimiter: "0Dh (CR)"
  bcc: "XOR of bytes from Reserved(30h) through ETX(03h), ASCII-encoded as 2 hex chars"
  message_types:
    A: "41h - Command"
    B: "42h - Command reply"
    C: "43h - Get current parameter"
    D: "44h - Get parameter reply"
    E: "45h - Set parameter"
    F: "46h - Set parameter reply"
```

## Traits
```yaml
traits:
  - powerable     # inferred from CTL-C203-D6 power control + CTL-01D6 power status read
  - queryable     # inferred from Get-parameter (msg type C) + many read-only CTL queries
  - levelable     # inferred from VCP set-parameter ranges (Backlight, Contrast, Volume, etc.)
  - routable      # inferred from VCP-00-60 / VCP-10-2E/2F/30 input select
```

## Actions
```yaml
# Framing: every command is wrapped as
#   SOH '0' <DestID> '0' <MsgType> <MsgLenHi> <MsgLenLo> STX <Message> ETX <BCC> CR
# Controller's Source byte is always '0'(30h). Destination 'A'(41h) = Monitor ID 1,
# '*'(2Ah) = all monitors on daisy chain. BCC = XOR of bytes D1..D16 (see §4.3.1).
# Below, `command:` shows the Message-block payload verbatim from source; the caller
# must prepend the header, append BCC + CR. Where source gave a literal full packet,
# it is reproduced verbatim.
actions:
  # ---------- VCP set-parameter commands (msg type 'E') ----------
  - id: vcp_set_parameter
    label: Set Parameter (generic)
    kind: action
    command: "STX {op_code_page_hi}{op_code_page_lo} {op_code_hi}{op_code_lo} {set_msb}{set_b2}{set_b3}{set_lsb} ETX"
    notes: "MsgType='E'. OP code page + OP code + 16-bit set value, each nibble ASCII-encoded. See §5.3."
    params:
      - {name: op_code_page, type: string, description: "2-hex-digit OP code page, ASCII-encoded (e.g. '00', '02', '10', '11')"}
      - {name: op_code,      type: string, description: "2-hex-digit OP code, ASCII-encoded"}
      - {name: value,        type: integer, description: "16-bit set value"}

  - id: vcp_get_parameter
    label: Get Parameter (generic)
    kind: query
    command: "STX {op_code_page_hi}{op_code_page_lo} {op_code_hi}{op_code_lo} ETX"
    notes: "MsgType='C'. Replies with current value + max value + type. See §5.1 / §5.2."
    params:
      - {name: op_code_page, type: string, description: "2-hex-digit OP code page"}
      - {name: op_code,      type: string, description: "2-hex-digit OP code"}

  # ---------- CTL system commands (§7.1) ----------
  - id: ctl_save_current_settings
    label: CTL-0C Save Current Settings
    kind: action
    command: "STX '0' 'C' ETX"
    full_packet: "01h-30h-41h-30h-41h-30h-34h-02h-30h-43h-03h-CHK-0Dh"
    notes: "MsgType='A', MsgLen='04'. Stores adjusted values. Reply: SOH-'0'-'0'-ID-'B'-'0'-'6'-STX-'0'-'0'-'0'-'C'-ETX-CHK-CR. See §5.5.1 / §7.1.1."
    params: []

  - id: ctl_get_timing_report
    label: CTL-07 Get Timing Report
    kind: query
    command: "STX '0' '7' ETX"
    full_packet: "01h-30h-41h-30h-41h-30h-34h-02h-30h-37h-03h-CHK-0Dh"
    notes: "Reply carries SS byte (bit7 out-of-range, bit6 unstable, bit1 H-sync polarity, bit0 V-sync polarity), H Freq (0.01kHz), V Freq (0.01Hz). See §5.5.2 / §7.1.2."
    params: []

  # ---------- Power control (§7.2) ----------
  - id: ctl_power_status_read
    label: CTL-01D6 Power Status Read
    kind: query
    command: "STX '0' '1' 'D' '6' ETX"
    full_packet: "01h-30h-ID-30h-41h-30h-36h-02h-(30h,31h,44h,36H)-03h-BCC-0Dh"
    notes: "Returns current power mode: 0001=ON, 0002=Stand-by, 0003=Reserved, 0004=OFF. See §7.2.1."
    params: []

  - id: ctl_power_control
    label: CTL-C203-D6 Power Control
    kind: action
    command: "STX 'C' '2' '0' '3' 'D' '6' {p1}{p2}{p3}{p4} ETX"
    full_packet: "01h-30h-ID-30h-41h-30h-43h-02H-(43H 32H 30H 33H 44H 36H)-(power_mode)-03H-BCC-0DH"
    notes: "Power mode values: 0001=ON, 0002=Do not set, 0003=Do not set, 0004=OFF (same as IR power off). See §7.2.2."
    params:
      - name: power_mode
        type: enum
        values: ["0001", "0004"]
        description: "0001=ON, 0004=OFF (0002/0003 documented as 'Do not set')"

  # ---------- Identity reads (§7.3 / §7.4 / §7.7.1) ----------
  - id: ctl_serial_no_read
    label: CTL-C216 Serial Number Read
    kind: query
    command: "STX 'C' '2' '1' '6' ETX"
    full_packet: "01h-30h-ID-30h-41h-30h-36h-02H-(43H 32H 31H 36H)-03H-BCC-0DH"
    notes: "Reply cmd 'C316'. Serial number max 30 bytes, ASCII-hex double-encoded. See §7.3.1."
    params: []

  - id: ctl_model_name_read
    label: CTL-C217 Model Name Read
    kind: query
    command: "STX 'C' '2' '1' '7' ETX"
    full_packet: "01h-30h-ID-30h-41h-30h-36h-02H-(43H 32H 31H 37H)-03H-BCC-0DH"
    notes: "Reply cmd 'C317'. Model name max 36 bytes, ASCII-hex double-encoded. See §7.3.2."
    params: []

  - id: ctl_mac_address_read
    label: CTL-C220 MAC Address Read
    kind: query
    command: "STX 'C' '2' '2' '0' '0' '0' ETX"
    full_packet: "01h-30h-ID-30h-41h-31H-30H-02H-(43H 32H 32H 40H)-(30H 30H)-03H-BCC-0DH"
    notes: "Reply cmd 'C320', device select='00' fixed, MAC address max 12 bytes. See §7.4.1."
    params: []

  # ---------- Direct TV channel (§7.5) - TV-tuner models only ----------
  - id: ctl_tv_channel_read
    label: CTL-C22C Direct TV Channel Read
    kind: query
    command: "STX 'C' '2' '2' 'C' ETX"
    full_packet: "01h-30h-ID-30h-41h-30h-36h-02H-(43H 32H 32H 43H)-03H-BCC-0DH"
    notes: "Reply cmd 'C32C'. Returns Major-High, Major-Low, Minor channel. TV tuner models only. See §7.5.1."
    params: []

  - id: ctl_tv_channel_write
    label: CTL-C22D Direct TV Channel Write
    kind: action
    command: "STX 'C' '2' '2' 'D' {major_hi}{major_hi_lo}{major_lo}{major_lo_lo}{minor}{minor_lo} ETX"
    full_packet: "01h-30h-ID-30h-41h-31H-32H-02H-(43H 32H 32H 44H)-(major_hi)-(major_lo)-(minor)-03H-BCC-0DH"
    notes: "Reply cmd 'C32D'. Writes Major-High, Major-Low, Minor channel. TV tuner models only. See §7.5.2."
    params:
      - {name: major_channel_high, type: integer, description: "Major channel high 16-bit"}
      - {name: major_channel_low,  type: integer, description: "Major channel low 16-bit"}
      - {name: minor_channel,      type: integer, description: "Minor channel 16-bit"}

  # ---------- Remote Control key forwarding (§7.6.1) - one action per RC code row ----------
  - id: ctl_rc_key_send
    label: CTL-C210 Remote Control Key Code Send
    kind: action
    command: "STX 'C' '2' '1' '0' '0' '0' {key_hi}{key_lo} {repeat_hi}{repeat_lo} ETX"
    full_packet: "01h-30h-ID-30h-41h-30h-43h-02H-(43H 32H 31H 30H)-(30H 30H)-(key)-(repeat)-03H-BCC-0DH"
    notes: "Reply cmd 'C310' echoes the key. Upper byte always '00'. See §7.6.1 for key table."
    params:
      - name: key_code
        type: enum
        description: "Remote control data code (lower byte)"
        values: ["1D-PICTURE", "29-ASPECT", "43-SOUND", "08-1", "09-2", "0A-3", "0B-4", "0C-5", "0D-6", "0E-7", "0F-8", "10-9", "44-DASH", "12-0", "19-INFO", "20-MENU", "1F-EXIT", "15-UP", "14-DOWN", "21-LEFT", "22-RIGHT", "23-OK", "17-VOL+", "16-VOL-", "33-CH+", "32-CH-", "1B-MUTE", "27-FREEZE", "2C-CC", "1A-MTS"]
      - {name: repeat_times, type: integer, description: "Repeat count (HL)"}

  # ---------- Firmware version (§7.7.1) ----------
  - id: ctl_firmware_version_read
    label: CTL-CA02 Firmware Version Read
    kind: query
    command: "STX 'C' 'A' '0' '2' '0' '0' ETX"
    full_packet: "01h-30h-ID-30h-41h-30h-38h-02H-(43H 41H 30H 32H)-(30H 30H)-03H-BCC-0DH"
    notes: "Reply cmd 'CB02'. Firmware type '00'=F/W Revision. Version string format: R<major>.<min1><min2><min3><branch1><branch2> (e.g. R1.234AB). See §7.7.1."
    params:
      - name: firmware_type
        type: enum
        values: ["00"]
        description: "'00' = F/W Revision (only documented value)"

  # ---------- Input Name edit (§7.7.2-4) ----------
  - id: ctl_input_name_read
    label: CTL-CA04-03 Input Name Read
    kind: query
    command: "STX 'C' 'A' '0' '4' '0' '3' {terminal_hi}{terminal_lo} ETX"
    full_packet: "01h-30h-ID-30h-41h-30h-41h-02H-(43H 41H 30H 34H)-(30H 33H)-(terminal)-03H-BCC-0DH"
    notes: "Reply cmd 'CB04'+'03'. Returns Input Name (max 14 chars). See §7.7.2."
    params:
      - name: input_terminal
        type: enum
        description: "Designated terminal"
        values: ["00-No mean", "01-VGA(RGB)", "05-AV", "09-Tuner", "0C-VGA(YPbPr)", "11-HDMI1", "12-HDMI2", "82-HDMI3", "87-MP(Media player)"]

  - id: ctl_input_name_write
    label: CTL-CA04-04 Input Name Write
    kind: action
    command: "STX 'C' 'A' '0' '4' '0' '4' {terminal_hi}{terminal_lo} {name_bytes} ETX"
    full_packet: "01h-30h-ID-30h-41H-LEN-LEN-02H-(43H 41H 30H 34H)-(30H 34H)-(terminal)-(name)-03H-BCC-0DH"
    notes: "Reply cmd 'CB04'+'04'. Max name length 14 chars. See §7.7.3."
    params:
      - name: input_terminal
        type: enum
        values: ["00-No mean", "01-VGA(RGB)", "05-AV", "09-Tuner", "0C-VGA(YPbPr)", "11-HDMI1", "12-HDMI2", "82-HDMI3", "87-MP(Media player)"]
      - {name: input_name, type: string, description: "Input label (max 14 chars)"}

  - id: ctl_input_name_reset
    label: CTL-CA04-05 Input Name Reset
    kind: action
    command: "STX 'C' 'A' '0' '4' '0' '5' {terminal_hi}{terminal_lo} ETX"
    full_packet: "01h-30h-ID-30h-41h-30h-41h-02H-(43H 41H 30H 34H)-(30H 35H)-(terminal)-03H-BCC-0DH"
    notes: "Reply cmd 'CB04'+'05'. Terminal '00' resets ALL terminals. See §7.7.4."
    params:
      - name: input_terminal
        type: enum
        values: ["00-ALL Terminal", "00-No mean", "01-VGA(RGB)", "05-AV", "09-Tuner", "0C-VGA(YPbPr)", "11-HDMI1", "12-HDMI2", "82-HDMI3", "87-MP(Media player)"]

  # ---------- VCP set actions - one per distinct OP code in §8 OSD table ----------
  # Value column documents valid enum / range for each.
  - {id: vcp_picture_mode_set,         label: "VCP-02-1A Picture Mode",        kind: action, command: "STX '0' '2' '1' 'A' {val} ETX", enum: ["0003-HighBright","0004-Standard","0008-Custom","0017-Dynamic","0018-Energy Savings","001B-HDR Video","001D-Conferencing"]}
  - {id: vcp_aspect_ratio_set,         label: "VCP-02-70 Aspect Ratio",        kind: action, command: "STX '0' '2' '7' '0' {val} ETX", enum: ["0001-NORMAL","0002-FULL","0004-ZOOM","0007-1:1"]}
  - {id: vcp_overscan_set,             label: "VCP-02-E3 Overscan",            kind: action, command: "STX '0' '2' 'E' '3' {val} ETX", enum: ["0001-Off","0002-On","0003-Auto"]}
  - {id: vcp_dimming_setting_set,      label: "VCP-11-4E Dimming Setting",     kind: action, command: "STX '1' '1' '4' 'E' {val} ETX", enum: ["0001-OFF","0002-Dynamic Backlight","0003-Local Dimming"]}
  - {id: vcp_color_temp_wnc_set,       label: "VCP-00-0C Color Temperature (Warm/Normal/Cool)", kind: action, command: "STX '0' '0' '0' 'C' {val} ETX", enum: ["0023-Warm","003F-Normal","005A-Cool"]}
  - {id: vcp_color_temp_native_set,    label: "VCP-00-14 Color Temperature (Native/Custom)",   kind: action, command: "STX '0' '0' '1' '4' {val} ETX", enum: ["0002-Native","000B-Custom"]}
  - {id: vcp_white_gain_r_set,         label: "VCP-00-16 R Gain",              kind: action, command: "STX '0' '0' '1' '6' {val} ETX", range: "0000-0064 (Dark-Bright)"}
  - {id: vcp_white_gain_g_set,         label: "VCP-00-18 G Gain",              kind: action, command: "STX '0' '0' '1' '8' {val} ETX", range: "0000-0064 (Dark-Bright)"}
  - {id: vcp_white_gain_b_set,         label: "VCP-00-1A B Gain",              kind: action, command: "STX '0' '0' '1' 'A' {val} ETX", range: "0000-0064 (Dark-Bright)"}
  - {id: vcp_noise_reduction_set,      label: "VCP-02-20 Noise Reduction",     kind: action, command: "STX '0' '2' '2' '0' {val} ETX", enum: ["0000-OFF","0001-Low","0002-Mid","0003-High"]}
  - {id: vcp_noise_reduction_alt_set,  label: "VCP-02-26 Noise Reduction (alt)", kind: action, command: "STX '0' '2' '2' '6' {val} ETX", enum: ["0000-OFF","0001-Low","0002-Mid","0003-High"]}
  - {id: vcp_adaptive_contrast_set,    label: "VCP-02-8D Adaptive Contrast",   kind: action, command: "STX '0' '2' '8' 'D' {val} ETX", enum: ["0001-Off","0002-Low","0003-Mid","0004-High"]}
  - {id: vcp_gamma_set,                label: "VCP-02-68 Gamma",               kind: action, command: "STX '0' '2' '6' '8' {val} ETX", enum: ["0001-Native","0004-2.2","0008-2.4","0010-HDR-Hybrid Log","0011-HDR-ST2084(PQ)"]}
  - {id: vcp_ambient_light_sensing_set,label: "VCP-10-C8 Ambient Light Sensing", kind: action, command: "STX '1' '0' 'C' '8' {val} ETX", enum: ["0001-Off","0002-On"]}
  - {id: vcp_color_enhance_set,        label: "VCP-11-EC Color Enhance",       kind: action, command: "STX '1' '1' 'E' 'C' {val} ETX", enum: ["0001-Off","0002-Vivid","0003-Wide"]}
  - {id: vcp_hdr_mode_set,             label: "VCP-11-E5 HDR Mode",            kind: action, command: "STX '1' '1' 'E' '5' {val} ETX", enum: ["0004-Low","0005-Mid","0006-High"]}
  - {id: vcp_backlight_brightness_set, label: "VCP-00-10 Backlight / Brightness", kind: action, command: "STX '0' '0' '1' '0' {val} ETX", range: "0000-0064 (Dark-Bright)"}
  - {id: vcp_contrast_set,             label: "VCP-00-12 Contrast",            kind: action, command: "STX '0' '0' '1' '2' {val} ETX", range: "0000-0064 (Low-High)"}
  - {id: vcp_video_black_level_set,    label: "VCP-00-92 Video Black Level",   kind: action, command: "STX '0' '0' '9' '2' {val} ETX", range: "0000-0064 (To Dark-To Bright)"}
  - {id: vcp_sharpness_set,            label: "VCP-00-87 Sharpness",           kind: action, command: "STX '0' '0' '8' '7' {val} ETX", range: "0000-0064 (Dull-Sharp)"}
  - {id: vcp_sharpness_alt_set,        label: "VCP-00-8C Sharpness (alt)",     kind: action, command: "STX '0' '0' '8' 'C' {val} ETX", range: "0000-0064 (Dull-Sharp)"}
  - {id: vcp_color_set,                label: "VCP-00-8A Color",               kind: action, command: "STX '0' '0' '8' 'A' {val} ETX", range: "0000-0064 (Pale-To Deep)"}
  - {id: vcp_color_alt_set,            label: "VCP-02-1F Color (alt)",         kind: action, command: "STX '0' '2' '1' 'F' {val} ETX", range: "0000-0064 (Pale-To Deep)"}
  - {id: vcp_tint_set,                 label: "VCP-00-90 Tint",                kind: action, command: "STX '0' '0' '9' '0' {val} ETX", range: "0000-0064 (Purplish-Greenish)"}
  - {id: vcp_reset_settings,           label: "VCP-02-CB Reset (Video/Audio/VGA/Network/All)", kind: action, command: "STX '0' '2' 'C' 'B' {val} ETX", enum: ["0001-All(Factory Reset)","0002-Picture","0003-Adjust","0004-Audio","0010-Network"]}
  - {id: vcp_sound_mode_set,           label: "VCP-10-B2 Sound Mode",          kind: action, command: "STX '1' '0' 'B' '2' {val} ETX", enum: ["0001-Standard","0002-Movie","0003-Music","0005-Custom"]}
  - {id: vcp_balance_set,              label: "VCP-00-93 Balance",             kind: action, command: "STX '0' '0' '9' '3' {val} ETX", range: "0000-0064 (Left-Right)"}
  - {id: vcp_surround_set,             label: "VCP-02-34 Surround",            kind: action, command: "STX '0' '2' '3' '4' {val} ETX", enum: ["0001-Off","0002-On"]}
  - {id: vcp_internal_speakers_set,    label: "VCP-11-BA Internal Speakers",   kind: action, command: "STX '1' '1' 'B' 'A' {val} ETX", enum: ["0000-No mean","0001-Off","0002-On","0003-Auto"]}
  - {id: vcp_audio_input_set,          label: "VCP-02-2E Audio Input",         kind: action, command: "STX '0' '2' '2' 'E' {val} ETX", enum: ["0001-Audio1","0002-Audio2(AV)","0004-HDMI1","0006-TV","000A-HDMI2","000B-HDMI3","000D-MP"]}
  - {id: vcp_audio_delay_set,          label: "VCP-10-CB Audio Delay",         kind: action, command: "STX '1' '0' 'C' 'B' {val} ETX", range: "0000-0064 (Small-Large)"}
  - {id: vcp_audio_source_mts_set,     label: "VCP-02-2C Audio Source (MTS)",  kind: action, command: "STX '0' '2' '2' 'C' {val} ETX", enum: ["0000-No mean","0001-main","0002-sub","0003-main+sub","0004-stereo","0005-mono","0006-dual","0007-SAP"], notes: "TV tuner models only"}
  - {id: vcp_audio_language_set,       label: "VCP-10-B3 Audio Language",      kind: action, command: "STX '1' '0' 'B' '3' {val} ETX", enum: ["0002-English","0003-Francais","000A-Espanol"], notes: "TV tuner models only"}
  - {id: vcp_reset_audio_settings,     label: "VCP-02-31 Reset Audio Settings", kind: action, command: "STX '0' '2' '3' '1' {val} ETX", enum: ["0001-Reset"]}
  - {id: vcp_osd_language_set,         label: "VCP-00-68 OSD Language",        kind: action, command: "STX '0' '0' '6' '8' {val} ETX", enum: ["0001-English","0002-Deutsch","0003-Francais","0004-Espanol"]}
  - {id: vcp_osd_transparency_set,     label: "VCP-02-B8 OSD Transparency",    kind: action, command: "STX '0' '2' 'B' '8' {val} ETX", enum: ["0001-Off","0002-30%","0003-50%","0004-70%"]}
  - {id: vcp_information_osd_set,      label: "VCP-02-3D Information OSD",     kind: action, command: "STX '0' '2' '3' 'D' {val} ETX", enum: ["0000-Off","0005-On"]}
  - {id: vcp_caption_display_set,      label: "VCP-10-84 Caption Display (Analog)", kind: action, command: "STX '1' '0' '8' '4' {val} ETX", enum: ["0000-No mean","0001-Off","0002-CC1","0003-CC2","0004-CC3","0005-CC4","0006-Text1","0007-Text2","0008-Text3","0009-Text4"], notes: "TV tuner models only"}
  - {id: vcp_digital_captions_set,     label: "VCP-10-A1 Digital Captions",    kind: action, command: "STX '1' '0' 'A' '1' {val} ETX", enum: ["0000-No mean","0001-Off","0002-CS1","0003-CS2","0004-CS3","0005-CS4","0006-CS5","0007-CS6"]}
  - {id: vcp_quick_start_set,          label: "VCP-11-EA Quick Start",         kind: action, command: "STX '1' '1' 'E' 'A' {val} ETX", enum: ["0001-Off","0002-On"]}
  - {id: vcp_auto_input_change_set,    label: "VCP-02-40 Auto Input Change",   kind: action, command: "STX '0' '2' '4' '0' {val} ETX", enum: ["0000-First","0002-None","0004-Custom"]}
  - {id: vcp_input_1_select,           label: "VCP-10-2E Input 1 Select",      kind: action, command: "STX '1' '0' '2' 'E' {val} ETX", enum: ["0001-VGA","0005-Video1(AV)","000C-DVD/HD1(VGA(YPbPr))","0011-HDMI1","0012-HDMI2","0082-HDMI3"]}
  - {id: vcp_input_2_select,           label: "VCP-10-2F Input 2 Select",      kind: action, command: "STX '1' '0' '2' 'F' {val} ETX", enum: ["0001-VGA","0005-Video1(AV)","000C-DVD/HD1(VGA(YPbPr))","0011-HDMI1","0012-HDMI2","0082-HDMI3"]}
  - {id: vcp_input_3_select,           label: "VCP-10-30 Input 3 Select",      kind: action, command: "STX '1' '0' '3' '0' {val} ETX", enum: ["0001-VGA","0005-Video1(AV)","000C-DVD/HD1(VGA(YPbPr))","0011-HDMI1","0012-HDMI2","0082-HDMI3"]}
  - {id: vcp_input_select_tv,          label: "VCP-00-60 Input Select",        kind: action, command: "STX '0' '0' '6' '0' {val} ETX", enum: ["0000-No mean","0001-VGA(RGB)","0005-Video1(AV)","0009-Tuner1(TV)","000C-DVD/HD1(VGA(YPbPr))","0011-HDMI1","0012-HDMI2","0082-HDMI3","0087-MP(Media Player)"], notes: "Tuner value TV-tuner models only"}
  - {id: vcp_cec_set,                  label: "VCP-11-76 CEC",                 kind: action, command: "STX '1' '1' '7' '6' {val} ETX", enum: ["0001-Off","0002-On"]}
  - {id: vcp_cec_auto_turn_off_set,    label: "VCP-11-77 CEC Auto Turn Off",   kind: action, command: "STX '1' '1' '7' '7' {val} ETX", enum: ["0001-Disable","0002-Enable"]}
  - {id: vcp_cec_audio_receiver_set,   label: "VCP-11-78 CEC Audio Receiver",  kind: action, command: "STX '1' '1' '7' '8' {val} ETX", enum: ["0001-Disable","0002-Enable"]}
  - {id: vcp_cec_device_list_set,      label: "VCP-11-79 CEC Device List",     kind: action, command: "STX '1' '1' '7' '9' {val} ETX", enum: ["0001-NO","0002-YES"]}
  - {id: vcp_edid_set,                 label: "VCP-10-AA EDID",                kind: action, command: "STX '1' '0' 'A' 'A' {val} ETX", enum: ["0001-Mode 0","0002-Mode 1","0003-Mode 2"]}
  - {id: vcp_video_range_set,          label: "VCP-10-40 Video Range",         kind: action, command: "STX '1' '0' '4' '0' {val} ETX", enum: ["0001-Expanded Signal","0002-Raw Signal","0003-Auto"]}
  - {id: vcp_vga_mode_set,             label: "VCP-10-8E VGA Mode",            kind: action, command: "STX '1' '0' '8' 'E' {val} ETX", enum: ["0001-RGB","0002-YPbPr"]}
  - {id: vcp_vga_auto_adjust,          label: "VCP-00-1E VGA Auto Adjust",     kind: action, command: "STX '0' '0' '1' 'E' {val} ETX", enum: ["0001-Execute"]}
  - {id: vcp_vga_h_position_set,       label: "VCP-00-20 VGA H.Position",      kind: action, command: "STX '0' '0' '2' '0' {val} ETX", range: "0000-0064 (Left-Right)"}
  - {id: vcp_vga_v_position_set,       label: "VCP-00-30 VGA V.Position",      kind: action, command: "STX '0' '0' '3' '0' {val} ETX", range: "0000-0064 (Bottom-Top)"}
  - {id: vcp_vga_clock_set,            label: "VCP-00-0E VGA Clock",           kind: action, command: "STX '0' '0' '0' 'E' {val} ETX", range: "0000-0064"}
  - {id: vcp_vga_phase_set,            label: "VCP-00-3E VGA Phase",           kind: action, command: "STX '0' '0' '3' 'E' {val} ETX", range: "0000-0064"}
  - {id: vcp_vga_h_resolution_set,     label: "VCP-02-50 VGA H.Resolution",    kind: action, command: "STX '0' '2' '5' '0' {val} ETX", range: "0000-FFFF (Low-High)"}
  - {id: vcp_vga_v_resolution_set,     label: "VCP-02-51 VGA V.Resolution",    kind: action, command: "STX '0' '2' '5' '1' {val} ETX", range: "0000-FFFF (Low-High)"}
  - {id: vcp_key_lock_set,             label: "VCP-00-FB Key Lock",            kind: action, command: "STX '0' '0' 'F' 'B' {val} ETX", enum: ["0000-Off","0001-Mode2","0002-Mode1"]}
  - {id: vcp_ir_lock_set,              label: "VCP-02-3F IR Lock",             kind: action, command: "STX '0' '2' '3' 'F' {val} ETX", enum: ["0001-Off","0004-Mode2","0005-Mode1"]}
  - {id: vcp_power_supply_set,         label: "VCP-11-75 Power Supply",        kind: action, command: "STX '1' '1' '7' '5' {val} ETX", enum: ["0001-ON","0003-OFF"]}
  - {id: vcp_led_indicator_set,        label: "VCP-02-BE LED Indicator",       kind: action, command: "STX '0' '2' 'B' 'E' {val} ETX", enum: ["0001-ON","0002-OFF"]}
  - {id: vcp_mute_settings_set,        label: "VCP-11-E9 Mute Settings",       kind: action, command: "STX '1' '1' 'E' '9' {val} ETX", enum: ["0001-Audio","0002-Video","0003-Audio & Video"]}
  - {id: vcp_thermal_warning_set,      label: "VCP-11-ED Thermal Warning Message", kind: action, command: "STX '1' '1' 'E' 'D' {val} ETX", enum: ["0000-No mean","0001-Off","0002-On"]}
  - {id: vcp_thermal_shutdown_set,     label: "VCP-10-8A Thermal Shutdown",    kind: action, command: "STX '1' '0' '8' 'A' {val} ETX", enum: ["0001-Off","0002-On"]}
  - {id: vcp_control_interface_set,    label: "VCP-10-3E Control Interface",   kind: action, command: "STX '1' '0' '3' 'E' {val} ETX", enum: ["0001-RS-232C","0002-LAN"]}
  - {id: vcp_monitor_id_set,           label: "VCP-02-3E Monitor ID",          kind: action, command: "STX '0' '2' '3' 'E' {val} ETX", range: "0001-0064"}
  # VCP-02-78 / VCP-02-79 referenced as Monitor Information reads in §8 - OP codes
  # not detailed beyond the table cross-reference.
  - {id: vcp_monitor_info_278_query,   label: "VCP-02-78 Monitor Information (read)", kind: query, command: "STX '0' '2' '7' '8' ETX", notes: "Referenced in §8 monitor info group; detailed semantics not in source"}
  - {id: vcp_monitor_info_279_query,   label: "VCP-02-79 Monitor Information (read)", kind: query, command: "STX '0' '2' '7' '9' ETX", notes: "Referenced in §8 monitor info group; detailed semantics not in source"}
  # OSD table marks the following as N/A (no VCP code) - recorded for completeness:
  # Digital Output, Visually Impaired, Menu Speech (TTS), Auto Channel Scan, Add/Skip Channels,
  # Favorite Channels, Channel Labels, Time Zone, Parental Controls, Energy Mode, Auto Power Down,
  # HPD Delay, USB Demo Mode, UnPlug USB, Sleep Timer, Schedule, Network DHCP/IP/Mask/Gateway/DNS/MAC.
  # These are N/A -> NOT emitted as actions (no payload documented).
```

## Feedbacks
```yaml
feedbacks:
  - id: null_message
    type: event
    trigger: "Monitor returns NULL message ('BE') on timeout (>10s), unsupported message type, BCC error, or when busy (Power ON/OFF, Auto Setup, Input, PIP Input, Factory reset)"
    command: "STX 'B' 'E' ETX"
    full_packet: "01h-30h-30h-41h-42h-30h-34h-02h-42h-45h-03h-CHK-0Dh"
  - id: command_reply
    type: reply
    description: "MsgType='B'. Generic command reply, format depends on command."
  - id: get_parameter_reply
    type: reply
    description: "MsgType='D'. Returns Result, OP page, OP code, Type, Max value, Current Value. Result '00'=No Error, '01'=Unsupported."
  - id: set_parameter_reply
    type: reply
    description: "MsgType='F'. Echoes Result, OP page, OP code, Type, Max, Requested Value."
  - id: result_code
    type: enum
    values: ["00-No Error", "01-Unsupported operation or unsupported under current condition"]
  - id: operation_type
    type: enum
    values: ["00-Set parameter", "01-Momentary (e.g. Auto Setup)"]
  - id: timing_status_byte
    type: bitmask
    description: "SS byte in CTL-07 timing reply"
    bits:
      bit7: "1 = Sync Frequency out of range / No signal"
      bit6: "1 = Unstable count"
      bit5_2: "Reserved"
      bit1: "H-sync polarity (1=positive)"
      bit0: "V-sync polarity (1=positive)"
  - id: temperature_sensor_count
    type: integer
    description: "Returned in VCP-02-78 reply - number of built-in temperature sensors (e.g. 3)"
  - id: temperature_value
    type: integer
    description: "VCP-02-79 readout, 2's complement, 0.5 deg C resolution (0032h = 25.0 C, FFFFh = -0.5 C)"
```

## Variables
```yaml
variables:
  - id: backlight
    op_code_page: "00"
    op_code: "10"
    type: integer
    range: "0000-0064 (0-100)"
    unit: percent
  - id: contrast
    op_code_page: "00"
    op_code: "12"
    type: integer
    range: "0000-0064"
  - id: color_temperature_warm_normal_cool
    op_code_page: "00"
    op_code: "0C"
    type: enum
    values: ["0023-Warm", "003F-Normal", "005A-Cool"]
  - id: monitor_id
    op_code_page: "02"
    op_code: "3E"
    type: integer
    range: "0001-0064 (1-100)"
  # The full set of settable VCP parameters is enumerated in the Actions section
  # above as vcp_*_set actions. Each carries its range/enum from §8.
```

## Events
```yaml
events:
  - id: null_message_event
    description: "Unsolicited NULL message ('BE') when monitor cannot respond or is executing a long operation."
    command: "STX 'B' 'E' ETX"
  - id: idle_disconnect
    description: "TCP connection dropped after 15 minutes of inactivity (per §3.2). Controller must reconnect."
  # UNRESOLVED: no other unsolicited push notifications documented in source.
```

## Macros
```yaml
macros:
  - id: change_backlight_macro
    description: "§6.1 documented procedure to change Backlight"
    steps:
      - "Get-parameter VCP-00-10 (read current backlight + max)"
      - "Set-parameter VCP-00-10 with new value (e.g. 0050h = 80)"
      - "Get-parameter VCP-00-10 (verify - recommended)"
      - "CTL-0C Save Current Settings (persist)"
  - id: read_temperature_macro
    description: "§6.2 documented procedure to read a built-in temperature sensor"
    steps:
      - "Set-parameter VCP-02-78 = 0001 (select sensor #1)"
      - "Get-parameter VCP-02-79 (returns temperature, 2's complement, 0.5 C resolution)"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power ON/OFF operations return NULL message if another command arrives during execution (per §5.5.3)."
  - "Monitor disconnects TCP after 15 minutes idle - controller must reconnect (per §3.2)."
  - "Auto Setup, Input change, PIP Input, Factory Reset also block concurrent commands (per §5.5.3)."
thermal_protection:
  - "VCP-11-ED Thermal Management Warning Message (Off/On)"
  - "VCP-10-8A Thermal Management Shutdown (Off/On)"
# UNRESOLVED: source contains no explicit safety interlock procedures, power-on
# sequencing, or voltage/current ratings. Thermal Management controls exist as
# OSD-settable parameters but no safety procedure is documented.
```

## Notes
- **Protocol duality:** the same ASCII-framed protocol runs over both RS-232C (9600 8N1) and TCP (port 7142). The only transport-specific difference is the physical layer; message format is identical.
- **Source identity:** §1 of the source text refers to "NEC LCD monitor" — this is a Sharp-rebadged NEC control protocol manual for the Sharp PROX5 Series. Manufacturer entity is Sharp per the input token.
- **Byte encoding:** all numeric payload bytes are ASCII-encoded as 2 hex characters (e.g. byte 3Ah is sent as ASCII '3','A' = 33h,41h). Implementers must encode/decode accordingly.
- **BCC calculation:** XOR of bytes D1 through D16 (Reserved through ETX inclusive). Worked example in §4.3.1 yields 77h for the sample Set-parameter packet.
- **Monitor / Group ID addressing:** Destination byte maps Monitor ID 1→'A'(41h) ... 100→A4h, '*'(2Ah) = all monitors. Group IDs A-J map to '1'-'9' and ':'. See §4.1.1 conversion table.
- **Packet interval:** controller must wait > 600 ms between commands (RS-232 and LAN).
- **TV-tuner-only commands** (marked in §8 with `(*1)`): VCP-02-2C (MTS), VCP-10-B3 (Audio Language), VCP-10-84 (Caption), CTL-C22C/C22D (TV Channel), VCP-00-60 Tuner value. US-only tuner models.
- **De content marked `N/A` in §8 table** (Digital Output, TTS, Schedule, Network IP fields, etc.) has no documented command payload and is intentionally omitted from Actions.

<!-- UNRESOLVED: Exact PROX5 sub-model numbers (e.g. Pro-60X5FD / Pro-70X5FD) not present in this source text — only "PROX5 Series" generic. -->
<!-- UNRESOLVED: Firmware version compatibility range not stated. -->
<!-- UNRESOLVED: RS-232C flow control not specified (assumed none). -->
<!-- UNRESOLVED: No password / authentication procedure documented; auth.type inferred none. -->
<!-- UNRESOLVED: VCP-02-78 and VCP-02-79 referenced only by name in §8 Monitor Information group — exact semantics (besides temp-sensor use shown in §6.2) not detailed. -->
<!-- UNRESOLVED: Voltage, current, power, and mechanical specs not in this source. -->
````

Spec above. Both RS-232 + TCP. ~85 actions: 14 CTL system + 65 VCP set/query + identity/power/RC. VCP-02-78/79 marked UNRESOLVED (referenced only). All N/A rows in §8 omitted (no payload).

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-06-15T12:48:55.532Z
last_checked_at: 2026-06-16T07:17:44.300Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:17:44.300Z
matched_actions: 86
action_count: 86
confidence: medium
summary: "All 86 spec actions have verbatim wire-literal matches in the source; transport parameters confirmed; source and spec are bidirectionally complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source §1 text refers to \"NEC LCD monitor\" — document is a Sharp-rebadged NEC protocol manual. Exact PROX5 sub-models (e.g. Pro-60X5FD / Pro-70X5FD) are not named in this source text. Voltage / current / power specs not in source."
- "flow control not stated in source"
- "no other unsolicited push notifications documented in source."
- "source contains no explicit safety interlock procedures, power-on"
- "Exact PROX5 sub-model numbers (e.g. Pro-60X5FD / Pro-70X5FD) not present in this source text — only \"PROX5 Series\" generic."
- "Firmware version compatibility range not stated."
- "RS-232C flow control not specified (assumed none)."
- "No password / authentication procedure documented; auth.type inferred none."
- "VCP-02-78 and VCP-02-79 referenced only by name in §8 Monitor Information group — exact semantics (besides temp-sensor use shown in §6.2) not detailed."
- "Voltage, current, power, and mechanical specs not in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
