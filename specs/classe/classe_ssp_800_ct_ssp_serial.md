---
spec_id: admin/classe-audio-ssp-800-ct-ssp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio SSP-800^CT-SSP Control Spec"
manufacturer: "Classé"
model_family: SSP-800
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - SSP-800
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_SSP-800_RS232_Protocol.pdf
retrieved_at: 2026-07-21T23:01:12.761Z
last_checked_at: 2026-10-07T12:48:06.089Z
generated_at: 2026-10-07T12:48:06.089Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "trigger 3 not documented in source"
  - "no standalone settable parameters documented separately from actions"
  - "no explicit multi-step macro sequences documented in source"
  - "no explicit safety warnings or interlock procedures beyond timing note above"
  - "firmware version compatibility not stated in source"
  - "flow control (RTS/CTS/XON/XOFF) not stated in source"
  - "port number (COM1, etc.) not stated in source"
  - "SCSM e-mail test mechanism not detailed in source"
  - "SSP-800 IR code table (referenced by IRC nnn) not included in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:48:06.089Z
  matched_actions: 55
  action_count: 55
  confidence: medium
  summary: "All 55 spec actions match source commands literally; the UART transport values are supported; the source catalogue is fully covered, with status strings in Feedbacks. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Classe Audio SSP-800^CT-SSP Control Spec

## Summary
Classe Audio SSP-800 is a surround sound processor (SSP) with RS-232C control interface. The documented UART configuration is 9600 baud, 8 data bits, no parity, 1 stop bit; system setup allows other baud selections. Commands use an address-field format (address "S800" + period + command), terminated by CR/LF. The device returns acknowledgements and unsolicited status reports.

<!-- UNRESOLVED: trigger 3 not documented in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # not stated in source
addressing:
  port: UNRESOLVED  # serial port number not stated in source
auth:
  type: UNRESOLVED  # authentication procedure not stated in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Address field "S800." is optional when the controller uniquely connects to
# the SSP-800. Commands shown below are the bare command strings; prepend
# "S800." (e.g. "S800.MAIN 1") for addressed operation. All lines terminated
# with CR/LF. Each recognized command yields a "!" ack within 100ms; "?" marks
# an unrecognized command.

- id: main_input
  label: Change Main Input
  kind: action
  command: "MAIN {n}"
  params:
    - name: n
      type: integer
      description: Input number

- id: minp_plus
  label: Step to Next Input
  kind: action
  command: "MINP+"
  params: []

- id: minp_minus
  label: Step to Previous Input
  kind: action
  command: "MINP-"
  params: []

- id: lpsn
  label: Set Current Configuration
  kind: action
  command: "LPSN {c}"
  params:
    - name: c
      type: integer
      description: Configuration number

- id: vola
  label: Set Volume
  kind: action
  command: "VOLA {vv}"
  params:
    - name: vv
      type: integer
      description: Absolute volume value (snapped to nearest possible)

- id: mvol_plus
  label: Step Main Volume Up
  kind: action
  command: "MVOL+"
  params: []

- id: mvol_minus
  label: Step Main Volume Down
  kind: action
  command: "MVOL-"
  params: []

- id: mute
  label: Engage Mute
  kind: action
  command: "MUTE"
  params: []

- id: unmnt
  label: Unmute
  kind: action
  command: "UNMT"
  params: []

- id: ball
  label: Shift Balance Left
  kind: action
  command: "BALL"
  params: []

- id: balc
  label: Re-center Balance
  kind: action
  command: "BALC"
  params: []

- id: balr
  label: Shift Balance Right
  kind: action
  command: "BALR"
  params: []

- id: sub_plus
  label: Sub Trim Up
  kind: action
  command: "SUB+"
  params: []

- id: sub_minus
  label: Sub Trim Down
  kind: action
  command: "SUB"
  params: []

- id: sub2_plus
  label: Sub2 Trim Up
  kind: action
  command: "SUB2+"
  params: []

- id: sub2_minus
  label: Sub2 Trim Down
  kind: action
  command: "SUB2"
  params: []

- id: sub3_plus
  label: Sub3 Trim Up
  kind: action
  command: "SUB3+"
  params: []

- id: sub3_minus
  label: Sub3 Trim Down
  kind: action
  command: "SUB3"
  params: []

- id: cnt_plus
  label: Center Trim Up
  kind: action
  command: "CNT+"
  params: []

- id: cnt_minus
  label: Center Trim Down
  kind: action
  command: "CNT"
  params: []

- id: srn_plus
  label: Surround Trim Up
  kind: action
  command: "SRN+"
  params: []

- id: srn_minus
  label: Surround Trim Down
  kind: action
  command: "SRN"
  params: []

- id: bak_plus
  label: Back Trim Up
  kind: action
  command: "BAK+"
  params: []

- id: bak_minus
  label: Back Trim Down
  kind: action
  command: "BAK"
  params: []

- id: lsy_plus
  label: Lip Sync Delay Up
  kind: action
  command: "LSY+"
  params: []

- id: lsy_minus
  label: Lip Sync Delay Down
  kind: action
  command: "LSY"
  params: []

- id: lsy0
  label: Restore No Lip Sync Delay
  kind: action
  command: "LSY0"
  params: []

- id: trm0
  label: Reset All Channel Trims to Zero
  kind: action
  command: "TRM0"
  params: []

- id: ddln
  label: Engage Dolby Digital Late Night Compression
  kind: action
  command: "DDLN"
  params: []

- id: ddnc
  label: Turn Off Dolby Digital Late Night Compression
  kind: action
  command: "DDNC"
  params: []

- id: stby
  label: Enter Standby
  kind: action
  command: "STBY"
  params: []

- id: oper
  label: Enter Operate Mode
  kind: action
  command: "OPER"
  params: []

- id: t1_0
  label: Trigger 1 Off
  kind: action
  command: "T1_0"
  params: []

- id: t1_1
  label: Trigger 1 On
  kind: action
  command: "T1_1"
  params: []

- id: t2_0
  label: Trigger 2 Off
  kind: action
  command: "T2_0"
  params: []

- id: t2_1
  label: Trigger 2 On
  kind: action
  command: "T2_1"
  params: []

- id: lcd0
  label: LCD Low Power Screen Saver Mode
  kind: action
  command: "LCD0"
  params: []

- id: lcd1
  label: LCD Low Intensity
  kind: action
  command: "LCD1"
  params: []

- id: lcd2
  label: LCD Medium Intensity
  kind: action
  command: "LCD2"
  params: []

- id: lcd3
  label: LCD High Intensity
  kind: action
  command: "LCD3"
  params: []

- id: irc
  label: Pass IR Code
  kind: action
  command: "IRC {nnn}"
  params:
    - name: nnn
      type: integer
      description: IR code number from SSP-800 IR code table

- id: csk
  label: Set Skin
  kind: action
  command: "CSK {n}"
  params:
    - name: n
      type: integer
      description: Skin number (1 = Classe; 5 = Green)

- id: eqon
  label: Activate Room EQ Filters
  kind: action
  command: "EQON"
  params: []

- id: eqoff
  label: Deactivate Room EQ Filters
  kind: action
  command: "EQOFF"
  params: []

- id: stat_main
  label: Request Main Volume and Input Selection
  kind: query
  command: "STAT MAIN"
  params: []

- id: stat_auto
  label: Enable Automatic Status Updates
  kind: query
  command: "STAT AUTO"
  params: []

- id: stat_off
  label: Disable Automatic Status Updates
  kind: query
  command: "STAT OFF"
  params: []

- id: stat_mode
  label: Request Current Post Processing Mode
  kind: query
  command: "STAT MODE"
  params: []

- id: stat_audio
  label: Request Current Audio Signal Status
  kind: query
  command: "STAT AUDIO"
  params: []

- id: stat_video
  label: Request Current Video Signal Status
  kind: query
  command: "STAT VIDEO"
  params: []

- id: stat_temp
  label: Request Current Internal Temperature
  kind: query
  command: "STAT TEMP"
  params: []

- id: stat_vers
  label: Request Software Version Information
  kind: query
  command: "STAT VERS"
  params: []

- id: stat_ac
  label: Request AC Voltage Sense Information
  kind: query
  command: "STAT AC"
  params: []

- id: scsm
  label: Request E-mail Test Transmission
  kind: query
  command: "SCSM"
  params: []

- id: amx
  label: AMX Auto Discovery Beacon Request
  kind: query
  command: "AMX"
  params: []
```

## Feedbacks
```yaml
- id: ack
  label: Command Acknowledged
  type: string
  values:
    - "!"  # command recognized

- id: nack
  label: Command Not Recognized
  type: string
  values:
    - "?"  # command not recognized

- id: sy_pwrup
  label: Power Up Complete
  type: string
  values:
    - "SY PWRUP"

- id: sy_stby
  label: Standby Mode
  type: string
  values:
    - "SY STBY"

- id: sy_oper
  label: Operate Mode
  type: string
  values:
    - "SY OPER"

- id: sy_vola
  label: Volume Absolute
  type: string
  description: "Returns SY VOLA vv or SY VOLA vv muted"

- id: sy_volr
  label: Volume Relative
  type: string
  description: "Returns SY VOLR +/- vv or SY VOLR +/- vv muted"

- id: sy_main
  label: Main Input Selected
  type: string
  description: "Returns SY MAIN n NN (input number and name)"

- id: sy_audio
  label: Audio Signal Status
  type: string
  description: "Returns SY AUDIO yy zz (stream type, sample rate)"

- id: sy_video
  label: Video Signal Status
  type: string
  description: "Returns SY VIDEO zz (resolution code)"

- id: sy_temp
  label: Internal Temperature
  type: string
  description: "Returns SY TEMP xx (degrees Centigrade)"

- id: sy_ac
  label: AC Line Voltage
  type: string
  description: "Returns SY AC zzz"

- id: sy_vers
  label: Software Version
  type: string
  description: "Returns SY VERS vvv"

- id: sy_mode
  label: Post Processing Mode
  type: string
  description: "Returns SY MODE n (mode code)"

- id: sy_dln
  label: Dolby Late Night Status
  type: string
  description: "Returns SY DLN n (0=off, 1=on)"

- id: sy_sub10
  label: LFE 10dB Offset Status
  type: string
  description: "Returns SY SUB10 n (0=0dB, 1=-10dB)"

- id: amxb
  label: AMX Auto Discovery Beacon
  type: string
  description: "Returns AMXB str"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters documented separately from actions
```

## Events
```yaml
# Automatic status updates (STAT AUTO) push SY* status strings unsolicited.
# No explicit per-event subscription mechanism documented beyond STAT AUTO/OFF.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "MVOL+ acceleration mode requires xVOL+/- commands received within 200ms of system reply"
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond timing note above
```

## Notes
Command and status strings are ASCII. Address field "S800" may be omitted when controller uniquely connects to SSP-800; commands without address field are interpreted for local operation. Recognized commands are acknowledged within 100ms; unrecognized commands receive "?". Reissue if no reply is received within 100ms. Volume display can append "muted" string when mute is engaged. The SSP-800 allows a 16-byte FIFO; the controller must accept status data without delays between bytes, and no minimum inter-byte time is required.

Appendix A documents audio stream types (0-28: RESERVED through NONE) and sample rates (2=32k, 3=44k, 4=48k, 5=88k, 6=96k, 7=192k, 10=176k). Appendix B documents video resolution codes (0-18: No Signal through VGA). Appendix C documents post processing modes (0-17: Mono through Dolby Digital EX). Available modes are source-dependent.

Skin 5 = Green per source. Document revision 1.5 dated 6 July 2010.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: flow control (RTS/CTS/XON/XOFF) not stated in source -->
<!-- UNRESOLVED: trigger 3 not documented in source -->
<!-- UNRESOLVED: port number (COM1, etc.) not stated in source -->
<!-- UNRESOLVED: SCSM e-mail test mechanism not detailed in source -->
<!-- UNRESOLVED: SSP-800 IR code table (referenced by IRC nnn) not included in source -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_SSP-800_RS232_Protocol.pdf
retrieved_at: 2026-07-21T23:01:12.761Z
last_checked_at: 2026-10-07T12:48:06.089Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:48:06.089Z
matched_actions: 55
action_count: 55
confidence: medium
summary: "All 55 spec actions match source commands literally; the UART transport values are supported; the source catalogue is fully covered, with status strings in Feedbacks. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "trigger 3 not documented in source"
- "no standalone settable parameters documented separately from actions"
- "no explicit multi-step macro sequences documented in source"
- "no explicit safety warnings or interlock procedures beyond timing note above"
- "firmware version compatibility not stated in source"
- "flow control (RTS/CTS/XON/XOFF) not stated in source"
- "port number (COM1, etc.) not stated in source"
- "SCSM e-mail test mechanism not detailed in source"
- "SSP-800 IR code table (referenced by IRC nnn) not included in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
