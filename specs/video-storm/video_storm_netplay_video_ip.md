---
spec_id: admin/video-storm-netplay-video
schema_version: ai4av-public-spec-v1
revision: 1
title: "Video Storm NetPlay Video Control Spec"
manufacturer: "Video Storm"
model_family: "NetPlay Video (NBX100)"
aliases: []
compatible_with:
  manufacturers:
    - "Video Storm"
  models:
    - "NetPlay Video (NBX100)"
    - "NetPlay Video (VRX010)"
    - "NetPlay Video (NBX010)"
    - "NetPlay Video (NAB / CMX1616A2 / CMX3838A1)"
    - "NetPlay Video (VTX)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - video-storm.com
source_urls:
  - https://www.video-storm.com/Downloads/NetPlay_protocol.pdf
retrieved_at: 2026-06-01T23:33:35.496Z
last_checked_at: 2026-06-04T06:32:25.671Z
generated_at: 2026-06-04T06:32:25.671Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers both NetPlay Audio and NetPlay Video under the same guide; only the video-side commands are emphasized in the device name, but the audio commands are included for completeness."
  - "source describes parameter ranges and units but does not publish a"
  - "source does not document unsolicited device-initiated event"
  - "no formal interlock matrix or safety warning table is published"
  - "firmware version compatibility ranges are not stated in the source. The \"1.5 and up\" remark on the VM `G` command is the only firmware-bound feature mentioned."
  - "voltage, current, and power specifications are not stated in the source."
  - "protocol version numbers for the control socket are not stated in the source."
  - "timing requirements beyond \"echo on valid commands\" and \"STATL can take up to 1 minute\" / \"QREDOP = 30s * sources * sinks\" are not stated."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:32:25.671Z
  matched_actions: 134
  action_count: 134
  confidence: medium
  summary: "All 134 spec actions matched verbatim command tokens in source; transport parameters verified; comprehensive coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Video Storm NetPlay Video Control Spec

## Summary
The Video Storm NetPlay platform (NBX, VRX, NAB, NBX010, VTX) exposes a Telnet/TCP control socket for matrix switching, video encoding/decoding, transport, audio routing, IR/RS232/CEC bridging, and device configuration. This spec covers the command set published in the NetPlay Control guide (rev 8.0, 5/17/22) including the NetPlay general control socket and the NetPlay virtual matrix controller socket. All commands are ASCII strings terminated by a single `<cr>` (0x0D).

<!-- UNRESOLVED: source covers both NetPlay Audio and NetPlay Video under the same guide; only the video-side commands are emphasized in the device name, but the audio commands are included for completeness. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
  alternate_ports:
    - 9091  # multi-connection Telnet
    - 9092  # virtual matrix control (one per NetPlay Video system)
    - 9090  # Squeezebox CLI / XBMC JSON
    - 80    # HTTP coverart / vm_request.php
  base_url: "http://<IP>"  # coverart and vm_request.php over HTTP
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "3.5mm stereo female (NBX100/VRX010); DB9 male via adapter (NAB); USB-RS232 adapter (NBX010)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from QLOWPOW and QRESTART/QHALT commands
  - routable        # inferred from Vaaabbb / Aaaabbb / SWaaa matrix switching commands
  - queryable       # inferred from QSTAT* / STAT / QSINK / QSRC query commands
  - levelable       # inferred from QASETVOL / Gaaabbb / Eaaabbb gain/volume commands
```

## Actions
```yaml
# All NetPlay commands. Commands are ASCII strings terminated by <cr> (0x0D).

# --- General / device configuration ---
- id: config_control
  label: Config Control
  kind: action
  command: "QCF{a}{bb}{ccc}{z}"
  params:
    - name: a
      type: enum
      values: [C, R, S]
      description: "C=config, R=renderer, S=server"
    - name: bb
      type: integer
      description: "row index to modify"
    - name: ccc
      type: integer
      description: "column index to modify (000 for single columns)"
    - name: z
      type: string
      description: "data to store"

- id: set_static_ip
  label: Set Static IP Address
  kind: action
  command: "QSETIP{ip}"
  params:
    - name: ip
      type: string
      description: "aaa.aaa.aaa.aaa"

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "QSETMK{mask}"
  params:
    - name: mask
      type: string
      description: "aaa.aaa.aaa.aaa"

- id: set_gateway
  label: Set Gateway Address
  kind: action
  command: "QSETGW{gw}"
  params:
    - name: gw
      type: string
      description: "aaa.aaa.aaa.aaa"

- id: set_dns
  label: Set DNS Address
  kind: action
  command: "QSETDN{dns}"
  params:
    - name: dns
      type: string
      description: "aaa.aaa.aaa.aaa"

- id: set_broadcast
  label: Set Broadcast Address
  kind: action
  command: "QSETBC{bc}"
  params:
    - name: bc
      type: string
      description: "aaa.aaa.aaa.aaa"

- id: set_dhcp
  label: Set DHCP Mode
  kind: action
  command: "QSETDHCP{x}"
  params:
    - name: x
      type: enum
      values: ["0", "1"]
      description: "0=STATIC, 1=DHCP"

- id: set_wireless
  label: Set Wireless On/Off
  kind: action
  command: "QSETWLAN{x}"
  params:
    - name: x
      type: enum
      values: ["0", "1"]
      description: "0=wireless off, 1=wireless on (adapter required)"

- id: set_ssid
  label: Set SSID
  kind: action
  command: "QSETSSID{ssid}"

- id: set_wpa_password
  label: Set WPA PSK Password
  kind: action
  command: "QSETPWD{pwd}"

- id: stat_eth0
  label: Request Ethernet Details
  kind: query
  command: "QSTATETH0"

- id: restart
  label: Reboot Device
  kind: action
  command: "QRESTART"

- id: halt
  label: Halt OS
  kind: action
  command: "QHALT"
  notes: "Halt OS so power can be removed safely"

- id: update_firmware
  label: Update Firmware
  kind: action
  command: "QUPDATEFW"
  notes: "Updates firmware from web server and reboots"

- id: send_sddp
  label: Send SDDP Identity Event
  kind: action
  command: "QSDDPI"

- id: stat_version
  label: Request Device Version
  kind: query
  command: "QSTATVER"

- id: stat_config
  label: Request Config Data
  kind: query
  command: "QSTATCONF{a}{bbb}"
  params:
    - name: a
      type: enum
      values: [C, R, S]
      description: "C=config, S=server, R=renderer"
    - name: bbb
      type: integer
      description: "row index (255 returns all rows with header)"

- id: stat_i2s
  label: Request Audio Channel Info
  kind: query
  command: "QSTATI2S{a}"
  params:
    - name: a
      type: integer
      description: "optional output index; omit for all"

- id: stat_i2d
  label: Request Virtual Channel Info
  kind: query
  command: "QSTATI2D{aa}"
  params:
    - name: aa
      type: integer
      description: "virtual channel 01-48"

- id: save_metadata
  label: Save Current Song Metadata
  kind: action
  command: "QSAVE{a}"
  params:
    - name: a
      type: integer
      description: "audio channel number"

- id: stat_top
  label: Request CPU Utilization
  kind: query
  command: "QSTATTOP"

- id: coverart
  label: Request Coverart JPG
  kind: query
  command: "QCOVERART{#}"
  params:
    - name: channel
      type: integer
      description: "output channel number"
  notes: "Returns base64 JPG framed by QCOVERART#<cr>OK<cr>width height size JPGDATA<cr>"

- id: delete_profile
  label: Delete Source Profile
  kind: action
  command: "QDELP{###}"
  params:
    - name: p
      type: string
      description: "profile number; omit to delete all"

- id: read_profile
  label: Read Source Profile
  kind: query
  command: "QREADP{###}"
  params:
    - name: p
      type: string
      description: "profile number; omit to read all"

# --- Transport controls ---
- id: play
  label: Play
  kind: action
  command: "QPLAY{#}"
  params:
    - name: channel
      type: integer
      description: "output channel 1-8 (NBX010/VRX010 is always 1)"

- id: stop
  label: Stop
  kind: action
  command: "QSTOP{#}"
  params:
    - name: channel
      type: integer
      description: "output channel 1-8"

- id: disconnect
  label: Disconnect (NDCN not issued)
  kind: action
  command: "QDSCN{#}"
  params:
    - name: channel
      type: integer
      description: "output channel 1-8"
  notes: "Same as stop but NDCN is not issued"

- id: pause
  label: Pause
  kind: action
  command: "QPAUSE{#}"
  params:
    - name: channel
      type: integer
      description: "output channel 1-8"

- id: play_pause_toggle
  label: Toggle Play/Pause
  kind: action
  command: "QPLPAUSE{#}"
  params:
    - name: channel
      type: integer
      description: "output channel 1-8"

- id: skip_forward
  label: Skip Forward
  kind: action
  command: "QSKIPFW{#}"
  params:
    - name: channel
      type: integer
      description: "output channel 1-8"

- id: skip_back
  label: Skip Backward
  kind: action
  command: "QSKIPBK{#}"
  params:
    - name: channel
      type: integer
      description: "output channel 1-8"

- id: signal_pause
  label: Start Pause Timer
  kind: action
  command: "QSIGPS{#}"
  params:
    - name: channel
      type: integer
      description: "output channel 1-8"
  notes: "Starts pause timer but does not pause"

- id: seek_forward
  label: Seek Forward (video)
  kind: action
  command: "QSEEKFW{xxx}"
  params:
    - name: seconds
      type: integer
      description: "seconds to seek forward"

- id: seek_backward
  label: Seek Backward (video)
  kind: action
  command: "QSEEKBW{xxx}"
  params:
    - name: seconds
      type: integer
      description: "seconds to seek backward"

- id: low_latency
  label: Set Low Latency Mode
  kind: action
  command: "QLOWLAT"

- id: high_latency
  label: Set High Latency Mode (default)
  kind: action
  command: "QHIGHLAT"

# --- Decoder volume / EQ / delay (NetPlay Audio) ---
- id: set_volume
  label: Set Decoder Volume
  kind: action
  command: "QASETVOL{xxx}"
  params:
    - name: vol
      type: integer
      description: "0-256 (192 nominal)"

- id: set_balance
  label: Set Decoder Balance
  kind: action
  command: "QASETBAL{xxx}"
  params:
    - name: bal
      type: integer
      description: "0-256 (128 nominal)"

- id: set_bass
  label: Set Decoder Bass
  kind: action
  command: "QASETBASS{xxx}"
  params:
    - name: bass
      type: integer
      description: "0-256 (128 nominal)"

- id: set_treble
  label: Set Decoder Treble
  kind: action
  command: "QASETTREB{xxx}"
  params:
    - name: treb
      type: integer
      description: "0-256 (128 nominal)"

- id: set_audio_delay
  label: Set Decoder Audio Delay
  kind: action
  command: "QASETDEL{xxx}"
  params:
    - name: delay
      type: integer
      description: "0-256 (1/4 frame per tick)"

# --- Audio transmit (NAB audio return, NBX/VRX rebroadcast) ---
- id: at_play
  label: Start Audio Stream (RTSP)
  kind: action
  command: "QATPL{#} {rtsp_url}"
  params:
    - name: channel
      type: integer
      description: "output I2S channel number"
    - name: rtsp_url
      type: string
      description: "RTSP source URL (e.g. rtsp://ip:8554/input1)"

- id: at_stop
  label: Stop Audio Stream
  kind: action
  command: "QATSP{#}"
  params:
    - name: channel
      type: integer
      description: "output I2S channel number"

# --- Video decode controls ---
- id: video_play_first
  label: Play First URL (video)
  kind: action
  command: "QVMPF {options} {url}"
  params:
    - name: options
      type: string
      description: "options string"
    - name: url
      type: string
      description: "media URL"
  notes: "This command STOPS any current streams"

- id: video_play_url
  label: Play URL (video)
  kind: action
  command: "QVMPL {options} {url}"
  params:
    - name: options
      type: string
      description: "options string"
    - name: url
      type: string
      description: "media URL"

- id: xbmc_on
  label: XBMC GUI On
  kind: action
  command: "QXBMCON"

- id: xbmc_off
  label: XBMC GUI Off
  kind: action
  command: "QXBMCOFF"

- id: toggle_debug_osd
  label: Toggle Debug OSD
  kind: action
  command: "QSTATOSD"

- id: stat_video
  label: Request Currently Playing Video Info
  kind: query
  command: "QSTATVID"

# --- Video encode controls ---
- id: venc_play
  label: Start Video Encode Stream
  kind: action
  command: "QVENCPL {#a} {dest_ip} {options}"
  params:
    - name: input
      type: integer
      description: "input number + stream#*2"
    - name: dest_ip
      type: string
      description: "udp://IP:Port or rtp://IP:port/ttl"
    - name: options
      type: string
      description: "encode options"

- id: venc_stop
  label: Stop Video Encode Stream
  kind: action
  command: "QVENCSTOP {#a} {dest_ip}"
  params:
    - name: input
      type: integer
      description: "input number (optional; omit to stop all)"
    - name: dest_ip
      type: string
      description: "destination IP (optional; omit to stop all streams from input)"

- id: stat_encode
  label: Request Encode Stream Info
  kind: query
  command: "QSTATENC"

# --- Video encode config ---
- id: venc_edid_mask
  label: Set Encoder EDID Mask
  kind: action
  command: "QVENCEDIDM{a}{x}"
  params:
    - name: a
      type: integer
      description: "input 0 or 1"
    - name: x
      type: string
      description: "4-bit bitfield: bit0=AC3, bit1=DDP, bit2=DTS, bit3=MCA; 0=nothing masked"

- id: venc_audio_out_mode
  label: Set Encoder Audio Output Mode
  kind: action
  command: "QVENCAOUTM{a}{b}"
  params:
    - name: a
      type: enum
      values: ["0", "1"]
      description: "0=analog output, 1=optical output"
    - name: b
      type: enum
      values: ["0", "1", "2", "3", "4"]
      description: "0=audio same as hdmi out, 1=delayed feed through, 2=both hdmi (L=ch1, R=ch2), 3=delay hdmi1, 4=delay hdmi2"

# --- RS232 control ---
- id: rs232_send_base64
  label: Send Base64 RS232 Data
  kind: action
  command: "QSRS{base64_data}"
  params:
    - name: data
      type: string
      description: "base64 encoded payload"

# --- IR controls (decoder) ---
- id: ir_pulse
  label: Pulse IR (decoder)
  kind: action
  command: "QSIRPULSE R={repeat} {hex_code}"
  params:
    - name: repeat
      type: integer
      description: "repeat count"
    - name: hex_code
      type: string
      description: "proto format hex code"

- id: ir_start
  label: Start IR (decoder)
  kind: action
  command: "QSIRSTART {hex_code}"
  params:
    - name: hex_code
      type: string
      description: "proto format hex code"

- id: ir_stop
  label: Stop IR (decoder)
  kind: action
  command: "QSIRSTOP {hex_code}"
  params:
    - name: hex_code
      type: string
      description: "proto format hex code"

# --- IR controls (source; a = 0 or 1) ---
- id: ir_pulse_source
  label: Pulse IR (source)
  kind: action
  command: "QSIRPULSE{a} R={repeat} {hex_code}"
  params:
    - name: a
      type: integer
      description: "source index 0 or 1"
    - name: repeat
      type: integer
    - name: hex_code
      type: string

- id: ir_start_source
  label: Start IR (source)
  kind: action
  command: "QSIRSTARE{a} {hex_code}"
  params:
    - name: a
      type: integer
      description: "source index 0 or 1"
    - name: hex_code
      type: string
  notes: "Source uses spelling QSIRSTARE in the source document"

- id: ir_stop_source
  label: Stop IR (source)
  kind: action
  command: "QSIRSTOP{a} {hex_code}"
  params:
    - name: a
      type: integer
      description: "source index 0 or 1"
    - name: hex_code
      type: string

# --- CEC controls ---
- id: cec_on
  label: CEC TV On
  kind: action
  command: "QCECON"

- id: cec_off
  label: CEC TV Off
  kind: action
  command: "QCECOFF"

- id: cec_select
  label: CEC Select This HDMI Input
  kind: action
  command: "QCECSEL"

- id: cec_vol_up
  label: CEC Amp Volume Up
  kind: action
  command: "QCECVOLU"

- id: cec_vol_down
  label: CEC Amp Volume Down
  kind: action
  command: "QCECVOLD"

- id: cec_mute_toggle
  label: CEC Amp Mute Toggle
  kind: action
  command: "QCECMUTE"

- id: cec_tx
  label: Send Generic CEC Command
  kind: action
  command: "QCECTX {cmd}"
  params:
    - name: cmd
      type: string
      description: "raw CEC command"

# --- OSD / Power ---
- id: set_osd
  label: Set OSD
  kind: action
  command: "QSETOSD -d {duration} -t {text}"
  params:
    - name: duration
      type: integer
      description: "seconds; 0 for always"
    - name: text
      type: string
      description: "text to display"

- id: low_power
  label: Set Low Power Mode
  kind: action
  command: "QLOWPOW{x}"
  params:
    - name: x
      type: integer
      description: "optional subdevice to power down"
  notes: "Normal mode restored by any switching command"

# --- Virtual matrix commands ---
- id: vm_video_output
  label: VM Video Output Control
  kind: action
  command: "V{aaa}{bbb}"
  params:
    - name: sink
      type: integer
      description: "001-999"
    - name: source
      type: integer
      description: "001-999"

- id: vm_audio_return
  label: VM Audio Return Channel Output
  kind: action
  command: "A{aaa}{bbb}"
  params:
    - name: sink
      type: integer
      description: "001-999"
    - name: decoder
      type: integer
      description: "001-999"
  notes: "VTX audio output must also be bound as SINK"

- id: vm_macro
  label: VM Macro Control
  kind: action
  command: "MACRO{aa} {b} {c} {d} {e} {f} {g}"
  params:
    - name: macro_id
      type: integer
      description: "01-99"
    - name: b
      type: string
      description: "optional param; convention: sink number"
    - name: c
      type: string
    - name: d
      type: string
    - name: e
      type: string
    - name: f
      type: string
    - name: g
      type: string

- id: vm_matrix_display
  label: VM Video Output - Matrix Display
  kind: action
  command: "SW{aaa} {x} {bbb} {ccc} {ddd} {eee} ..."
  params:
    - name: output
      type: integer
      description: "001-999"
    - name: layout
      type: integer
      description: "display layout number"
    - name: inputs
      type: string
      description: "one or more input numbers 001-999"

- id: vm_matrix_subwindow
  label: VM Matrix Subwindow
  kind: action
  command: "SWS{aaa} {x} {bb} {ccc}"
  params:
    - name: output
      type: integer
      description: "001-999"
    - name: layout
      type: integer
    - name: subwindow
      type: integer
      description: "01-16"
    - name: input
      type: integer
      description: "001-999"

- id: vm_audio_output_gain
  label: VM Audio Output Gain
  kind: action
  command: "G{aaa}{bbb}"
  params:
    - name: output
      type: integer
      description: "001-999"
    - name: gain
      type: string
      description: "000-255 (000=mute), or U/D/MT/MF/M on firmware 1.5+"

- id: vm_audio_input_gain
  label: VM Audio Input Gain
  kind: action
  command: "E{aaa}{bbb}"
  params:
    - name: input
      type: integer
      description: "001-MAX"
    - name: gain
      type: integer
      description: "000-255 (128 nominal)"

- id: vm_audio_output_balance
  label: VM Audio Output Balance
  kind: action
  command: "M{aaa}{bbb}"
  params:
    - name: input
      type: integer
      description: "001-MAX"
    - name: balance
      type: integer
      description: "000-255 (128 nominal)"

- id: vm_audio_bass
  label: VM Audio Bass
  kind: action
  command: "B{aaa}{bbb}"
  params:
    - name: input
      type: integer
      description: "001-MAX"
    - name: bass
      type: integer
      description: "000-255 (128 nominal)"

- id: vm_audio_treble
  label: VM Audio Treble
  kind: action
  command: "T{aaa}{bbb}"
  params:
    - name: input
      type: integer
      description: "001-MAX"
    - name: treb
      type: integer
      description: "000-255 (128 nominal)"

- id: vm_audio_input_delay
  label: VM Audio Input Delay
  kind: action
  command: "X{aaa}{bbb}"
  params:
    - name: input
      type: integer
      description: "001-MAX"
    - name: delay
      type: string
      description: "000-255 (0.25 frame step), or U/D"

- id: vm_audio_output_delay
  label: VM Audio Output Delay
  kind: action
  command: "D{aaa}{bbb}"
  params:
    - name: output
      type: integer
      description: "001-MAX"
    - name: delay
      type: string
      description: "00-255 (0.25 frame step), or U/D"

- id: set_hdhr_channel
  label: Set HDHomeRun Channel
  kind: action
  command: "SETCHAN{aaa}{bbb}"
  params:
    - name: output
      type: integer
      description: "001-MAX"
    - name: channel
      type: string
      description: "001-999, or UP, DN, UPF, DNF"

- id: stat_outputs
  label: Request VM Device Status
  kind: query
  command: "STAT"

- id: stat_audio_settings
  label: Request VM Audio Settings
  kind: query
  command: "STATL"

- id: flash_modes
  label: Flash Modes Control
  kind: action
  command: "F{aa}{b}"
  params:
    - name: slot
      type: integer
      description: "01-99"
    - name: b
      type: enum
      values: [S, R]
      description: "S=save, R=recall"

- id: vm_stat_sinks
  label: Request Sinks Status
  kind: query
  command: "QSINK"

- id: vm_stat_sources
  label: Request Sources Status
  kind: query
  command: "QSRC"

- id: vm_read_profiles
  label: Get Profile Info From All Sinks
  kind: query
  command: "QREADP"
  notes: "Return data can take up to 1 minute"

- id: vm_regen_profiles
  label: Regenerate Source Profiles On All Sinks
  kind: action
  command: "QREDOP"
  notes: "Takes 30 seconds * sources * sinks to complete"

- id: vm_get_source_ip
  label: Get Source IP
  kind: query
  command: "QSGETIP{xxx}"
  params:
    - name: source
      type: string
      description: "source identifier"

- id: vm_get_decoder_ip
  label: Get Decoder IP
  kind: query
  command: "QDGETIP{xxx}"
  params:
    - name: decoder
      type: string
      description: "decoder identifier"

- id: vm_set_decoder_id
  label: Set Decoder ID OSD
  kind: action
  command: "QSETDID"
  notes: "Sets the OSD on each decoder to display the decoder ID"

- id: vm_stat_hdhr_lineup
  label: Request HDHomeRun Channel Lineup
  kind: query
  command: "QSTATHDHRLUP"

# --- VM XBMC ---
- id: vm_xbmc_on
  label: VM XBMC GUI On
  kind: action
  command: "QXBMCON{xxx}"
  params:
    - name: target
      type: string
      description: "decoder or source #"

- id: vm_xbmc_off
  label: VM XBMC GUI Off
  kind: action
  command: "QXBMCOFF{xxx}"
  params:
    - name: target
      type: string
      description: "decoder or source # (000 = all)"
  notes: "Sent automatically when V command used"

# --- VM IR (decoder) ---
- id: vm_ir_pulse_decoder
  label: Pulse IR (decoder, VM)
  kind: action
  command: "QDIRPULSE{xxx} R={repeat} {hex_code}"
  params:
    - name: target
      type: string
    - name: repeat
      type: integer
    - name: hex_code
      type: string

- id: vm_ir_start_decoder
  label: Start IR (decoder, VM)
  kind: action
  command: "QDIRSTART{xxx} {hex_code}"
  params:
    - name: target
      type: string
    - name: hex_code
      type: string

- id: vm_ir_stop_decoder
  label: Stop IR (decoder, VM)
  kind: action
  command: "QDIRSTOP{xxx}"
  params:
    - name: target
      type: string
  notes: "Stops all IR codes"

# --- VM IR (source) ---
- id: vm_ir_pulse_source
  label: Pulse IR (source, VM)
  kind: action
  command: "QSIRPULSE{xxx} R={repeat} {hex_code}"
  params:
    - name: target
      type: string
    - name: repeat
      type: integer
    - name: hex_code
      type: string

- id: vm_ir_start_source
  label: Start IR (source, VM)
  kind: action
  command: "QSIRSTART{xxx} {hex_code}"
  params:
    - name: target
      type: string
    - name: hex_code
      type: string

- id: vm_ir_stop_source
  label: Stop IR (source, VM)
  kind: action
  command: "QSIRSTOP{xxx}"
  params:
    - name: target
      type: string
  notes: "Stops all IR codes"

# --- VM IR (zone) ---
- id: vm_ir_pulse_zone
  label: Pulse IR (zone, VM)
  kind: action
  command: "QFIRPULSE{xxx} R={repeat} {hex_code}"
  params:
    - name: zone
      type: string
    - name: repeat
      type: integer
    - name: hex_code
      type: string
  notes: "Sent to source currently selected by zone xxx"

# --- VM Ethernet ---
- id: vm_send_url_decoder
  label: Send URL To Sink
  kind: action
  command: "QDETH{xxx} {url}"
  params:
    - name: target
      type: string
    - name: url
      type: string
      description: "URL-encoded Ethernet control URL"

- id: vm_send_url_source
  label: Send URL To Source
  kind: action
  command: "QSETH{xxx} {url}"
  params:
    - name: target
      type: string
    - name: url
      type: string
      description: "URL-encoded Ethernet control URL"

# --- VM IR/ETH database ---
- id: vm_ir_code_decoder
  label: Predefined IR Code (decoder, VM)
  kind: action
  command: "QDIRCODE{xxx}{yyy} R={repeat}"
  params:
    - name: target
      type: string
    - name: code_id
      type: string
    - name: repeat
      type: integer

- id: vm_ir_code_source
  label: Predefined IR Code (source, VM)
  kind: action
  command: "QSIRCODE{xxx}{yyy} R={repeat}"
  params:
    - name: target
      type: string
    - name: code_id
      type: string
    - name: repeat
      type: integer

- id: vm_ir_code_zone
  label: Predefined IR Code (zone, VM)
  kind: action
  command: "QFIRCODE{xxx}{yyy} R={repeat}"
  params:
    - name: zone
      type: string
    - name: code_id
      type: string
    - name: repeat
      type: integer
  notes: "Sent to source currently selected by zone xxx"

# --- VM Delay (macros/scripts) ---
- id: vm_wait
  label: Wait (VM macro)
  kind: action
  command: "WAIT {x}"
  params:
    - name: seconds
      type: integer
  notes: "Used in macros/scripts only"

- id: vm_time
  label: Pause Until UTC Time (VM macro)
  kind: action
  command: "TIME {h} {m} {s}"
  params:
    - name: h
      type: integer
    - name: m
      type: integer
    - name: s
      type: integer
  notes: "Used in macros/scripts only"

- id: vm_day
  label: Pause Until Day Of Week (VM macro)
  kind: action
  command: "DAY {d}"
  params:
    - name: d
      type: integer
      description: "Sunday is day 1, UTC time"
  notes: "Used in macros/scripts only"

# --- VM RS232 ---
- id: vm_rs232_send
  label: Send Base64 RS232 To Sink
  kind: action
  command: "QSRS{xxx}{base64_data}"
  params:
    - name: target
      type: string
    - name: data
      type: string
      description: "base64 encoded payload"

# --- VM CEC ---
- id: vm_cec_on
  label: VM CEC TV On
  kind: action
  command: "QCECON{xxx}"

- id: vm_cec_off
  label: VM CEC TV Off
  kind: action
  command: "QCECOFF{xxx}"

- id: vm_cec_select
  label: VM CEC HDMI Select
  kind: action
  command: "QCECSEL{xxx}"

- id: vm_cec_vol_up
  label: VM CEC Amp Volume Up
  kind: action
  command: "QCECVOLU{xxx}"

- id: vm_cec_vol_down
  label: VM CEC Amp Volume Down
  kind: action
  command: "QCECVOLD{xxx}"

- id: vm_cec_mute
  label: VM CEC Amp Mute Toggle
  kind: action
  command: "QCECMUTE{xxx}"

- id: vm_cec_tx
  label: VM CEC Send Generic
  kind: action
  command: "QCECTX{xxx} {cmd}"
  params:
    - name: target
      type: string
    - name: cmd
      type: string

# --- VM OSD ---
- id: vm_set_osd
  label: VM OSD
  kind: action
  command: "QSETOSD{xxx} -d {duration} -t {text} -w {window}"
  params:
    - name: target
      type: string
      description: "000 for all sinks"
    - name: duration
      type: integer
    - name: text
      type: string
    - name: window
      type: string
      description: "x1 y1 x2 y2"

- id: vm_video_osd
  label: VM Video OSD (PIP)
  kind: action
  command: "QVOSD{xxx}{yyy} {z} {d} {o}"
  params:
    - name: sink
      type: string
    - name: source
      type: string
    - name: format
      type: integer
      description: "1-8"
    - name: duration
      type: integer
    - name: overlay
      type: enum
      values: ["0", "1", "2"]
      description: "0=Netplay/Android PIP, 1=passive, 2=interactive"

- id: vm_stop_video_osd
  label: VM Stop Video OSD (PIP)
  kind: action
  command: "QVOSSP{xxx}"
  params:
    - name: sink
      type: string

- id: vm_pip_swap
  label: VM Swap PIP / Fullscreen
  kind: action
  command: "QPIPSWAP{xxx}"
  params:
    - name: sink
      type: string

- id: vm_pip_full
  label: VM PIP Video To Fullscreen
  kind: action
  command: "QPIPFULL{xxx}"
  params:
    - name: sink
      type: string

# --- VM Latency / Profile / Power ---
- id: vm_low_latency
  label: VM Set Low Latency
  kind: action
  command: "QLOWLAT{xxx}"
  params:
    - name: target
      type: string

- id: vm_high_latency
  label: VM Cancel Low Latency
  kind: action
  command: "QHIGHLAT{xxx}"
  params:
    - name: target
      type: string

- id: vm_reprofile
  label: VM Re-profile All Inputs
  kind: action
  command: "QPROFILE{xxx}"
  params:
    - name: output
      type: string
      description: "999 = all outputs"

- id: vm_low_power
  label: VM Low Power All Devices
  kind: action
  command: "QLOWPOW"
  notes: "Normal mode restored by any switching command"

# --- VM Encoder settings ---
- id: vm_venc_edid_mask
  label: VM Set EDID Mask On Source
  kind: action
  command: "QVENCEDIDM{aaa}{x}"
  params:
    - name: source
      type: string
    - name: mask
      type: string
      description: "4-bit bitfield"

- id: vm_venc_aout_mode
  label: VM Set Audio Output Mode On Source
  kind: action
  command: "QVENCAOUTM{aaa}{b}{c}"
  params:
    - name: source
      type: string
    - name: a
      type: string
    - name: b
      type: string

- id: vm_aset_delay
  label: VM Set Audio Output Delay On Source
  kind: action
  command: "QASETDEL{aaa}{xxx}"
  params:
    - name: source
      type: string
    - name: delay
      type: integer

# --- Audio delay device ---
- id: qdddevs
  label: Return Audio Delay Device Settings
  kind: query
  command: "QDDDEVS"

- id: qddset
  label: Set Audio Delay Device Config
  kind: action
  command: "QDDSET{xx} {Y} {Z} {H}"
  params:
    - name: device
      type: string
    - name: Y
      type: integer
      description: "delay in ms"
    - name: Z
      type: enum
      values: ["0", "1"]
      description: "0=analog, 1=digital"
    - name: H
      type: enum
      values: ["0", "1"]
      description: "0=48Khz, 1=44.1Khz"

# --- Dynamic URL ---
- id: set_tmp_url
  label: Set Dynamic Source URL
  kind: action
  command: "QSETTMP{aaa} {url}"
  params:
    - name: source
      type: string
    - name: url
      type: string
  notes: "Reset by reload, reboot, or next QSETTMP. .png/.jpg/.jpeg -> Image URL type; .mp4/.mkv/.ts -> Video URL type."
```

## Feedbacks
```yaml
# Query responses documented in the source. Specific framing strings reproduced verbatim.
- id: eth0_status
  label: eth0 Interface Details
  description: "ifconfig details on eth0 framed by QSTATETH0<cr>OK<cr>Data"
  source_command: "QSTATETH0"

- id: version
  label: Device Version
  description: "Version string framed by QSTATVER<cr>OK<cr>"
  source_command: "QSTATVER"

- id: config_data
  label: Config Row Data
  description: "All data columns of the requested row framed by QSTATCONFabbb<cr>OK<cr>Data"
  source_command: "QSTATCONF"

- id: i2s_status
  label: I2S Audio Status
  description: "Header with column labels + 8 rows of data framed by QSTATI2S<cr>OK<cr>"
  source_command: "QSTATI2S"

- id: i2d_status
  label: Virtual Channel Status
  description: "1 line of data in the I2S format"
  source_command: "QSTATI2D"

- id: cpu_top
  label: CPU Utilization (top output)
  description: "top output framed by QSTATTOP<cr>OK<cr>Data"
  source_command: "QSTATTOP"

- id: coverart_jpg
  label: Coverart JPG
  description: "QCOVERART#<cr>OK<cr>width height size JPGDATA<cr>; JPGDATA is base64 encoded"
  source_command: "QCOVERART"

- id: profile_info
  label: Source Profile Info
  description: "Profile_number num_streams video_res video_aspect audio0_channels audio1_channels"
  source_command: "QREADP"

- id: vm_sinks
  label: VM Sinks Status
  description: "Status of all sinks in order separated by <cr>"
  source_command: "QSINK"

- id: vm_sources
  label: VM Sources Status
  description: "Status of all sources in order separated by <cr>"
  source_command: "QSRC"

- id: vm_video_info
  label: Active Video Stream Info
  description: "One line per active video stream: url options latency state media_time duration"
  source_command: "QSTATVID"

- id: vm_encode_info
  label: Active Encode Stream Info
  description: "One line per active video stream: Source instance _DEST_IP details_"
  source_command: "QSTATENC"

- id: vm_status
  label: VM Device Status
  description: "Vaaabbb for each output"
  source_command: "STAT"

- id: vm_audio_status
  label: VM Audio Settings Status
  description: "All audio settings for each input and output"
  source_command: "STATL"

- id: vm_hdhr_lineup
  label: HDHomeRun Channel Lineup
  description: "num/name separated by <cr>"
  source_command: "QSTATHDHRLUP"

- id: audio_delay_device_settings
  label: Audio Delay Device Settings
  description: "Returned by QDDDEVS"
  source_command: "QDDDEVS"
```

## Variables
```yaml
# UNRESOLVED: source describes parameter ranges and units but does not publish a
# structured variable catalog. Ranges are documented inline on each action.
# Removed section per spec policy; see action params for ranges.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited device-initiated event
# notifications. All responses are framed replies to queries.
```

## Macros
```yaml
# The VM MACRO command runs numbered macros (01-99) defined in the VM driver.
# Macro bodies are not enumerated in the source; only the invocation form is.
- id: vm_macro_run
  label: VM Macro Invocation
  command: "MACRO{aa} {b} {c} {d} {e} {f} {g}"
  params:
    - name: macro_id
      type: integer
      description: "01-99"
    - name: b
      type: string
      description: "parameter (b-g optional; inside macros \"bbb\" is replaced by passed parameter)"
  source: "NetPlay VM Controls section"
```

## Safety
```yaml
# Source explicitly states:
# - QHALT halts the OS so power can be removed safely (power-down sequencing).
# - STOPPING the service causes disconnection and prevents restart via this interface.
# - Pausing keeps the connection active for up to 5 minutes before disconnecting.
# - Live streams have limited transport control.
confirmation_required_for:
  - "QHALT"           # source: power can be removed only after this command
  - "QRESTART"        # source: reboots device
  - "QUPDATEFW"       # source: updates firmware and reboots
  - "QLOWPOW"         # source: places device in low power mode
  - "VM QLOWPOW"      # source: places all devices in low power mode
interlocks:
  - "QHALT must be issued before removing power to prevent filesystem corruption (inferred from \"Halt NBX OS so power can be removed safely\")."
# UNRESOLVED: no formal interlock matrix or safety warning table is published
# in the source; the list above is restricted to statements the source makes
# explicitly.
```

## Notes
- All commands are terminated by a single `<cr>` (0x0D). The source emphasizes that `<cr>` refers to the ASCII character, not the four-character string.
- NBX/VRX echo back all characters sent to it; the echo is the easiest cable check. NBX does not add `<lf>` after `<cr>`. Echo is only sent for valid commands terminated by `<cr>`.
- Ports: 23 (single-connection Telnet), 9091 (multi-connection Telnet), 9092 (virtual matrix control), 9090 (Squeezebox CLI / XBMC JSON), 80 (HTTP coverart and `vm_request.php`).
- NetPlay general commands start with `Q` and end with `<cr>`. VM commands do not use the `Q` prefix except for the query variants (`QSINK`, `QSRC`, `QREADP`, `QREDOP`, etc.).
- For NBX/VRX, unrecognized data is forwarded unaltered to RS232 TX. For NAB, unrecognized data is forwarded to the CMX microprocessor prefixed with `&`. NAB also accepts an explicit `/F` forwarding directive.
- HTTP control URL: `http://<VMM-IP>/vm_request.php?cmd=PROTOCOLCMD` (PROTOCOLCMD must be URL-encoded).
- Cover art URL: `http://<NBA-IP:80>/coverart<#>` where `#` is the output channel.
- The source documents the device family as NetPlay, with hardware variants NBX100, VRX010, NBX010 (USB-RS232), NAB (CMX1616A2 / CMX3838A1 internal board), and VTX. A single spec covers all variants because they share the same command set; behaviour differences (e.g. NBX100 has no server file) are noted inline.
- Audio transmit URL conventions: VRX audio return is `rtsp://ip:8554/input1`; NAB inputs are `rtsp://ip:8554/input1..input8`; virtual channels are `rtsp://ip:8554/inputv01..inputv48`; test signal is `rtsp://ip:8554/test`. Default encoding L16-44100; `/aac_x` for AAC; `/raw_x` for raw bitstream.

<!-- UNRESOLVED: firmware version compatibility ranges are not stated in the source. The "1.5 and up" remark on the VM `G` command is the only firmware-bound feature mentioned. -->
<!-- UNRESOLVED: voltage, current, and power specifications are not stated in the source. -->
<!-- UNRESOLVED: protocol version numbers for the control socket are not stated in the source. -->
<!-- UNRESOLVED: timing requirements beyond "echo on valid commands" and "STATL can take up to 1 minute" / "QREDOP = 30s * sources * sinks" are not stated. -->
```

Spec written to `/tmp/video_storm_netplay_video_spec.md` and shown above. 134 distinct action rows enumerated, no values fabricated, gaps marked.

## Provenance

```yaml
source_domains:
  - video-storm.com
source_urls:
  - https://www.video-storm.com/Downloads/NetPlay_protocol.pdf
retrieved_at: 2026-06-01T23:33:35.496Z
last_checked_at: 2026-06-04T06:32:25.671Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:32:25.671Z
matched_actions: 134
action_count: 134
confidence: medium
summary: "All 134 spec actions matched verbatim command tokens in source; transport parameters verified; comprehensive coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers both NetPlay Audio and NetPlay Video under the same guide; only the video-side commands are emphasized in the device name, but the audio commands are included for completeness."
- "source describes parameter ranges and units but does not publish a"
- "source does not document unsolicited device-initiated event"
- "no formal interlock matrix or safety warning table is published"
- "firmware version compatibility ranges are not stated in the source. The \"1.5 and up\" remark on the VM `G` command is the only firmware-bound feature mentioned."
- "voltage, current, and power specifications are not stated in the source."
- "protocol version numbers for the control socket are not stated in the source."
- "timing requirements beyond \"echo on valid commands\" and \"STATL can take up to 1 minute\" / \"QREDOP = 30s * sources * sinks\" are not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
