---
spec_id: admin/extron-mav-plus-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron MAV Plus Series Control Spec"
manufacturer: Extron
model_family: "MAV Plus Series"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "MAV Plus Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
retrieved_at: 2026-04-30T04:26:37.366Z
last_checked_at: 2026-05-14T18:17:15.869Z
generated_at: 2026-05-14T18:17:15.869Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number for Telnet not stated in source"
  - "firmware version compatibility not stated in source"
  - "maximum concurrent TCP connections not stated"
  - "TCP port number not stated in source"
  - "command symbol not in source\""
  - "no continuous settable parameters distinct from actions found in source"
  - "no multi-step sequences explicitly defined in source"
  - "no explicit safety warnings or interlock procedures in source."
  - "Telnet escape character conflict with SIS Esc key — source notes Ctrl+] is Telnet escape, Esc key is SIS Escape"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.869Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 99 spec actions matched literals in source; transport parameters documented and verified; comprehensive command coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Extron MAV Plus Series Control Spec

## Summary
The Extron MAV Plus Series is a family of RGBHV and stereo audio matrix switchers available in I/O configurations from 8x8 to 32x32. Control is via Extron's Simple Instruction Set (SIS) over RS-232/RS-422 serial and TCP/IP (Telnet) connections. The switcher supports input-to-output tie commands (with audio breakaway), audio gain/volume control, global and room-based presets, I/O grouping, and IP configuration.

<!-- UNRESOLVED: TCP port number for Telnet not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum concurrent TCP connections not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password
  levels: [administrator, user]
  # Default: both passwords set to carriage return (empty). Admin has full
  # access; user has limited access (cannot view/edit passwords). Password
  # protection applies to TCP/IP and Telnet connections only.
```

## Traits
```yaml
- routable    # inferred: input/output tie commands present
- queryable   # inferred: read commands for ties, gain, volume, mutes, presets
- levelable   # inferred: audio gain, attenuation, and volume control present
```

## Actions
```yaml
# ── Routing (tie) commands ──────────────────────────────────────────

- id: tie_input_output_va
  label: Tie Input to Output (Video + Audio)
  kind: action
  command: "X2*X3!"
  params:
    - name: input
      type: integer
      description: "Input number X2 (01-max inputs, 00=untied)"
    - name: output
      type: integer
      description: "Output number X3 (01-max outputs)"
  response: "Out(X3)•In(X2)•All"

- id: tie_input_output_rgbhv
  label: Tie Input to Output (RGBHV Only)
  kind: action
  command: "X2*X3&"
  params:
    - name: input
      type: integer
      description: "Input number X2"
    - name: output
      type: integer
      description: "Output number X3"
  response: "Out(X3)•In(X2)•RGB"

- id: tie_input_output_video
  label: Tie Input to Output (Video Only)
  kind: action
  command: "X2*X3%"
  params:
    - name: input
      type: integer
      description: "Input number X2"
    - name: output
      type: integer
      description: "Output number X3"
  response: "Out(X3)•In(X2)•Vid"

- id: tie_input_output_audio
  label: Tie Input to Output (Audio Only)
  kind: action
  command: "X2*X3$"
  params:
    - name: input
      type: integer
      description: "Input number X2"
    - name: output
      type: integer
      description: "Output number X3"
  response: "Out(X3)•In(X2)•Aud"

- id: quick_multiple_tie
  label: Quick Multiple Tie
  kind: action
  command: "Esc+Q X2*X3! ..."
  params:
    - name: ties
      type: string
      description: "Concatenated tie commands, e.g. 3*4! 3*5% 3*6$"
  response: Qik

- id: tie_input_all_va
  label: Tie Input to All Outputs (Video + Audio)
  kind: action
  command: "X2*!"
  params:
    - name: input
      type: integer
      description: "Input number X2"
  response: "In(X2)•All"

- id: tie_input_all_rgbhv
  label: Tie Input to All Outputs (RGBHV)
  kind: action
  command: "X2*&"
  params:
    - name: input
      type: integer
      description: "Input number X2"
  response: "In(X2)•RGB"

- id: tie_input_all_video
  label: Tie Input to All Outputs (Video)
  kind: action
  command: "X2*%"
  params:
    - name: input
      type: integer
      description: "Input number X2"
  response: "In(X2)•Vid"

- id: tie_input_all_audio
  label: Tie Input to All Outputs (Audio)
  kind: action
  command: "X2*$"
  params:
    - name: input
      type: integer
      description: "Input number X2"
  response: "In(X2)•Aud"

# ── Video mute ───────────────────────────────────────────────────────

- id: video_mute
  label: Video Mute Output
  kind: action
  command: "X3*1B"
  params:
    - name: output
      type: integer
      description: "Output number X3"
  response: "Vmt(X3)*1"

- id: video_unmute
  label: Video Unmute Output
  kind: action
  command: "X3*0B"
  params:
    - name: output
      type: integer
      description: "Output number X3"
  response: "Vmt(X3)*0"

- id: global_video_mute
  label: Global Video Mute All
  kind: action
  command: "1*B"
  params: []
  response: Vmt1

- id: global_video_unmute
  label: Global Video Unmute All
  kind: action
  command: "0*B"
  params: []
  response: Vmt0

# ── Audio mute ───────────────────────────────────────────────────────

- id: audio_mute
  label: Audio Mute Output
  kind: action
  command: "X3*1Z"
  params:
    - name: output
      type: integer
      description: "Output number X3"
  response: "Amt(X3)*1"

- id: audio_unmute
  label: Audio Unmute Output
  kind: action
  command: "X3*0Z"
  params:
    - name: output
      type: integer
      description: "Output number X3"
  response: "Amt(X3)*0"

- id: global_audio_mute
  label: Global Audio Mute All
  kind: action
  command: "1*Z"
  params: []
  response: Amt1

- id: global_audio_unmute
  label: Global Audio Unmute All
  kind: action
  command: "0*Z"
  params: []
  response: Amt0

# ── Audio gain / attenuation (CASE SENSITIVE: G=gain, g=attenuation) ─

- id: set_input_audio_gain
  label: Set Input Audio Gain
  kind: action
  command: "X1*X5G"
  params:
    - name: input
      type: integer
      description: "Input number X1"
    - name: gain_db
      type: integer
      description: "Gain 0-24 dB (X5)"
  response: "In(X1)•Aud(X4)"

- id: set_input_audio_attenuation
  label: Set Input Audio Attenuation
  kind: action
  command: "X1*X6g"
  params:
    - name: input
      type: integer
      description: "Input number X1"
    - name: atten_db
      type: integer
      description: "Attenuation 1-18 dB (X6)"
  response: "In(X1)•Aud(X4)"

- id: increment_audio_gain
  label: Increment Audio Gain (+1 dB)
  kind: action
  command: "X1+G"
  params:
    - name: input
      type: integer
      description: "Input number X1"
  response: "In(X1)•Aud(X4)"

- id: decrement_audio_gain
  label: Decrement Audio Gain (-1 dB)
  kind: action
  command: "X1-G"
  params:
    - name: input
      type: integer
      description: "Input number X1"
  response: "In(X1)•Aud(X4)"

# ── Audio volume ─────────────────────────────────────────────────────

- id: set_audio_volume
  label: Set Audio Output Volume
  kind: action
  command: "X3*X7V"
  params:
    - name: output
      type: integer
      description: "Output number X3"
    - name: level
      type: integer
      description: "Volume 0-64 steps (X7). 0=0%, 64=100%"
  response: "Out(X3)•Vol(X7)"

- id: increment_audio_volume
  label: Increment Audio Volume
  kind: action
  command: "X3+V"
  params:
    - name: output
      type: integer
      description: "Output number X3"
  response: "Out(X3)•Vol(X7)"

- id: decrement_audio_volume
  label: Decrement Audio Volume
  kind: action
  command: "X3-V"
  params:
    - name: output
      type: integer
      description: "Output number X3"
  response: "Out(X3)•Vol(X7)"

# ── RGB delay ────────────────────────────────────────────────────────

- id: set_rgb_delay
  label: Set RGB Delay
  kind: action
  command: "Esc X3*X13D"
  params:
    - name: output
      type: integer
      description: "Output number X3"
    - name: delay_half_sec
      type: integer
      description: "Delay in 0.5 s increments (X13), max 10"
  response: "Out(X3)•Dly(X13)"

# ── Preset save / recall ─────────────────────────────────────────────

- id: save_global_preset
  label: Save Global Preset
  kind: action
  command: "X11,"
  params:
    - name: preset
      type: integer
      description: "Preset number X11 (01-32)"
  response: "Spr(X11)"
  note: "Command character is a comma"

- id: recall_global_preset
  label: Recall Global Preset
  kind: action
  command: "X11."
  params:
    - name: preset
      type: integer
      description: "Preset number X11"
  response: "Rpr(X11)"
  note: "Command character is a period"

- id: clear_global_preset
  label: Clear Global Preset
  kind: action
  command: "Esc+ X11 P0*!"
  params:
    - name: preset
      type: integer
      description: "Preset number X11"
  response: "Spr(X11)"

- id: directly_write_global_preset
  label: Directly Write Global Preset
  kind: action
  command: "Esc+ X11 P X2*X3! ..."
  params:
    - name: preset
      type: integer
      description: "Preset number X11"
    - name: ties
      type: string
      description: "Tie commands e.g. 2*5! 10*9$ 13*11%"
  response: "Spr(X11)"
  note: "Precede with clear_global_preset for same preset number"

- id: save_room_preset
  label: Save Room Preset
  kind: action
  command: "X8*X12,"
  params:
    - name: room
      type: integer
      description: "Room number X8 (1-10)"
    - name: preset
      type: integer
      description: "Room preset number X12 (1-10)"
  response: "Rmm(X8)•Spr(X12)"

- id: recall_room_preset
  label: Recall Room Preset
  kind: action
  command: "X8*X12."
  params:
    - name: room
      type: integer
      description: "Room number X8"
    - name: preset
      type: integer
      description: "Room preset number X12"
  response: "Rmm(X8)•Rpr(X12)"

- id: directly_write_room_preset
  label: Directly Write Room Preset
  kind: action
  command: "Esc+ X8*X12 P X2*X3! ..."
  params:
    - name: room
      type: integer
      description: "Room number X8"
    - name: preset
      type: integer
      description: "Room preset number X12"
    - name: ties
      type: string
      description: "Tie commands"
  response: "Rmm(X8)•Spr(X12)"

- id: write_room_outputs
  label: Assign Outputs to Room
  kind: action
  command: "Esc X8,Y1,Y2,...Yn MR"
  params:
    - name: room
      type: integer
      description: "Room number X8 (1-10)"
    - name: outputs
      type: string
      description: "Comma-separated output numbers, max 16 per room"
  response: "Mpr(X8,Y1,Y2,...Yn)"

# ── Naming ───────────────────────────────────────────────────────────

- id: write_input_name
  label: Name Input
  kind: action
  command: "Esc X1,X19 NI"
  params:
    - name: input
      type: integer
      description: "Input number X1"
    - name: name
      type: string
      description: "Up to 12 chars (X19)"
  response: "Nmi(X1,X19)"

- id: write_output_name
  label: Name Output
  kind: action
  command: "Esc X1,X19 NO"
  params:
    - name: output
      type: integer
      description: "Output number X1"
    - name: name
      type: string
      description: "Up to 12 chars (X19)"
  response: "Nmo(X1,X19)"

- id: write_global_preset_name
  label: Name Global Preset
  kind: action
  command: "Esc X11,X19 NG"
  params:
    - name: preset
      type: integer
      description: "Preset number X11"
    - name: name
      type: string
      description: "Up to 12 chars (X19)"
  response: "Nmg(X11,X19)"

- id: write_room_name
  label: Name Room
  kind: action
  command: "Esc X8,X19 NR"
  params:
    - name: room
      type: integer
      description: "Room number X8"
    - name: name
      type: string
      description: "Up to 11 chars (X19)"
  response: "Nmr(X8,X19)"

- id: write_room_preset_name
  label: Name Room Preset
  kind: action
  command: "Esc X8*X12,X19 NP"
  params:
    - name: room
      type: integer
      description: "Room number X8"
    - name: preset
      type: integer
      description: "Room preset number X12"
    - name: name
      type: string
      description: "Up to 12 chars (X19)"
  response: "Nmp(X8*X12,X19)"

# ── I/O grouping ─────────────────────────────────────────────────────

- id: write_input_grouping
  label: Set Input Grouping
  kind: action
  command: "Esc X10[1] X10[2] ... X10[n] I"
  params:
    - name: groups
      type: string
      description: "Space-separated group numbers 0-4 per input (0=none)"
  response: "Gri X10[1] X10[2] ... X10[n]"

- id: write_output_grouping
  label: Set Output Grouping
  kind: action
  command: "Esc X10[1] X10[2] ... X10[n] O"
  params:
    - name: groups
      type: string
      description: "Space-separated group numbers 0-4 per output (0=none)"
  response: "Gro X10[1] X10[2] ... X10[n]"

# ── Lock (executive) mode ────────────────────────────────────────────

- id: lock_all_front_panel
  label: Lock All Front Panel
  kind: action
  command: "1X"
  params: []
  response: Exe1

- id: lock_advanced_front_panel
  label: Lock Advanced Front Panel
  kind: action
  command: "2X"
  params: []
  response: Exe2

- id: unlock_front_panel
  label: Unlock Front Panel
  kind: action
  command: "0X"
  params: []
  response: Exe0

# ── Reset commands ───────────────────────────────────────────────────

- id: reset_global_presets_names
  label: Reset All Global Presets and Names
  kind: action
  command: "Esc ZG"
  params: []
  response: Zpg

- id: reset_individual_global_preset
  label: Reset Individual Global Preset
  kind: action
  command: "Esc X11 ZG"
  params:
    - name: preset
      type: integer
      description: "Preset number X11"
  response: "Zpg(X11)"

- id: reset_rgb_delays
  label: Reset All RGB Delays
  kind: action
  command: "Esc ZD"
  params: []
  response: Zpd
  note: "Resets all RGB delays to 0.0 seconds"

- id: reset_audio_input_levels
  label: Reset All Audio Input Levels
  kind: action
  command: "Esc ZA"
  params: []
  response: Zpa
  note: "Resets all audio gain/attenuation to 0 dB"

- id: reset_audio_output_levels
  label: Reset All Audio Output Levels
  kind: action
  command: "Esc ZV"
  params: []
  response: Zpv
  note: "Resets all output volume to 100%"

- id: reset_all_mutes
  label: Reset All Mutes
  kind: action
  command: "Esc ZZ"
  params: []
  response: Zpz

- id: reset_room_map
  label: Reset Room Map
  kind: action
  command: "Esc ZR"
  params: []
  response: Zpr
  note: "Clears all room presets"

- id: reset_individual_room
  label: Reset Individual Room
  kind: action
  command: "Esc X8 ZR"
  params:
    - name: room
      type: integer
      description: "Room number X8"
  response: "Zpr(X8)"

- id: reset_individual_room_preset
  label: Reset Individual Room Preset
  kind: action
  command: "Esc X8*X12 ZP"
  params:
    - name: room
      type: integer
      description: "Room number X8"
    - name: preset
      type: integer
      description: "Room preset number X12"
  response: "Zpp(X8*X12)"

- id: reset_flash
  label: Reset Flash Memory
  kind: action
  command: "Esc ZFFF"
  params: []
  response: Zpf
  note: "Erases user-supplied files"

- id: reset_whole_switcher
  label: Reset Whole Switcher
  kind: action
  command: "Esc ZXXX"
  params: []
  response: Zpx
  note: "Clears all ties/presets, resets audio gain to 0 dB, volume to 100%"

- id: absolute_reset
  label: Absolute Reset
  kind: action
  command: "Esc ZQQQ"
  params: []
  response: Zpq
  note: "Same as reset_whole_switcher plus clears IP to 192.168.254.254, subnet to 255.255.0.0"

# ── IP configuration ─────────────────────────────────────────────────

- id: set_matrix_name
  label: Set Matrix Name
  kind: action
  command: "Esc X30 CN"
  params:
    - name: name
      type: string
      description: "Up to 240 chars (X30)"
  response: "Ipn•(X30)"

- id: reset_matrix_name
  label: Reset Matrix Name to Factory Default
  kind: action
  command: "Esc •CN"
  params: []
  response: "Ipn•(X31)"

- id: set_time_date
  label: Set Time and Date
  kind: action
  command: "Esc X32 CT"
  params:
    - name: datetime
      type: string
      description: "MM/DD/YY•HH:MM:SS"
  response: "Ipt(X32)"

- id: set_gmt_offset
  label: Set GMT Offset
  kind: action
  command: "Esc X34 CZ"
  params:
    - name: offset
      type: number
      description: "-12.0 to +14.0"
  response: "Ipz(X34)"

- id: set_dst
  label: Set Daylight Saving Time
  kind: action
  command: "Esc X35 CX"
  params:
    - name: mode
      type: integer
      description: "0=off, 1=on northern hemisphere, 2=on Europe, 3=on Brazil"
  response: "Ipx(X35)"

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "Esc X36 CI"
  params:
    - name: ip
      type: string
      description: "IP address"
  response: "Ipi(X36)"

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "Esc X36 CS"
  params:
    - name: mask
      type: string
      description: "Subnet mask"
  response: "Ips(X36)"

- id: set_gateway
  label: Set Gateway IP Address
  kind: action
  command: "Esc X36 CG"
  params:
    - name: gateway
      type: string
      description: "Gateway IP address"
  response: "Ipg(X36)"

- id: set_admin_password
  label: Set Administrator Password
  kind: action
  command: "Esc X39 CA"
  params:
    - name: password
      type: string
      description: "Up to 12 alphanumeric chars"
  response: "Ipa•(X39)"

- id: clear_admin_password
  label: Clear Administrator Password
  kind: action
  command: "Esc •CA"
  params: []
  response: "Ipa•(X30)"

- id: set_user_password
  label: Set User Password
  kind: action
  command: "Esc X39 CU"
  params:
    - name: password
      type: string
      description: "Up to 12 alphanumeric chars"
  response: "Ipu(X39)"

- id: clear_user_password
  label: Clear User Password
  kind: action
  command: "Esc •CU"
  params: []
  response: "Ipu•(X30)"

- id: set_dhcp
  label: Set DHCP On/Off
  kind: action
  command: "Esc X46 DH"
  params:
    - name: enabled
      type: integer
      description: "0=off, 1=on"
  response: "Idh(X46)"

- id: set_serial_port_params
  label: Set Serial Port Parameters
  kind: action
  command: "Esc X47*X48,X49,X50,X51 CP"
  params:
    - name: port
      type: integer
      description: "Port number 00-99 (00=all ports)"
    - name: baud_rate
      type: integer
      description: "9600, 19200, 38400, or 115200"
    - name: parity
      type: string
      description: "O=odd, e=even, n=none, m=mark, s=space (first letter)"
    - name: data_bits
      type: integer
      description: "7 or 8"
    - name: stop_bits
      type: integer
      description: "1 or 2"
  response: "Cpn(X47)•Cty(X48,X49,X50,X51)"

- id: set_port_mode
  label: Set Serial Port Mode
  kind: action
  command: "Esc X47*X52 CY"
  params:
    - name: port
      type: integer
      description: "Port number"
    - name: mode
      type: integer
      description: "0=RS-232, 1=RS-422, 2=RS-485"
  response: "Cpn(X47)•Cty(X52)"

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "Esc X53 CV"
  params:
    - name: mode
      type: integer
      description: "0=clear/none (Telnet default), 1=verbose (serial default), 2=tagged, 3=verbose+tagged"
  response: "Vrb(X53)"

# ── E-mail notification configuration ────────────────────────────────

- id: set_mail_server
  label: Set Mail Server and Domain
  kind: action
  command: "Esc X36,X40,X39 CM"
  params:
    - name: server_ip
      type: string
      description: "Mail server IP"
    - name: domain
      type: string
      description: "Domain name"
    - name: password
      type: string
      description: "Password"
  response: "Ipm(X36,X40,X39)"

- id: set_email_recipient
  label: Set Email Recipient
  kind: action
  command: "Esc X41,X42 CR"
  params:
    - name: account
      type: integer
      description: "Account 65-72 (65=recipient #1 … 72=#8)"
    - name: email
      type: string
      description: "Email address"
  response: "Ipr(X42),"

- id: set_email_events
  label: Set Email Notification Events
  kind: action
  command: "Esc X41,X43,X44,...X44 EM"
  params:
    - name: account
      type: integer
      description: "Account 65-72"
    - name: notify_when
      type: integer
      description: "0=none, 1=fail/missing, 2=fixed/restored, 3=both"
    - name: sources
      type: string
      description: "Input numbers, 98=power supply, 99=fans"
  response: "Ipe(X45)"
```

## Feedbacks
```yaml
# ── Tie state ────────────────────────────────────────────────────────

- id: read_tie_rgbhv
  label: Read RGBHV Output Tie
  type: integer
  command: "X3&"
  response: "X2"
  description: "Returns input number X2 tied to output X3"

- id: read_tie_video
  label: Read Video Output Tie
  type: integer
  command: "X3%"
  response: "X2"
  description: "Returns input number X2 tied to output X3"

- id: read_tie_audio
  label: Read Audio Output Tie
  type: integer
  command: "X3$"
  response: "X2"
  description: "Returns input number X2 tied to output X3"

# ── Mute state ───────────────────────────────────────────────────────

- id: read_video_mute
  label: Read Video Mute
  type: enum
  values: ["0", "1"]
  command: "X3B"
  description: "1=mute on, 0=mute off"

- id: read_audio_mute
  label: Read Audio Mute
  type: enum
  values: ["0", "1"]
  command: "X3Z"
  description: "1=mute on, 0=mute off"

- id: view_all_output_mutes
  label: View All Output Mutes
  type: string
  command: "Esc VM"
  response: "Mut X14[1] X14[2] ... X14[n]"
  description: "Each X14: 0=no mute, 1=video mute, 2=audio mute, 3=both. Only in Verbose mode 3."

# ── Audio levels ─────────────────────────────────────────────────────

- id: read_input_gain
  label: Read Input Audio Gain
  type: integer
  command: "X1G"
  response: "X4"
  description: "dB value, -18 to +24"

- id: read_output_volume
  label: Read Output Volume
  type: integer
  command: "X3V"
  response: "X7"
  description: "Volume level 0-64"

# ── RGB delay ────────────────────────────────────────────────────────

- id: read_rgb_delay
  label: Read RGB Delay
  type: integer
  command: "Esc X3D"
  response: "X13"
  description: "Delay in 0.5 s increments"

# ── DSVP ─────────────────────────────────────────────────────────────

- id: read_sync_frequency
  label: Read Input Sync Frequency
  type: string
  command: "X1 LS"
  response: "X15,X15"
  description: "H freq (kHz), V freq (Hz). Returns 000.00,000.00 if no connection."

- id: view_connections
  label: View Input Connection Status
  type: string
  command: "0LS"
  description: "CrossPoint 450 Plus only. Each X16: 0=not connected, 1=connected."

# ── Preset configuration ─────────────────────────────────────────────

- id: view_video_preset_config
  label: View Video Global Preset Configuration
  type: string
  command: "Esc X11*X3*1VC"
  response: "X2[1]•X2[2]•...•X2[16]•Vid"
  description: "Shows 16 sequential video tie assignments starting from output X3. X11=0 for current config."

- id: view_audio_preset_config
  label: View Audio Global Preset Configuration
  type: string
  command: "Esc X11*X3*2VC"
  response: "X2[1]•X2[2]•...•X2[16]•Aud"
  description: "Shows 16 sequential audio tie assignments starting from output X3. X11=0 for current config."

# ── Device information ───────────────────────────────────────────────

- id: info_request
  label: Information Request
  type: string
  command: "I"
  response: "V(X2)X(X3)•A(X2)X(X3)"
  description: "Matrix size, e.g. V32X16•A32X16"

- id: read_part_number
  label: Read Part Number
  type: string
  command: "N"
  response: "xx-xxx-xx"

- id: read_firmware_version
  label: Read Firmware Version
  type: string
  command: "Q"
  response: "X17"
  description: "Firmware version x.xx"

- id: read_firmware_verbose
  label: Read Verbose Firmware Info
  type: string
  command: "0Q"
  description: "Ethernet firmware - controller firmware - update firmware. Running version marked with *."

- id: read_lock_mode
  label: Read Lock Mode
  type: enum
  values: ["0", "1", "2"]
  command: "X"
  description: "0=unlocked, 1=lock all, 2=lock advanced"

# ── I/O grouping reads ──────────────────────────────────────────────

- id: read_input_grouping
  label: Read Input Grouping
  type: string
  command: "Esc I"
  response: "X10[1] X10[2] ... X10[n]"
  description: "Group number per input, 0=not grouped"

- id: read_output_grouping
  label: Read Output Grouping
  type: string
  command: "Esc O"
  response: "X10[1] X10[2] ... X10[n]"
  description: "Group number per output, 0=not grouped"

# ── Name reads ───────────────────────────────────────────────────────

- id: read_input_name
  label: Read Input Name
  type: string
  command: "Esc X1 NI"

- id: read_output_name
  label: Read Output Name
  type: string
  command: "Esc X1 NO"

- id: read_global_preset_name
  label: Read Global Preset Name
  type: string
  command: "Esc X11 NG"

- id: read_room_name
  label: Read Room Name
  type: string
  command: "Esc X8 NR"

- id: read_room_preset_name
  label: Read Room Preset Name
  type: string
  command: "Esc X8*X12 NP"

- id: read_room_outputs
  label: Read Room Outputs
  type: string
  command: "Esc X8 MR"
  response: "X19,Y1,Y2,...Yn"

# ── IP configuration reads ───────────────────────────────────────────

- id: read_matrix_name
  label: Read Matrix Name
  type: string
  command: "Esc CN"

- id: read_time_date
  label: Read Time and Date
  type: string
  command: "Esc CT"
  description: "Day, DD Mmm YYYY HH:MM:SS"

- id: read_gmt_offset
  label: Read GMT Offset
  type: number
  command: "Esc CZ"

- id: read_dst
  label: Read Daylight Saving Time
  type: integer
  command: "Esc CX"

- id: read_ip_address
  label: Read IP Address
  type: string
  command: "Esc CI"

- id: read_hardware_address
  label: Read Hardware (MAC) Address
  type: string
  command: "Esc CH"

- id: read_open_connections
  label: Read Number of Open Connections
  type: integer
  command: "Esc CC"
  description: "0-255"

- id: read_subnet_mask
  label: Read Subnet Mask
  type: string
  command: "Esc CS"

- id: read_gateway
  label: Read Gateway IP Address
  type: string
  command: "Esc CG"

- id: read_admin_password
  label: Read Administrator Password
  type: string
  command: "Esc CA"

- id: read_user_password
  label: Read User Password
  type: string
  command: "Esc CU"

- id: read_dhcp
  label: Read DHCP Status
  type: integer
  command: "Esc DH"
  description: "0=off, 1=on"

- id: read_serial_port_params
  label: Read Serial Port Parameters
  type: string
  command: "Esc X47 CP"
  response: "X48,X49,X50,X51"

- id: read_port_mode
  label: Read Serial Port Mode
  type: integer
  command: "Esc X47 CY"
  description: "0=RS-232, 1=RS-422, 2=RS-485"

- id: read_verbose_mode
  label: Read Verbose Mode
  type: integer
  command: "Esc CV"
  description: "0-3"

- id: read_email_recipient
  label: Read Email Recipient
  type: string
  command: "Esc X41 CR"

- id: read_email_events
  label: Read Email Events
  type: string
  command: "Esc X41 EM"

- id: read_ram_status
  label: Read RAM Status
  type: enum
  values: ["0", "1"]
  description: "0=RAM dirty (needs save), 1=RAM saved. # UNRESOLVED: command symbol not in source"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable parameters distinct from actions found in source
# Audio volume (0-64) and gain (-18 to +24 dB) are set via action commands.
```

## Events
```yaml
- id: power_on_copyright
  description: "Sent on power-on or when IP connection is established. Format: (c) Copyright 2007, Extron Electronics CP 300 450 MAV IP, V x.xx, 60-nnn-nn {day, date, time}. Day/date/time only via LAN port."

- id: password_prompt
  description: "Sent when connected via TCP/IP/Telnet and switcher is password protected. Repeats until valid password entered."

- id: login_administrator
  description: "Sent after valid administrator password entered."

- id: login_user
  description: "Sent after valid user password entered."

- id: front_panel_tie
  message: Qik
  description: "Front panel switching operation occurred."

- id: front_panel_preset_saved
  message: "Spr nn"
  description: "Memory preset saved from front panel. nn is preset number."

- id: front_panel_preset_recalled
  message: "Rpr nn"
  description: "Memory preset recalled from front panel. nn is preset number."

- id: front_panel_audio_level
  message: "In nn Aud xx"
  description: "Front panel input audio level change. nn=input, xx=dB level."

- id: front_panel_volume_change
  message: "Out nn Vol xx"
  description: "Front panel output volume change. nn=output, xx=volume level."

- id: front_panel_video_mute
  message: "Vmt nn x"
  description: "Video output mute toggled from front panel. nn=output, x=1 on / 0 off."

- id: front_panel_audio_mute
  message: "Amt nn x"
  description: "Audio output mute toggled from front panel. nn=output, x=1 on / 0 off."

- id: front_panel_executive_mode
  message: "Exe n"
  description: "Executive mode toggled from front panel. n=1 on / 0 off."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Reset commands (Esc ZXXX, Esc ZQQQ) clear all state without confirmation.
```

## Notes
- SIS commands do not require special start/end characters. Each response ends with CR/LF.
- Input and output numbers can be 1-, 2-, or 3-digit. Responses always report 2-digit numbers.
- Gain commands are **case sensitive**: uppercase `G` for gain, lowercase `g` for attenuation.
- The `&` and `%` tie commands are interchangeable for RGB/video on CrossPoint 450 Plus and MAV Plus.
- A "room" is a subset of up to 16 outputs; max 10 rooms supported.
- Room presets can have up to 10 presets each. Global presets up to 32.
- Default IP address: 192.168.254.254, subnet: 255.255.0.0, gateway: 0.0.0.0.
- Ethernet supports 10/100Base-T, half/full duplex with autodetect.
- Extron recommends leaving serial ports at 9600 baud.
- Invalid characters in names/passwords: `~ , @ = ' [ ] { } < > ' " ; : | \ ?`
- Error codes: E01 (invalid input), E10 (invalid command), E11 (invalid preset), E12 (invalid output), E13 (invalid value), E14 (illegal for config), E17 (timeout), E21 (invalid room), E24 (privilege violation).
- The source document covers both CrossPoint 450 Plus and MAV Plus; most commands are shared. DSVP view-connections (0LS) is CrossPoint 450 Plus only.

<!-- UNRESOLVED: TCP port number for Telnet not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum concurrent TCP connections not stated -->
<!-- UNRESOLVED: Telnet escape character conflict with SIS Esc key — source notes Ctrl+] is Telnet escape, Esc key is SIS Escape -->

## Provenance

```yaml
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
retrieved_at: 2026-04-30T04:26:37.366Z
last_checked_at: 2026-05-14T18:17:15.869Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.869Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 99 spec actions matched literals in source; transport parameters documented and verified; comprehensive command coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number for Telnet not stated in source"
- "firmware version compatibility not stated in source"
- "maximum concurrent TCP connections not stated"
- "TCP port number not stated in source"
- "command symbol not in source\""
- "no continuous settable parameters distinct from actions found in source"
- "no multi-step sequences explicitly defined in source"
- "no explicit safety warnings or interlock procedures in source."
- "Telnet escape character conflict with SIS Esc key — source notes Ctrl+] is Telnet escape, Esc key is SIS Escape"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
