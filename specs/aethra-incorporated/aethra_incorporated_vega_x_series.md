---
spec_id: admin/aethra-incorporated-vega-x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aethra Incorporated Vega X Series Control Spec"
manufacturer: "Aethra Incorporated"
model_family: "Vega X Series"
aliases: []
compatible_with:
  manufacturers:
    - "Aethra Incorporated"
  models:
    - "Vega X Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - "https://web.archive.org/web/20061015180105/http://edirectory.aethra.net:80/edirectory/downweb.asp?ID=5306"
retrieved_at: 2026-08-16T18:13:45.266Z
last_checked_at: 2026-10-01T12:39:03.541Z
generated_at: 2026-10-01T12:39:03.541Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no serial baud rate default stated in source (rate is configurable 1200-115200 via TD command); no electrical specs; protocol applies to product range (Vega, AVCxxx, Maia, VegaPro), not exclusively Vega X Series"
  - "no default baud rate stated; selectable via TD command ('1'=1200,'2'=2400,'3'=4800,'4'=9600,'5'=19200,'9'=38400,'6'=56000,'7'=57600,'8'=115200)"
  - "not stated in source"
  - "RS-232 baud rate default — not stated (selectable via TD; no factory default given)"
  - "serial flow control — not stated in source"
  - "firmware version compatibility — not stated (TCU version only appears in IP reply at runtime)"
  - "protocol version — document revision 10.2.12 (6/16/2006), no protocol version number stated"
  - "ETS 300 cause table content referenced but not included in source"
  - "voltage/current/power specs — not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-01T12:39:03.541Z
  matched_actions: 91
  action_count: 91
  confidence: medium
  summary: "All 91 controller-issued AT[ sub-type commands from the Aethra spec match the source verbatim, transport parameters agree (port 55003, 8/N/1), and source indications/errors are represented via Feedbacks and Events. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# Aethra Incorporated Vega X Series Control Spec

## Summary
Aethra videoconference terminals (Vega, AVCxxx and related products, termed AETE) controlled from an external PC (C&I) via ASCII "AT[" proprietary extension commands over RS-232 or a proprietary TCP/IP protocol on port 55003. Covers initialization, terminal/network/phone-directory configuration, call control, multipoint (MCU) control, control & indication (camera, mute, volume, streaming), and data services. Source: "Control & Indication Specifications for Aethra Videoconference Product Range", Rev 10.2.12, dated 6/16/2006.

<!-- UNRESOLVED: no serial baud rate default stated in source (rate is configurable 1200-115200 via TD command); no electrical specs; protocol applies to product range (Vega, AVCxxx, Maia, VegaPro), not exclusively Vega X Series -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 55003  # proprietary TCP/IP protocol, not Telnet; max 5 concurrent clients
serial:
  baud_rate: null  # UNRESOLVED: no default baud rate stated; selectable via TD command ('1'=1200,'2'=2400,'3'=4800,'4'=9600,'5'=19200,'9'=38400,'6'=56000,'7'=57600,'8'=115200)
  data_bits: 8  # source: "at present fixed at 8"
  parity: none  # source: "at present fixed to none"
  stop_bits: 1  # source: "at present fixed at 1"
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

TCP framing (verbatim from source): every command preceded by a 6-byte header — first two bytes always `0xAA 0xAA` (packet start), last four bytes = command length as a long in network format. Header also present on messages sent by the system. Example: `AT[&IPV` becomes `0xaa 0xaa 0x00 0x00 0x00 0x08` + `0x41 0x54 0x5b 0x26 0x49 0x50 0x56 0x0d`.

## Traits
```yaml
traits:
  - powerable    # inferred: SG board reset/shutdown command present
  - queryable    # inferred: many read-mode '?' commands present (CB, CI, CL, TH?, TL?, etc.)
  - levelable    # inferred: volume/gain control present (SV audio Rx "-44".."20", TU volumes, TN gain)
  - routable     # inferred: video source selection present (SF select, CV dual-video source, TV default input)
```

## Actions
```yaml
# Message format: AT[<mode><type><sub-type><data><cr>
# mode: '&' = write, '?' = read/request, '<' = reply (AETE->C&I)
# type: I=init T=te-conf N=net-conf D=dir-conf C=call-control S=c&i U=data
# Data payload max 255 characters.

# --- Initialization (I) ---
- id: at_echo_off
  label: Disable Command Echo
  kind: action
  command: "ATE0"
  params: []
  notes: Send before any other message when connection starts, to turn echo OFF

- id: init_protocol
  label: Init Protocol (IP)
  kind: action
  command: "AT[&IPV<cr>"
  params:
    - name: terminal_type
      type: string
      description: "Terminal type; 'V' shown in source examples"
  notes: First C&I message; enables AETE to recognize proprietary AT extension. Reply AT[<IP{boards/version info}<cr> then OK<cr>

- id: end_protocol
  label: End Protocol (IE)
  kind: action
  command: "AT[&IE<cr>"
  params: []
  notes: Ends proprietary protocol session. Reply AT[<IE<cr>

# --- Terminal Configuration (T) ---
- id: terminal_generic_command
  label: Terminal Generic Command (TA)
  kind: action
  command: "AT[&TA{param_type}{value}<cr>"
  params:
    - name: param_type
      type: enum
      description: "P=PIP on dual monitor, D=confirm disconnection, S=screen saver, I=show local info, V=VGA resolution (GOLD only: 1=1024x768 2=800x600 3=640x480), F=full screen"
    - name: value
      type: string
      description: "0/1 flag; for S also 2-byte timeout in minutes + active flag"
  notes: Replace '&' with '?' to read

- id: terminal_status_bar
  label: Terminal Display Status Bar (TB)
  kind: action
  command: "AT[&TB{status_bar}{flags}<cr>"
  params:
    - name: status_bar
      type: enum
      description: "0=disable 1=enable 2=auto hide"
    - name: flags
      type: string
      description: "Date/time, connection status, data channel, camera, charges - each 0/1"
  notes: Example from source AT[&TB111111<cr>

- id: terminal_date_time
  label: Terminal Date & Time (TT)
  kind: action
  command: "AT[&TT{day}{month}{year}{hour}{minute}<cr>"
  params:
    - name: day
      type: string
      description: "01..31"
    - name: month
      type: string
      description: "01..12"
    - name: year
      type: string
      description: 4 digits
    - name: hour
      type: string
      description: "00..23"
    - name: minute
      type: string
      description: "00..59"

- id: terminal_pip_position
  label: Terminal Local Image PIP Position (TP)
  kind: action
  command: "AT[&TP{position}<cr>"
  params:
    - name: position
      type: enum
      description: "0=disable 1=up left 2=up right 3=down right 4=down left"

- id: terminal_call_answer_mode
  label: Terminal Call/Answer Mode (TC)
  kind: action
  command: "AT[&TC{flags}<cr>"
  params:
    - name: flags
      type: string
      description: "Audio# = video# (0/1), mute on power up (0/1), auto answer (0/1), additional calls (0=manual 1=automatic), mode (0=64K 1=56K)"

- id: terminal_user_settings
  label: Terminal User Setting (TU)
  kind: action
  command: "AT[&TU{ringing}{audio_rx}{video_quality}{camera_remote}<cr>"
  params:
    - name: ringing
      type: string
      description: "Volume ringing tone 1 byte '0'..'9'"
    - name: audio_rx
      type: string
      description: "Volume audio Rx 3 bytes '-44'..'20'"
    - name: video_quality
      type: string
      description: "Video quality/speed 2 bytes '32'..'64'"
    - name: camera_remote
      type: enum
      description: "0=disable 1=enable remote camera control"

- id: terminal_video_camera_params
  label: Terminal Video Camera Parameters (TV)
  kind: action
  command: "AT[&TV{contrast}{brightness}{colour}{default_input}{at_audio}{at_video}<cr>"
  params:
    - name: contrast
      type: string
      description: "'00'..'64'"
    - name: brightness
      type: string
      description: "'00'..'64'"
    - name: colour
      type: string
      description: "'00'..'64'"
    - name: default_input
      type: enum
      description: "0=Room 1=Document 2=VCR 3=Document2 4=Document3 5=Input5(AVC8400) 6=Input6(AVC8400) 7=VGA(GOLD/AVC8400)"
    - name: at_audio
      type: enum
      description: "Autotracking audio 0=no 1=yes (SONY & ZEUS only)"
    - name: at_video
      type: enum
      description: "Autotracking video 0=no 1=yes (SONY & ZEUS only)"

- id: terminal_monitor_settings
  label: Terminal Monitor Settings (TG)
  kind: action
  command: "AT[&TG{monitor}<cr>"
  params:
    - name: monitor
      type: enum
      description: "0=auto detect 1=1 monitor TV1 2=2 monitors TV1+TV2 3=1 monitor VGA (GOLD) 4=TV1+VGA (GOLD) 5=TV1+TV2+VGA (GOLD)"

- id: terminal_data_channel
  label: Terminal Data Channel (TD)
  kind: action
  command: "AT[&TD{data_channel}{modem}{mlp}{serial_rate}{stop}{parity}{data}{transparent}<cr>"
  params:
    - name: data_channel
      type: enum
      description: "0=disable 1=enable"
    - name: modem
      type: enum
      description: "0=disable 1=enable; WARNING storage should always be Modem enabled (port shared with C&I on AVC)"
    - name: mlp
      type: enum
      description: "0=T120 1=Owner 2=Internet"
    - name: serial_rate
      type: enum
      description: "1=1200 2=2400 3=4800 4=9600 5=19200 9=38400 6=56000 7=57600 8=115200"
    - name: stop
      type: enum
      description: "1 or 2 (at present fixed at 1)"
    - name: parity
      type: enum
      description: "0=None 1=Odd 2=Even (at present fixed none)"
    - name: data
      type: enum
      description: "7=7 bit 8=8 bit (at present fixed 8)"
    - name: transparent
      type: enum
      description: "0=not requested (stay in command phase) 1=request (enter data phase)"
  notes: Example from source AT[&TD11031000<cr> (disable transparent data)

- id: terminal_audio_delay
  label: Terminal Audio Delay (TY)
  kind: action
  command: "AT[&TY{automatic}{delay}<cr>"
  params:
    - name: automatic
      type: enum
      description: "0=manual 1=automatic delay"
    - name: delay
      type: string
      description: "3 bytes '000'..'999'"

- id: terminal_audio_configuration
  label: Terminal Audio Configuration (TN)
  kind: action
  command: "AT[&TN{module}{data}<cr>"
  params:
    - name: module
      type: enum
      description: "I=inputs O=outputs H=echo canceller D=load defaults"
    - name: data
      type: string
      description: "Module I: input(01-08), enable(0/1), gain(00-24), echo(0/1), phantom(0/1), VCR assoc(0/1). Module O: output(01-04), received(0/1), transmitted(0/1), videorecorder(0/1), line2(0/1). Module H: echo canceller, AGC, noise reduction, echo suppressor each 0/1. Module D: 1=load input defaults 2=load output defaults"
  notes: Example from source AT[&TN11111<cr> (echo canceller settings + Line In echo cancel)

- id: terminal_mode_settings
  label: Terminal Mode Settings (TH)
  kind: action
  command: "AT[&TH{network}{audio}{video}{rate}{aggregate}<cr>"
  params:
    - name: network
      type: enum
      description: "0=ISDN/CAU 1=IP 2=NIC"
    - name: audio
      type: enum
      description: "0=auto 1=G.722 2=G.728 3=G.711 4=G.723(IP) 5=G.722.1 6=MP4 AAC-LD"
    - name: video
      type: enum
      description: "0=auto 1=H.261 2=H.261 QCIF 3=H.263 4=H.263 QCIF 5=H.263 4CIF 6=H.264 7=H.264 QCIF"
    - name: rate
      type: enum
      description: "1=64 2=128 3=192 4=256 5=320 6=384 7=448 8=512(576 IP) 9=576(1152 IP) A=640(1472 IP) B=704(1536 IP) C=768 D=1920 E=1152 F=1472 G=1536 H=2560(IP) I=3072(IP) J=3584(IP) K=4096(IP)"
    - name: aggregate
      type: enum
      description: "0=no 1=yes"
  notes: Example AT[&TH02320<cr> = ISDN, G.728, H.263, 128, no bonding

- id: terminal_capabilities_settings
  label: Terminal Capabilities Settings (TI)
  kind: action
  command: "AT[&TI{network}{param_type}{value}<cr>"
  params:
    - name: network
      type: enum
      description: "0=ISDN/CAU 1=IP 2=NIC"
    - name: param_type
      type: enum
      description: "A=H.264 B=H.239 C=DuoVideo D=G.722.1 E=MP4 AAC-LD capability"
    - name: value
      type: enum
      description: "0=no 1=yes (send capability)"
  notes: Example AT[&TI0E0<cr> disables MP4 AAC-LD capability

- id: terminal_broadcast_settings
  label: Terminal Broadcast Settings (TZ)
  kind: action
  command: "AT[&TZ{broadcast}{audio}{video}{fps}{lsd}{rate}{aggregate}<cr>"
  params:
    - name: broadcast
      type: enum
      description: "0=disable 1=enable"
    - name: audio
      type: enum
      description: "0=off 1=G.711 A 2=G.711 u 3=G.722 m2 4=G.722 m3 5=G.728 6=G.722.1 32K 7=G.722.1 24K 8=AAC-LD 56K 9=AAC-LD 48K"
    - name: video
      type: enum
      description: "0=off 1=H.261 2=H.261 QCIF 3=H.263 4=H.263 QCIF 5=H.264 6=H.264 QCIF"
    - name: fps
      type: enum
      description: "1=30 2=15 3=10 4=7.5"
    - name: lsd
      type: enum
      description: "0=off 1=6400 2=8000 3=14400 4=40k"
    - name: rate
      type: enum
      description: "1=64 2=128 3=192 4=256 5=320 6=384 7=448 8=512 C=768"
    - name: aggregate
      type: enum
      description: "0=no 1=yes"

- id: terminal_mcu_settings
  label: Terminal MCU Settings (TM)
  kind: action
  command: "AT[&TM{audio}{video}{conf_type}{mode}<cr>"
  params:
    - name: audio
      type: enum
      description: "0=auto 1=G.722 2=G.728 3=G.711 4=G.723(not impl) 5=G.722.1"
    - name: video
      type: enum
      description: "0=auto 1=H.261 2=H.261 QCIF(not impl) 3=H.263"
    - name: conf_type
      type: enum
      description: "1=2B 2=4B 3=128 4=256 5=6B 6=384 7=512 8=768 9=64"
    - name: mode
      type: enum
      description: "0=64K 1=56K"

- id: terminal_mcu_settings_extended
  label: Terminal MCU Settings Extended (TQ)
  kind: action
  command: "AT[&TQ{mcu_type}{audio}{video}{conf_type}{mode}{role}{cp_tx}{auto_coding}<cr>"
  params:
    - name: mcu_type
      type: enum
      description: "1=MCU ISDN 2=MCU IP 3=MCU mixed"
    - name: role
      type: enum
      description: "0=master 1=slave"
    - name: cp_tx
      type: enum
      description: "Continuous presence Tx 0=no 1=yes"
    - name: auto_coding
      type: enum
      description: "0=no 1=yes"
  notes: Also audio/video/conf_type/mode params as in TM

- id: terminal_location_parameters
  label: Terminal Location Parameters (TL)
  kind: action
  command: "AT[&TL{country}{audio}{video}{dial_tone}{language}{name}<cr>"
  params:
    - name: country
      type: string
      description: "Country code '000'...'999'"
    - name: audio
      type: enum
      description: "0=A law (European) 1=u law (USA)"
    - name: video
      type: enum
      description: "0=PAL 1=NTSC"
    - name: dial_tone
      type: enum
      description: "0=standard 1=continuous"
    - name: language
      type: enum
      description: "1=Italian 2=English 3=French 4=Spanish 5=German 6=Portuguese 7=Norwegian 8=Chinese 9=Swedish"
    - name: name
      type: string
      description: "Terminal name max 30 chars"
  notes: Example AT[<TL0011502VEGA2<cr> reply

- id: terminal_video_camera_control
  label: Terminal Video Camera Control (TF)
  kind: action
  command: "AT[&TF{camera}{enabled}{pan_tilt}{preset}{name}<cr>"
  params:
    - name: camera
      type: string
      description: "'01'..'08' (1=room 2=doc 3=VCR 4=doc2 5=doc3 6=In5 7=In6 8=VGA)"
    - name: enabled
      type: enum
      description: "0=no 1=yes"
    - name: pan_tilt
      type: enum
      description: "0=no 1=yes"
    - name: preset
      type: string
      description: "Preset number '0'..'F' hex; not used yet, always C"
    - name: name
      type: string
      description: "Max 15 ASCII chars"

- id: terminal_streaming_configuration
  label: Terminal Streaming Configuration (TS)
  kind: action
  command: "AT[&TSG{client_ip}{enabled}{announcements}{video_source}{rate}{ttl}{audio_port}{dest_ip}<cr>"
  params:
    - name: client_ip
      type: string
      description: "Client IP xxx.xxx.xxx.xxx fixed 15 chars; system checks client authorized"
    - name: enabled
      type: enum
      description: "Read only: 0=no 1=yes"
    - name: announcements
      type: enum
      description: "1=message on activation 2=only status 3=ask confirm"
    - name: video_source
      type: enum
      description: "1=automatic 2=only local"
    - name: rate
      type: string
      description: "2 bytes '01'=64K '02'=128K '03'=192K"
    - name: ttl
      type: string
      description: "2 bytes TTL/hops for multicast"
    - name: audio_port
      type: string
      description: "5 bytes UDP port; video = audio port + 2"
    - name: dest_ip
      type: string
      description: "Streaming destination IP, 15 chars"
  notes: Command type 'G' = Generic Command

- id: terminal_reload_defaults
  label: Terminal Reload Default Parameters (TR)
  kind: action
  command: "AT[&TR<cr>"
  params: []
  notes: Restores terminal default parameters; mode '&' only, no data

# --- Network Configuration (N) ---
- id: network_isdn_common
  label: Network ISDN Common Parameters (NI)
  kind: action
  command: "AT[&NI{protocol}{tr6}{ess5}{unrestricted}{clir}{colr}{fallback}{spid1}{spid2}{spid3}{spid4}<cr>"
  params:
    - name: protocol
      type: enum
      description: "0=ETSI 1=NI1"
    - name: fallback
      type: enum
      description: "0=disable 1=enable automatic fallback to voice"
  notes: Example AT[<NI0001001111111<cr>

- id: network_isdn_common_extended
  label: Network ISDN Common Parameters Extended (NB)
  kind: action
  command: "AT[&NB{protocol}{tr6}{ess5}{unrestricted}{clir}{colr}{fallback}{downspeed}{access_type}<cr>"
  params:
    - name: downspeed
      type: enum
      description: "0=disable 1=enable"
    - name: access_type
      type: enum
      description: "1=BRI 2=PRI; selection causes system reset"

- id: network_pri_access
  label: Network PRI Access Configuration (NP)
  kind: action
  command: "AT[&NP{cablen1}{cablen2}{interface}{maxch}{lowch}{highch}{search}{crc4}{bchannel}<cr>"
  params:
    - name: interface
      type: enum
      description: "1=E1 2=T1"
    - name: bchannel
      type: enum
      description: "0=network 1=terminal selects channels"

- id: network_nic_configuration
  label: Network NIC Configuration (NN)
  kind: action
  command: "AT[&NN{interface}{rate}{network}{auto_call}{if_params}<cr>"
  params:
    - name: interface
      type: enum
      description: "read only: 0=no cable 1=X21 2=V35 3=RS449 4=RS530 5=G703"
    - name: rate
      type: enum
      description: "1=64 2=128 3=192 4=256 5=320 6=384 7=448 8=512 C=768 D=1152 E=1472(G703) F=1536 G=1920"
    - name: if_params
      type: string
      description: "G703: crc4, alarms, mode(master/slave). X21/V35/RS449/RS530: termination, clocks, DTR, RTS, DSR, CD, CTS, RING, RS366, DLO, PWI, ACR"
  notes: Example AT[<NN4610102002110000<cr>

- id: network_ip_configuration
  label: Network IP Configuration (NL)
  kind: action
  command: "AT[&NL{automatic}{ip}{mask}{gateway}<cr>"
  params:
    - name: automatic
      type: enum
      description: "0=static 1=DHCP"
    - name: ip
      type: string
      description: "xxx.xxx.xxx.xxx fixed 15 chars"
  notes: Example AT[<NL0192.168.110.017255.255.255.000192.168.110.001<cr>

- id: network_ip_configuration_extended
  label: Network IP Configuration Extended (ND)
  kind: action
  command: "AT[&ND{net_type}C{automatic}{ip}{mask}{gateway}{dns}<cr>"
  params:
    - name: net_type
      type: enum
      description: "1=fixed 2=wireless 3=PPPoE"
  notes: Command type 'M' reads MAC address (fixed network, read only)

- id: network_wireless_ip
  label: Network Wireless IP Configuration (NF)
  kind: action
  command: "AT[&NFG{default_net}{card_status}{mode}{encryption}{active_key}{ssid}<cr>"
  params:
    - name: mode
      type: enum
      description: "1=Ad-Hoc 2=Managed"
    - name: encryption
      type: enum
      description: "0=none 1=64 bit 2=128 bit"
  notes: Command type 'K' sets key index ('01'..'04') + key value (max 30 chars); 'W' saves

- id: network_ppoe_configuration
  label: Network PPPoE Configuration (NG)
  kind: action
  command: "AT[&NGG{status}{active}{mode}<cr>"
  params:
    - name: status
      type: enum
      description: "read only: 0=disconnected 1=connected"
    - name: active
      type: enum
      description: "0=no 1=yes"
    - name: mode
      type: enum
      description: "1=always connected 2=on call"
  notes: 'N'=username(52), 'P'=password(20), 'S'=server name(32), 'C'=service name(32), 'W'=save

- id: sip_configuration
  label: Protocol SIP Configuration (NM)
  kind: action
  command: "AT[&NMG{use_udp}{udp_port}{tcp_port}<cr>"
  params:
    - name: use_udp
      type: enum
      description: "0=no (not yet used) 1=yes"
  notes: 'N'=system name(31), 'P'=password(30), 'R'=registrar (use/port/duration/IP), 'X'=proxy (use/port/IP), 'A'=registrar name(32), 'B'/'C'=proxy domain parts, 'W'=save

- id: network_nat_configuration
  label: Network NAT Configuration (NT)
  kind: action
  command: "AT[&NTG{nat_enable}{nat_type}{tcp_port}{udp_port}{public_ip}<cr>"
  params:
    - name: nat_type
      type: enum
      description: "1=automatic 2=Aethra 3=others"
    - name: public_ip
      type: string
      description: "Public/Aethra NAT IP max 15 chars; 000.000.000.000 if no Aethra NAT"

- id: network_h323_setting
  label: Network LAN H.323 Setting (NH)
  kind: action
  command: "AT[&NH{item}{data}<cr>"
  params:
    - name: item
      type: enum
      description: "A=H.323 name(30) B=H.323 number(30) G=gatekeeper (use/auto/IP) N=NetMeeting (use/IP) W=save all"
  notes: Examples AT[<NHAVEGA2<cr>, AT[<NHB1234<cr>

- id: network_web_management
  label: Network Web Management (NW)
  kind: action
  command: "AT[&NW{use_web}{notebook}{all_ip}{ip}{mask}{password}<cr>"
  params:
    - name: use_web
      type: enum
      description: "0=disable 1=enable"
    - name: password
      type: string
      description: "Web login password max 30 chars"

- id: network_snmp_management
  label: Network SNMP Management (NS)
  kind: action
  command: "AT[&NS{item}{data}<cr>"
  params:
    - name: item
      type: enum
      description: "A=SNMP active + manager IP N=administrator name(30) L=location(30) R=read config addrs S=write config addrs W=save all"
  notes: "Without item W no previous commands are saved"

- id: network_isdn_access_setting
  label: Network ISDN/CAU Access Setting (NA)
  kind: action
  command: "AT[&NA{access}{spid}{item}{data}<cr>"
  params:
    - name: access
      type: enum
      description: "'1'..'6' access number"
    - name: spid
      type: enum
      description: "'1'..'2'; ETSI always 1"
    - name: item
      type: enum
      description: "G=general (multinumber) T=TEI (mode auto/manual + value 00-63) N=number(20) P=SPID(9-20) S=subaddress(4) W=save"
  notes: AT[?NA reads all accesses; AT[?NAnn reads single access. Examples AT[&NA11T100<cr>, AT[&NA21N712181702<cr>

- id: network_isdn_access_setting_extended
  label: Network ISDN/CAU Access Setting Extended (NC)
  kind: action
  command: "AT[&NC{access_type}{access}{spid}{item}{data}<cr>"
  params:
    - name: access_type
      type: enum
      description: "1=BRI 2=PRI"
    - name: access
      type: string
      description: "2 bytes '01'..'06'"
  notes: Adds enable flag on item G vs NA

# --- Phone Directory (D) ---
- id: directory_file_descriptor
  label: File Descriptor (DF)
  kind: query
  command: "AT[?DF{request}<cr>"
  params:
    - name: request
      type: enum
      description: "0=general info (MaxRecord/NameSize/CompanyNameSize/NumberSize) A=a/b C=c/d E=e/f/g H=h/i/j K=k/l/m N=n/o P=p/q/r S=s/t U=u/v/w X=x/y/z group record counts"

- id: directory_read_record_index
  label: Read Record with Index (DR)
  kind: query
  command: "AT[?DR{group}{index}<cr>"
  params:
    - name: group
      type: enum
      description: "Group letter A..X (10 groups by first letter of name)"
    - name: index
      type: string
      description: "3 chars, 0..NumRecord"
  notes: Reply is multi-message (items 0/N/C/A/1..8). Example AT[?DRR001<cr>

- id: directory_read_record_name
  label: Read Record with Name (DN)
  kind: query
  command: "AT[?DN{namesrc}<cr>"
  params:
    - name: namesrc
      type: string
      description: "Name to search; may end with * for prefix match"
  notes: "Source states: not yet implemented"

- id: directory_delete_record
  label: Delete Record with Index (DD)
  kind: action
  command: "AT[&DD{group}{index}<cr>"
  params:
    - name: group
      type: enum
      description: "A..X"
    - name: index
      type: string
      description: "3 ASCII chars"
  notes: After update list indexes must be recalculated. Error example AT[<DEDD50<cr>

- id: directory_insert_record
  label: Insert New Record (DI)
  kind: action
  command: "AT[&DI{item}{data}<cr>"
  params:
    - name: item
      type: enum
      description: "0=general (speech flag, call type I/L/N/S, rate, additional numbers) N=name C=company A=flags (aggregated/restricted) 1..8=numbers W=save record"
  notes: Modify = delete + insert. Sequence of DI messages ending with AT[&DIW<cr>

- id: directory_delete_all
  label: Delete All Records (DL)
  kind: action
  command: "AT[&DL<cr>"
  params: []
  notes: "Source states: not yet implemented"

- id: directory_ldap_generic_info
  label: Generic LDAP Information (DG)
  kind: query
  command: "AT[?DG<cr>"
  params: []
  notes: Reply AT[<DG{selected}{configured}{lastconnected}<cr>; index 0 = local phonebook. Example AT[<DG000002001<cr>

- id: directory_ldap_insert_server
  label: Insert New LDAP Server (DS)
  kind: action
  command: "AT[&DS{command_type}{value}<cr>"
  params:
    - name: command_type
      type: enum
      description: "N=name/IP P=password B/C=bind parts (83/80) L/M=base parts Q/R=filter parts W=save all"
  notes: "Without W nothing is saved. Aethra defaults: bind cn=Admin,dc=aethra,dc=com; base ou=h323identity,dc=aethra,dc=com; filter (CommUniqueId=*)"

- id: directory_ldap_read_server
  label: Read LDAP Server Configuration (DP)
  kind: query
  command: "AT[?DP{index}<cr>"
  params:
    - name: index
      type: string
      description: "3 bytes server index"

- id: directory_ldap_delete_server
  label: Delete LDAP Server (DB)
  kind: action
  command: "AT[&DB{index}<cr>"
  params:
    - name: index
      type: string
      description: "3 bytes server index"

- id: directory_ldap_connect_server
  label: Connect LDAP Server (DC)
  kind: action
  command: "AT[&DC{index}<cr>"
  params:
    - name: index
      type: string
      description: "3 bytes; '000' selects local phonebook"
  notes: Remote LDAP is read-only (DI/DD fail); connect can take time

# --- Call Control (C) ---
- id: call_make
  label: Make a Call (CD)
  kind: action
  command: "AT[&CD{call}{calltype}{interface}{number}<cr>"
  params:
    - name: call
      type: string
      description: "'1'..'F' hex call number; !=1 for additional calls"
    - name: calltype
      type: enum
      description: "1=speech 2=unrestricted audio 4=unrestricted video 8=unrestricted undefined"
    - name: interface
      type: enum
      description: "0=ISDN/CAU 1=IP 2=NIC 3=MCU ISDN 4=MCU IP 5=MCU mixed 6=SIP"
    - name: number
      type: string
      description: "ASCII number; prefix @ for phone directory name lookup"
  notes: Example AT[&CD1202189701<cr>; directory call AT[&CD180@ROSSI<cr>

- id: call_make_set
  label: Make a Set of Calls (CS)
  kind: action
  command: "AT[&CS{calltype}{interface}{number1}.{diff}.{diff}<cr>"
  params:
    - name: number1
      type: string
      description: "Radix number; subsequent numbers given as diffs separated by '.'; equal numbers repeat last digit"
  notes: Example AT[&CS802188701.1.2.2.3.3<cr> (6xB)

- id: call_make_at_rate
  label: Make Call at Specified Rate (CM)
  kind: action
  command: "AT[&CM{calltype}{interface}{rate}{aggregate}{number1}.{diff}<cr>"
  params:
    - name: rate
      type: enum
      description: "1=64 .. C=768, D=1152 E=1472 F=1536 G=1920, H=2560 I=3072 J=3584 K=4096 (IP)"

- id: call_send_dtmf
  label: Send DTMF Digit (CF)
  kind: action
  command: "AT[&CF{digit}<cr>"
  params:
    - name: digit
      type: enum
      description: "0-9, #, *"

- id: call_answer
  label: Answer Incoming Call (CA)
  kind: action
  command: "AT[&CA{call}{interface}<cr>"
  params:
    - name: call
      type: string
      description: "At present only first call accepted"

- id: call_disconnect
  label: Disconnect a Call (CH)
  kind: action
  command: "AT[&CH{call}{interface}<cr>"
  params: []
  notes: At present whole connection is disconnected

- id: connection_status_query
  label: Connection Status (CB)
  kind: query
  command: "AT[?CB<cr>"
  params: []
  notes: Reply AT[<CB{network}{status}{video}{data}{number}<cr>; status codes 02=idle .. 32=MCU mixed active

- id: connection_h320_status_query
  label: Connection H.320 Status (CI)
  kind: query
  command: "AT[?CI<cr>"
  params: []
  notes: Reply carries audio/video coding, restricted, rate, MLP/LSD/HMLP/HSD rates, T.120, H.224

- id: connection_h323_status_query
  label: Connection H.323 Status (CL)
  kind: query
  command: "AT[?CL<cr>"
  params: []
  notes: Reply carries audio/video coding (G.723..AAC-LD; H.261..H.264) and number of channels

- id: call_change_rate
  label: Change Rate (CR)
  kind: action
  command: "AT[&CR{rate_tx}{rate_rx}<cr>"
  params:
    - name: rate_tx
      type: string
      description: "2 bytes '01'=64 .. '20'=4096; H.323 calls only; 576-704 currently decreased to 512"

- id: dual_video_management
  label: Dual Video Management (CV)
  kind: action
  command: "AT[&CV{action}{source}<cr>"
  params:
    - name: action
      type: enum
      description: "0=stop 1=start 2=change video source"
    - name: source
      type: enum
      description: "'01'=Room '02'=Doc1 '03'=VCR '04'=Doc2 '05'=Doc3 '06'=In5 '07'=In6 '08'=VGA"

- id: dual_video_status_query
  label: Dual Video Status (CC)
  kind: query
  command: "AT[?CC<cr>"
  params: []

# --- Multipoint Control (M) ---
- id: mcu_connect_terminal
  label: Connect a Terminal (MD)
  kind: action
  command: "AT[&MD{conference}{terminal}{calltype}{interface}{number}<cr>"
  params:
    - name: conference
      type: string
      description: "2 bytes '00'..'NN'"
    - name: terminal
      type: string
      description: "2 bytes; '00' = local terminal; max 7"

- id: mcu_disconnect_terminal
  label: Disconnect a Terminal (MH)
  kind: action
  command: "AT[&MH{conference}{terminal}<cr>"
  params: []

- id: mcu_close_conference
  label: Close a Conference (MO)
  kind: action
  command: "AT[&MO{conference}<cr>"
  params: []

- id: mcu_terminal_status_query
  label: MCU Terminal Status (MT)
  kind: query
  command: "AT[?MT{conference}{terminal}<cr>"
  params: []
  notes: Reply mode '>' with connection/audio/video status, 12 channel statuses, terminal name

- id: mcu_terminal_audio_status
  label: MCU Terminal Audio Status (MA)
  kind: action
  command: "AT[&MA{conference}{terminal}{audio_status}<cr>"
  params:
    - name: audio_status
      type: enum
      description: "0=disabled 1=not disabled"

- id: mcu_terminal_information
  label: MCU Terminal Information (MG)
  kind: query
  command: "AT[?MG{conference}{terminal}C<cr>"
  params: []
  notes: Information 'C' = connection info (call network, encryption status, H243 status)

- id: mcu_terminal_video_status
  label: MCU Terminal Video Status (MV)
  kind: action
  command: "AT[&MV{conference}{terminal}{video_status}<cr>"
  params:
    - name: video_status
      type: enum
      description: "0=normal 1=broadcast"

- id: mcu_terminal_incoming_call_config
  label: MCU Terminal Incoming Call Configuration (MI)
  kind: action
  command: "AT[&MI{conference}{terminal}{management}{number}<cr>"
  params:
    - name: management
      type: enum
      description: "1=accept all (meet-me) 2=control calling number 3=reject all (dial-out)"

- id: mcu_conference_finish_time
  label: Conference Finish Time Configuration (MF)
  kind: action
  command: "AT[&MF{conference}{unlimited}{hour}{min}{day}{month}{year}<cr>"
  params:
    - name: unlimited
      type: enum
      description: "1=never finish; other params meaningless"

- id: mcu_conference_local_video
  label: Conference Local Video Layout (MP)
  kind: action
  command: "AT[&MP{conference}{layout}<cr>"
  params:
    - name: layout
      type: enum
      description: "1=continuous presence 2=voice switching"

# --- Control & Indication (S) ---
- id: autotracking_command
  label: Autotracking Command/Status (SA)
  kind: action
  command: "AT[&SA{type}{mode}{start}<cr>"
  params:
    - name: type
      type: enum
      description: "1=audio 2=video (SONY only)"
    - name: mode
      type: enum
      description: "0=disable 1=enable"
    - name: start
      type: enum
      description: "0=no 1=yes; video only"
  notes: Example AT[&SA110<cr> enable, AT[&SA111<cr> start

- id: camera_command
  label: Video Camera Command/Status (SF)
  kind: action
  command: "AT[&SF{camera}{site}{command}{arg}<cr>"
  params:
    - name: camera
      type: string
      description: "2 ASCII digits; '00'=currently selected; 01=Room 02=Doc1 03=VCR 04=Doc2 05=Doc3 06=In5 07=In6 08=VGA(select only)"
    - name: site
      type: enum
      description: "0=local 1=remote"
    - name: command
      type: enum
      description: "0=select 1=pan timeout 2=tilt timeout 3=zoom timeout 4=focus timeout 5=preset 6=store preset !=stop 7=pan continual 8=tilt continual 9=zoom continual A=focus continual B=preset ext C=store preset ext"
    - name: arg
      type: string
      description: "pan R/L; tilt U/D; zoom +/-; focus +far/-near; preset 0-F hex (extended: 3 bytes decimal)"
  notes: Timeout commands move for fixed 500 ms then stop. Example AT[&SF0101R<cr> = move main camera right

- id: camera_command_no_select
  label: Video Camera Command without Source Change (SY)
  kind: action
  command: "AT[&SY{camera}{command}{arg}<cr>"
  params:
    - name: camera
      type: string
      description: "'00'..'07'; 00=current selected"
  notes: Moves local camera without changing current video source (video matrix rooms). Example AT[&SY011R<cr>

- id: board_reset
  label: Board Reset / Shutdown (SG)
  kind: action
  command: "AT[&SG{command}<cr>"
  params:
    - name: command
      type: enum
      description: "1=reset 2=shutdown"
  notes: Example AT[&SG1<cr>

- id: conference_control
  label: Conference Control (SH)
  kind: action
  command: "AT[&SH{command}{mcu}{te}{par}<cr>"
  params:
    - name: command
      type: enum
      description: "1=request conductorship 2=relinquish 3=conducted mode 4=non-conducted 5=floor granted 6=floor request 7=port confirm 8=drop terminal 9=drop all A=video source B=set video mode"
  notes: "Source states: not yet implemented"

- id: mute_command
  label: Mute Command/Status (SM)
  kind: action
  command: "AT[&SM{mute}<cr>"
  params:
    - name: mute
      type: enum
      description: "0=disable 1=enable"

- id: privacy_command
  label: Privacy Command/Status (SP)
  kind: action
  command: "AT[&SP{privacy}<cr>"
  params:
    - name: privacy
      type: enum
      description: "0=disable 1=enable video privacy"

- id: photo_command
  label: Photo Command/Status (SQ)
  kind: action
  command: "AT[&SQ{photo}<cr>"
  params:
    - name: photo
      type: enum
      description: "0=read/display 1=send 2=normal view"
  notes: Indications: 3=not available 4=received 5=sent 6=send error

- id: remote_terminal_query
  label: Remote Terminal Command (SX)
  kind: query
  command: "AT[?SX<cr>"
  params: []
  notes: Triggers capabilities exchange; results via SR indication

- id: streaming_command
  label: Streaming Command (SZ)
  kind: action
  command: "AT[&SZ{action}{view}{ip_address}<cr>"
  params:
    - name: action
      type: enum
      description: "0=stop 1=start 2=change view"
    - name: view
      type: enum
      description: "0=local 1=automatic"
    - name: ip_address
      type: string
      description: "15 bytes xxx.xxx.xxx.xxx; used to authorize request"
  notes: AT[?SZ queries streaming status (reply mode '>')

- id: selfview_command
  label: SelfView Command/Status (SS)
  kind: action
  command: "AT[&SS{selfview}<cr>"
  params:
    - name: selfview
      type: enum
      description: "0=disable 1=enable"

- id: pip_command
  label: Picture In Picture Command/Status (ST)
  kind: action
  command: "AT[&ST{pip}<cr>"
  params:
    - name: pip
      type: enum
      description: "0=disable 1=enable"

- id: volume_command
  label: Volume Command/Status (SV)
  kind: action
  command: "AT[&SV{volume}<cr>"
  params:
    - name: volume
      type: string
      description: "3 bytes '-44'..'20' audio Rx volume"

- id: remote_key_emulation
  label: Infrared Remote Control Emulation (SW)
  kind: action
  command: "AT[&SW{key}<cr>"
  params:
    - name: key
      type: enum
      description: "3 bytes: '000'-'009' digits 0-9, '010'=*, '011'=#, '012'=Home, '013'=Power, '015'=Call, '016'=Disconnect, '018'=Phonebook, '026'=Pip, '027'-'030'=arrows, '031'=Ok, '037'/'038'=Zoom -/+, '039'=Videoprivacy, '040'/'041'=Volume -/+, '042'=MUTE (full table 000-042 in source)"

# --- Data Messages (U) ---
- id: data_register_service
  label: Register to Data Service (UR)
  kind: action
  command: "AT[&UR{service}{register}<cr>"
  params:
    - name: service
      type: enum
      description: "1=app sharing 3=generic data 4=file transfer 5=still picture 8=telewriter 9=transparent data A=Symposium B=Video Survey C=Tele-upgrade D=WEB"
    - name: register
      type: enum
      description: "0=no 1=yes"
  notes: H.320 mode + MLP proprietor mode only

- id: data_open_service
  label: Open Data Service (UO)
  kind: action
  command: "AT[&UO{service}{channel}{rate}<cr>"
  params:
    - name: channel
      type: enum
      description: "0=LSD 1=HSD 2=MLP 3=H-MLP"
    - name: rate
      type: string
      description: "2 bytes '00'-'74' per rate table (300 b/s to 384 kbit/s incl. H0 combos)"
  notes: Reply AT[<UO{retcode}: 0=request sent 1=service not available A=generic error

- id: data_close_service
  label: Close Data Service (UC)
  kind: action
  command: "AT[&UC{service}{channel}<cr>"
  params: []

- id: data_exchange_message
  label: Exchange Data Message (UU)
  kind: action
  command: "AT[&UU{data_type}{length}<cr>"
  params:
    - name: data_type
      type: enum
      description: "C&I: 0=T.120 1=proprietor; AETE reply: 0..D service id"
    - name: length
      type: string
      description: "Max 4 bytes; suggested packet length ~250 bytes"

- id: data_set_mode
  label: Set Mode Data Service (UB)
  kind: action
  command: "AT[&UB{service}{mode}<cr>"
  params:
    - name: mode
      type: enum
      description: "0=unused 1=not auto opening 2=auto opening"

- id: data_request_confirmation
  label: Data Service Request Confirmation (US)
  kind: action
  command: "AT[&US{service}{channel}{value}<cr>"
  params:
    - name: value
      type: enum
      description: "0=not accepted 1=accepted"
```

## Feedbacks
```yaml
- id: ok_ack
  type: ack
  values: ["OK"]
  trigger: "AETE confirms accepted command; literal 'OK<cr>'"

- id: init_reply
  type: string
  trigger: "AT[<IP{data}<cr> - BRI board (0-4), NIC board (0-7), MCU enabled, board revision, camera type (0-5), TCU software version. Example AT[<IP101A0VEGASTAR2.7"

- id: error_indication
  type: enum
  trigger: "AT[<{I|T|N|D|C|M|S|U}E{msg_type}{sub_type}{error}{subcode}<cr> (IR/TE/NE/DE/CE/ME/SE/UE)"
  values: [bad_parameter, unknown_message, wrong_message_length, bad_mode, unable_to_execute]
  notes: "Error codes 1-5; subcode 0=system timeout 1=system busy. Example AT[<DEDD50"

- id: call_status
  type: enum
  trigger: "AT[<SC{call}{interface}{calltype}{data}<cr> - unsolicited call state changes"
  values: [release_ind_progress, setup_ack, call_proceeding, information_element, alerting, incoming_call, outgoing_connected, incoming_connected, release_indication, release_confirmation, display_ie, charge_advise, suspend_confirm, resume_confirm, call_advice]
  notes: "Examples AT[<SC102 (setup ack), AT[<SC10720712181701 (outgoing connected), AT[<SC1062... (incoming)"

- id: connection_status_reply
  type: string
  trigger: "AT[<CB{network}{status}{video}{data}{number}<cr> in reply to AT[?CB"
  notes: "Status 02=idle, 05/06/07=outgoing first call, 08=incoming, 09=connected, 10-14=following calls, 20=waiting disconnect, 30/31/32=MCU active"

- id: bonding_indication
  type: string
  trigger: "AT[<SB{item}<cr> - item G general (access mask, bonding mode/rate Tx/Rx, state byte), item C per-channel (channel no, access, status 00-33, B channel, disconnect cause 0x00-0xFF, connected number)"

- id: data_status
  type: enum
  trigger: "AT[<SD{status}<cr>"
  values: [closed, open]

- id: camera_information
  type: string
  trigger: "AT[<SI{camera}{present}{pan_tilt}{preset_number}{name}<cr> - remote camera info (H.281, 16 cameras max)"

- id: link_status
  type: string
  trigger: "AT[<SL{...}<cr> - current working mode: point-to-point, restricted, MLP active, audio/video/rate Tx and Rx, aggregate channels, MLP/LSD/HSD/HMLP rates, broadcast mode"

- id: rate_data_change
  type: string
  trigger: "AT[<SN{item}<cr> - item 0 number-of-channels change, item 1 data rate change, item 2 data protocol change (T.120/H.224 state)"

- id: remote_video_indication
  type: enum
  trigger: "AT[<SO{remote_video}<cr>"
  values: [off, on]

- id: remote_terminal_status
  type: string
  trigger: "AT[<SR{...}<cr> - rate in use, aggregate, restricted mode, remote audio/video/MLP/LSD/HSD/HMLP capability bitmaps"

- id: conference_indication
  type: enum
  trigger: "AT[<MS{message_type}{...}<cr> - unsolicited"
  values: [terminal_name, terminal_video_status, terminal_audio_status, terminal_channel_status, terminal_connection_status, terminal_encryption_status, terminal_h243_status, conference_video_status, conference_close]

- id: photo_status
  type: enum
  trigger: "AT[<SQ{photo}<cr>"
  values: [read, send, normal_view, not_available, received, sent, send_error]

- id: dual_video_status_reply
  type: string
  trigger: "AT[<CC{status}{source}<cr> in reply to AT[?CC"
  notes: "Status 0=inactive 1=active; source '01'..'08'"
```

## Variables
```yaml
- id: volume_audio_rx
  path: TU / SV
  range: "-44..20"
  unit: dB (implied by range format; unit not explicitly stated)
  access: read/write

- id: volume_ringing_tone
  path: TU
  range: "0..9"
  access: read/write

- id: video_quality_speed
  path: TU
  range: "32..64"
  access: read/write

- id: camera_contrast
  path: TV
  range: "00..64"
  access: read/write

- id: camera_brightness
  path: TV
  range: "00..64"
  access: read/write

- id: camera_colour
  path: TV
  range: "00..64"
  access: read/write

- id: audio_delay
  path: TY
  range: "000..999"
  access: read/write
  notes: Automatic or manual lip-sync delay

- id: audio_input_gain
  path: TN module I
  range: "00..24"
  access: read/write
  notes: Per audio input POD1/POD2/mic/line/VCR
```

## Events
```yaml
- id: incoming_call
  trigger: "AT[<SC106{calltype}{calling_number}<cr>"
  description: Incoming call indication; answer with AT[&CA

- id: call_connected
  trigger: "AT[<SC107... (outgoing) / AT[<SC108... (incoming)"
  description: Call connected indication

- id: call_released
  trigger: "AT[<SC109{source}{cause} / AT[<SC10A"
  description: Release indication / confirmation; cause per ETS 300 Table 4.13

- id: bonding_change
  trigger: AT[<SB
  description: Aggregator unit (bonding) state change, general or per-channel

- id: rate_change
  trigger: AT[<SN
  description: Number-of-channels, data rate, or data protocol change during connection

- id: conference_state
  trigger: AT[<MS
  description: Multipoint conference terminal/conference state notifications (9 message types)

- id: photo_received
  trigger: "AT[<SQ4<cr>"
  description: Photo received and available for display

- id: data_service_opened
  trigger: "AT[<UA{service}{channel}<cr>"
  description: Data service opened indication

- id: data_service_closed
  trigger: "AT[<UX{service}{channel}<cr>"
  description: Data service closed indication

- id: data_service_requested
  trigger: "AT[<UT{service}{channel}<cr>"
  description: Remote requested data service; confirm with AT[&US
```

## Macros
```yaml
- id: session_startup
  steps:
    - "ATE0"
    - "AT[&IPV<cr>"
  description: Disable echo then initialize proprietary protocol (source: section 2.1.1.1)

- id: enable_start_autotracking_video
  steps:
    - "AT[&SA110<cr>"
    - "AT[&SF0101R<cr>  # move selection square right (repeat as needed)"
    - "AT[&SA111<cr>"
  description: Enable, position selection, and start video autotracking (source example, section 2.1.7.1)

- id: directory_insert_sequence
  steps:
    - "AT[&DI00I10<cr>  # general: audio-video, ISDN, rate 64"
    - "AT[&DIN{name}<cr>"
    - "AT[&DIC{company}<cr>"
    - "AT[&DI1{number}<cr>"
    - "AT[&DIW<cr>  # save record"
  description: Insert new phone directory record (source example, section 2.1.4.1.5)

- id: isdn_access_configuration
  steps:
    - "AT[&NA11G0<cr>  # access 1, mono-number"
    - "AT[&NA11T100<cr>  # TEI automatic"
    - "AT[&NA11N{number}<cr>"
    - "AT[&NA11W<cr>  # save access 1"
  description: Per-access ISDN configuration; repeat per access then finish with save (source example, section 2.1.3.1.14)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains WARNINGs but no interlock procedures:
# - TD: "the data serial port of the AVC terminal is the same port where it is connected
#   the C&I, so the storage should always be Modem enabled"
# - TN: disabling echo canceller/suppressor "the remote user might hear a troublesome echo"
# - NB/protocol or access-type selection "causes a system reset"
# No power-on sequencing requirements stated.
```

## Notes
- Protocol is ASCII "AT[" proprietary extension of AT commands; terminator `<cr>`; data field max 255 characters. Modes: `?` read, `&` write/store, `<` reply/indication from AETE; MCU replies also use `>`.
- Commands identical over RS-232 and TCP/IP; over TCP every message is prefixed with 6-byte header `AA AA` + 4-byte network-format length; max 5 TCP clients on port 55003. Source gives full byte example for `AT[&IPV`.
- Source recommends sending `ATE0` (echo off) before initialization; IP init must be first proprietary message, IE ends session.
- Configuration messages usually must not be sent during an in-progress call (source NOTE, section 2.1.2).
- Directory is sorted by name; indexes shift after delete. Remote LDAP phonebook is read-only.
- Data services (UR/UO/UC etc.) available only in H.320 mode with MLP set to Owner (TD).
- DN, DL, SH and some enum values (G.723 in MCU audio, H.261 QCIF in MCU video) marked "not yet implemented" in source.
- Document covers the Aethra videoconference product range (Vega, AVCxxx, MaiaNX/MaiaIP, VegaPro, Vegastar GOLD); some parameters are model-specific (VGA input, inputs 5/6, phantom power, monitor modes) as flagged per-field.
- LAN (Ethernet) interface required for NetMeeting when running C&I and a T.120 session simultaneously.

<!-- UNRESOLVED: RS-232 baud rate default — not stated (selectable via TD; no factory default given) -->
<!-- UNRESOLVED: serial flow control — not stated in source -->
<!-- UNRESOLVED: firmware version compatibility — not stated (TCU version only appears in IP reply at runtime) -->
<!-- UNRESOLVED: protocol version — document revision 10.2.12 (6/16/2006), no protocol version number stated -->
<!-- UNRESOLVED: ETS 300 cause table content referenced but not included in source -->
<!-- UNRESOLVED: voltage/current/power specs — not stated in source -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - "https://web.archive.org/web/20061015180105/http://edirectory.aethra.net:80/edirectory/downweb.asp?ID=5306"
retrieved_at: 2026-08-16T18:13:45.266Z
last_checked_at: 2026-10-01T12:39:03.541Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T12:39:03.541Z
matched_actions: 91
action_count: 91
confidence: medium
summary: "All 91 controller-issued AT[ sub-type commands from the Aethra spec match the source verbatim, transport parameters agree (port 55003, 8/N/1), and source indications/errors are represented via Feedbacks and Events. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no serial baud rate default stated in source (rate is configurable 1200-115200 via TD command); no electrical specs; protocol applies to product range (Vega, AVCxxx, Maia, VegaPro), not exclusively Vega X Series"
- "no default baud rate stated; selectable via TD command ('1'=1200,'2'=2400,'3'=4800,'4'=9600,'5'=19200,'9'=38400,'6'=56000,'7'=57600,'8'=115200)"
- "not stated in source"
- "RS-232 baud rate default — not stated (selectable via TD; no factory default given)"
- "serial flow control — not stated in source"
- "firmware version compatibility — not stated (TCU version only appears in IP reply at runtime)"
- "protocol version — document revision 10.2.12 (6/16/2006), no protocol version number stated"
- "ETS 300 cause table content referenced but not included in source"
- "voltage/current/power specs — not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
