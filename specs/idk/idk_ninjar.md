---
spec_id: admin/idk-ninjar-njr-ctb
schema_version: ai4av-public-spec-v1
revision: 1
title: "IDK Corporation IP-NINJAR NJR-CTB Control Spec"
manufacturer: IDK
model_family: NJR-CTB
aliases: []
compatible_with:
  manufacturers:
    - IDK
    - "IDK Corporation"
  models:
    - NJR-CTB
    - NJR-T01UHD
    - NJR-R01UHD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - idkav.com
source_urls:
  - https://www.idkav.com/content/documents/manuals/njr-ctb_cm_ver.1.1.1_en.pdf
retrieved_at: 2026-07-14T09:09:17.594Z
last_checked_at: 2026-07-21T22:52:50.869Z
generated_at: 2026-07-21T22:52:50.869Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power supply specifications, physical dimensions, operating temperature ranges not stated in source"
  - "flow control not mentioned in source"
  - "volume/gain commands not found in source"
  - "source does not describe unsolicited event notifications from the device."
  - "no multi-step macro sequences described in source."
  - "source contains no safety warnings, interlock procedures, or power sequencing requirements."
  - "physical layer specifications (voltage, current, power consumption) not stated in source"
  - "EDID data format and structure not detailed in source"
  - "error recovery behavior when commands conflict not documented"
  - "command timing requirements (minimum delay between commands) not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:52:50.869Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions verified as wire-literal commands in source; transport parameters complete; all source commands represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# IDK Corporation IP-NINJAR NJR-CTB Control Spec

## Summary
The IP-NINJAR NJR-CTB is a network-based AV management and control box supporting HDMI routing, EDID management, and transmission control over TCP/IP and RS-232C. The device accepts ASCII text commands starting with `@` followed by comma-separated parameters and terminated with CR LF.

<!-- UNRESOLVED: power supply specifications, physical dimensions, operating temperature ranges not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1100  # TCP command control port; HTTP web control port 80 stated separately
serial:
  baud_rate: 9600  # default per source
  data_bits: 8     # default per source
  parity: none     # default per source
  stop_bits: 1     # default per source
  flow_control: null  # UNRESOLVED: flow control not mentioned in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable       # inferred from @GSW/@SSW, @GSV/@SSV, @GSA/@SSA switching commands
- queryable      # inferred from GET commands (@GCHI, @GVOS, @GAOS, etc.)
- levelable      # UNRESOLVED: volume/gain commands not found in source
```

## Actions
```yaml
# --- Switching channel ---

- id: set_video_audio_switch
  label: Switch Video and Audio
  kind: action
  command: "@SSW,type,ch,reserved,input,output"
  params:
    - name: type
      type: integer
      description: Type "0" fixed
    - name: ch
      type: integer
      description: Channel "0" fixed
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: input
      type: integer
      description: Input channel 0=OFF, 1-512=Input channel1-512
    - name: output
      type: integer
      description: Output channel 0=All outputs, 1-512=Output channel1-512

- id: get_video_audio_switch
  label: Get Video and Audio Switch
  kind: query
  command: "@GSW,type,ch,reserved,input"
  params:
    - name: type
      type: integer
      description: Type "0" fixed
    - name: ch
      type: integer
      description: Channel "0" fixed
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: input
      type: integer
      description: Input channel 0=OFF, 1-512=Input channel1-512

- id: set_video_switch
  label: Switch Video
  kind: action
  command: "@SSV,type,ch,reserved,input,output"
  params:
    - name: type
      type: integer
      description: Type "0" fixed
    - name: ch
      type: integer
      description: Channel "0" fixed
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: input
      type: integer
      description: Input channel 0=OFF, 1-512=Input channel1-512
    - name: output
      type: integer
      description: Output channel 0=All outputs, 1-512=Output channel1-512

- id: get_video_switch
  label: Get Video Switch
  kind: query
  command: "@GSV,type,ch,reserved,input"
  params:
    - name: type
      type: integer
      description: Type "0" fixed
    - name: ch
      type: integer
      description: Channel "0" fixed
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: input
      type: integer
      description: Input channel 0=OFF, 1-512=Input channel1-512

- id: set_audio_switch
  label: Switch Audio
  kind: action
  command: "@SSA,type,ch,reserved,input,output"
  params:
    - name: type
      type: integer
      description: Type "0" fixed
    - name: ch
      type: integer
      description: Channel "0" fixed
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: input
      type: integer
      description: Input channel 0=OFF, 1-512=Input channel1-512
    - name: output
      type: integer
      description: Output channel 0=All outputs, 1-512=Output channel1-512

- id: get_audio_switch
  label: Get Audio Switch
  kind: query
  command: "@GSA,type,ch,reserved,input"
  params:
    - name: type
      type: integer
      description: Type "0" fixed
    - name: ch
      type: integer
      description: Channel "0" fixed
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: input
      type: integer
      description: Input channel 0=OFF, 1-512=Input channel1-512

- id: set_analog_audio_switch
  label: Switch Analog Audio
  kind: action
  command: "@SSAA,type,ch,reserved,input,output"
  params:
    - name: type
      type: integer
      description: Type "0" fixed
    - name: ch
      type: integer
      description: Channel "0" fixed
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: input
      type: integer
      description: Input channel 0=OFF, 1-512=Input channel1-512
    - name: output
      type: integer
      description: Output channel 0=All outputs, 1-512=Output channel1-512

- id: get_analog_audio_switch
  label: Get Analog Audio Switch
  kind: query
  command: "@GSAA,type,ch,reserved,input"
  params:
    - name: type
      type: integer
      description: Type "0" fixed
    - name: ch
      type: integer
      description: Channel "0" fixed
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: input
      type: integer
      description: Input channel 0=OFF, 1-512=Input channel1-512

- id: set_rs232_switch
  label: Switch RS-232C Channel
  kind: action
  command: "@SSWR,src_type,src_ch,src_port,dst_type,dst_ch,dst_port"
  params:
    - name: src_type
      type: integer
      description: Source type 1=Input, 2=Output
    - name: src_ch
      type: integer
      description: Source channel 1-512
    - name: src_port
      type: integer
      description: Source connector "1" fixed
    - name: dst_type
      type: integer
      description: Destination type 1=Input, 2=Output
    - name: dst_ch
      type: integer
      description: Destination channel 1-512
    - name: dst_port
      type: integer
      description: Destination connector "1" fixed

- id: get_rs232_switch
  label: Get RS-232C Channel
  kind: query
  command: "@GSWR,src_type,src_ch,src_port"
  params:
    - name: src_type
      type: integer
      description: Source type 1=Input, 2=Output
    - name: src_ch
      type: integer
      description: Source channel 1-512
    - name: src_port
      type: integer
      description: Source connector "1" fixed

# --- Setting transmission ---

- id: set_video_audio_transmission
  label: Video and Audio Transmission
  kind: action
  command: "@SWDS,type,ch,reserved,mode,free"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "0" fixed
    - name: mode
      type: integer
      description: Mode 0=Stop, 1=Transmit or Receive
    - name: free
      type: integer
      description: Initialize transmission address 0=Disabled, 1=Enabled

- id: get_video_audio_transmission
  label: Get Video and Audio Transmission Status
  kind: query
  command: "@GWDS,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "0" fixed

- id: set_video_transmission
  label: Video Transmission
  kind: action
  command: "@SVDS,type,ch,reserved,mode,free"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "0" fixed
    - name: mode
      type: integer
      description: Mode 0=Stop, 1=Start
    - name: free
      type: integer
      description: Initialize transmission address 0=Disabled, 1=Enabled

- id: get_video_transmission
  label: Get Video Transmission Status
  kind: query
  command: "@GVDS,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "0" fixed

- id: set_audio_transmission
  label: Audio Transmission
  kind: action
  command: "@SADS,type,ch,reserved,mode,free"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "0" fixed
    - name: mode
      type: integer
      description: Mode 0=Stop, 1=Transmit or Receive
    - name: free
      type: integer
      description: Initialize transmission address 0=Disabled, 1=Enabled

- id: get_audio_transmission
  label: Get Audio Transmission Status
  kind: query
  command: "@GADS,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "0" fixed

- id: set_analog_audio_transmission
  label: Analog Audio Transmission
  kind: action
  command: "@SNDS,type,ch,reserved,mode,free"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "0" fixed
    - name: mode
      type: integer
      description: Mode 0=Stop, 1=Transmit or Receive
    - name: free
      type: integer
      description: Initialize transmission address 0=Disabled, 1=Enabled

- id: get_analog_audio_transmission
  label: Get Analog Audio Transmission Status
  kind: query
  command: "@GNDS,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "0" fixed

# --- Setting video / audio ---

- id: set_output_video
  label: Set Output Video
  kind: action
  command: "@SVOS,type,ch,reserved,mode,submode,resolution"
  params:
    - name: type
      type: integer
      description: Type "2" fixed
    - name: ch
      type: integer
      description: Channel 0=All, 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: mode
      type: integer
      description: Switching mode 0=Standard, 1=Fast & Scaling
    - name: submode
      type: integer
      description: Sub mode "0" fixed
    - name: resolution
      type: integer
      description: >-
        Resolution code per EDID table in source (-1=No change, 1=VGA@60,
        2=SVGA@60, 3=XGA@60, 4-49 various; see source table 4.4.2.2)

- id: get_output_video
  label: Get Output Video
  kind: query
  command: "@GVOS,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type "2" fixed
    - name: ch
      type: integer
      description: Channel 0=All, 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed

- id: set_output_audio
  label: Set Output Audio
  kind: action
  command: "@SAOS,type,ch,reserved,analog,hdmi"
  params:
    - name: type
      type: integer
      description: Type "2" fixed
    - name: ch
      type: integer
      description: Channel 0=All, 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: analog
      type: integer
      description: Audio output connector 2=HDMI audio, 3=Analog input audio
    - name: hdmi
      type: integer
      description: HDMI audio output 2=HDMI audio, 3=Analog input audio

- id: get_output_audio
  label: Get Output Audio
  kind: query
  command: "@GAOS,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type "2" fixed
    - name: ch
      type: integer
      description: Channel 0=All, 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed

# --- Setting EDID ---

- id: copy_edid
  label: Copy EDID
  kind: action
  command: "@RMEC,type,ch,reserved,input,output"
  params:
    - name: type
      type: integer
      description: Type "0" fixed
    - name: ch
      type: integer
      description: Channel "0" fixed
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: input
      type: integer
      description: Input Channel 0=All inputs, 1-512=Input Channel1-512
    - name: output
      type: integer
      description: Output Channel 1-512=Output Channel1-512

# --- Setting channel information ---

- id: set_channel_info
  label: Set Channel Information
  kind: action
  command: "@SCHI,type,ch,reserved,mac,hdmi"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: mac
      type: string
      description: MAC address in hex format (00-FF x6)
    - name: hdmi
      type: integer
      description: HDMI connector 0=All, 1-4=Connector1-4

- id: get_channel_info
  label: Get Channel Information
  kind: query
  command: "@GCHI,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed

# --- RS-232C communication setting ---

- id: set_rs232_settings
  label: Set RS-232C Settings
  kind: action
  command: "@SRSS,type,ch,reserved,baudrate,databit,stopbit,parity"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: baudrate
      type: integer
      description: Baud rate 0=4800, 1=9600, 2=19200, 3=38400, 4=57600, 5=115200
    - name: databit
      type: integer
      description: Data bit length 7=7bit, 8=8bit
    - name: stopbit
      type: integer
      description: Stop bit 1=1bit, 2=2bit
    - name: parity
      type: integer
      description: Parity 0=NONE, 1=ODD, 2=EVEN

- id: get_rs232_settings
  label: Get RS-232C Settings
  kind: query
  command: "@GRSS,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All (setting only), 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed

# --- CTB LAN settings ---

- id: set_lan
  label: Set LAN
  kind: action
  command: "@SIPS,type,ch,port,mode,ip,mask,gateway"
  params:
    - name: type
      type: integer
      description: Type 0=CTB, 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 1-512
    - name: port
      type: integer
      description: Connector 1-2 (for non-CTB "1" fixed)
    - name: mode
      type: integer
      description: Mode 0=Automatic(DHCP), 1=Fixed
    - name: ip
      type: string
      description: IP address in dotted decimal notation
    - name: mask
      type: string
      description: Subnet mask in dotted decimal notation
    - name: gateway
      type: string
      description: Default gateway in dotted decimal notation

- id: get_lan
  label: Get LAN Settings
  kind: query
  command: "@GIPS,type,ch,port"
  params:
    - name: type
      type: integer
      description: Type 0=CTB, 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 1-512
    - name: port
      type: integer
      description: Connector 1-2 (for non-CTB "1" fixed)

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "@GMCC,type,ch,port"
  params:
    - name: type
      type: integer
      description: Type 0=CTB, 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 1-512
    - name: port
      type: integer
      description: Connector 1-2 (for non-CTB "1" fixed)

# --- Maintenance ---

- id: get_version
  label: Get Version Information
  kind: query
  command: "@GIVC,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type 0=CTB, 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed

- id: reboot
  label: Reboot
  kind: action
  command: "@RBTC,type,ch,reserved"
  params:
    - name: type
      type: integer
      description: Type 0=CTB, 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All, 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed

- id: initialize_settings
  label: Initialize Settings
  kind: action
  command: "@CLRC,type,ch,reserved,comm_setting"
  params:
    - name: type
      type: integer
      description: Type 0=CTB, 1=Input, 2=Output
    - name: ch
      type: integer
      description: Channel 0=All, 1-512=Channel1-512
    - name: reserved
      type: integer
      description: Reservation "1" fixed
    - name: comm_setting
      type: integer
      description: Initialize communication setting 0=Disabled, 1=Enabled
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: enum
  values:
    - "1"  # Erroneous parameter format or value
    - "2"  # Undefined command or wrong format
    - "3"  # Currently cannot be used
    - "99" # Error other than errors above
  command: "@ERR,error"
  description: Returns @ERR,error code

- id: channel_info
  label: Channel Information
  type: string
  command: "@GCHI,type,ch,reserved,mac,hdmi"
  description: Returns type, ch, reserved, mac, hdmi values

- id: output_video
  label: Output Video
  type: string
  command: "@GVOS,type,ch,reserved,mode,submode,resolution"
  description: Returns mode, submode, resolution

- id: output_audio
  label: Output Audio
  type: string
  command: "@GAOS,type,ch,reserved,analog,hdmi"
  description: Returns analog, hdmi audio output settings

- id: video_audio_transmission
  label: Video and Audio Transmission Status
  type: enum
  values:
    - "0"  # Stop
    - "1"  # Transmit or Receive
  command: "@GWDS,type,ch,reserved,mode"
  description: Returns transmission mode

- id: video_transmission
  label: Video Transmission Status
  type: enum
  values:
    - "0"  # Stop
    - "1"  # Start
  command: "@GVDS,type,ch,reserved,mode"
  description: Returns transmission mode

- id: audio_transmission
  label: Audio Transmission Status
  type: enum
  values:
    - "0"  # Stop
    - "1"  # Transmit or Receive
  command: "@GADS,type,ch,reserved,mode"
  description: Returns transmission mode

- id: analog_audio_transmission
  label: Analog Audio Transmission Status
  type: enum
  values:
    - "0"  # Stop
    - "1"  # Transmit or Receive
  command: "@GNDS,type,ch,reserved,mode"
  description: Returns transmission mode

- id: switch_status
  label: Switch Status
  type: string
  command: "@GSW,type,ch,reserved,input,output"
  description: Returns output channel assignment for given input

- id: rs232_channel
  label: RS-232C Channel
  type: string
  command: "@GSWR,src_type,src_ch,src_port,dst_type,dst_ch,dst_port"
  description: Returns src_type, src_ch, src_port, dst_type, dst_ch, dst_port

- id: rs232_settings
  label: RS-232C Settings
  type: string
  command: "@GRSS,type,ch,reserved,baudrate,databit,stopbit,parity"
  description: Returns baudrate, databit, stopbit, parity

- id: lan_settings
  label: LAN Settings
  type: string
  command: "@GIPS,type,ch,port,mode,ip,mask,gateway"
  description: Returns mode, ip, mask, gateway

- id: mac_address
  label: MAC Address
  type: string
  command: "@GMCC,type,ch,port,mac"
  description: Returns MAC address in hex format

- id: version_info
  label: Version Information
  type: string
  command: "@GIVC,type,ch,reserved,model,version"
  description: Returns model and firmware version

- id: edid_copy
  label: EDID Copy Status
  type: string
  command: "@RMEC,type,ch,reserved,input,output"
  description: Returns input and output channel mapping
```

## Variables
```yaml
# All settable parameters are represented as Actions with direct command equivalents.
# No additional Variables section required.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from the device.
# The device only responds to query commands; no push-style events documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power sequencing requirements.
```

## Notes
**Command syntax:** Commands start with `@` ("40" hex) followed by 3-4 alphabetical characters, then comma-separated parameters. Delimiter is CR LF (`0D 0A` hex). Example format: `@RCPP,0,0,1,1`

**Connection management:** Up to 8 simultaneous TCP connections supported. Port timeout is 30 seconds of inactivity. Issuing "port-open" and "port-close" before/after commands is recommended for clean connection handling. If no command is sent for 30 seconds, the NJR-CTB automatically disconnects.

**Factory default LAN:** IP address 192.168.1.199, subnet mask 255.255.255.0, default gateway 192.168.1.200, TCP port 1100.

**TCP port overload management:** When 8 ports are occupied, additional connection attempts may fail. The device automatically closes inactive ports after 30 seconds.

**HTTP web control:** Port 80 used for WEB browser control. Refer to NJR-CTB User's Guide for web interface details.

**RS-232C passthrough:** The device supports RS-232C channel switching to route serial communication between connected devices.

**Multi-parameter batches:** Most commands accept repeated parameter groups (e.g. `type_2, ch_2, ...`) to operate on multiple channels in a single command.

<!-- UNRESOLVED: physical layer specifications (voltage, current, power consumption) not stated in source -->
<!-- UNRESOLVED: EDID data format and structure not detailed in source -->
<!-- UNRESOLVED: error recovery behavior when commands conflict not documented -->
<!-- UNRESOLVED: command timing requirements (minimum delay between commands) not stated in source -->

## Provenance

```yaml
source_domains:
  - idkav.com
source_urls:
  - https://www.idkav.com/content/documents/manuals/njr-ctb_cm_ver.1.1.1_en.pdf
retrieved_at: 2026-07-14T09:09:17.594Z
last_checked_at: 2026-07-21T22:52:50.869Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:52:50.869Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions verified as wire-literal commands in source; transport parameters complete; all source commands represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power supply specifications, physical dimensions, operating temperature ranges not stated in source"
- "flow control not mentioned in source"
- "volume/gain commands not found in source"
- "source does not describe unsolicited event notifications from the device."
- "no multi-step macro sequences described in source."
- "source contains no safety warnings, interlock procedures, or power sequencing requirements."
- "physical layer specifications (voltage, current, power consumption) not stated in source"
- "EDID data format and structure not detailed in source"
- "error recovery behavior when commands conflict not documented"
- "command timing requirements (minimum delay between commands) not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
