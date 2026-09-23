---
spec_id: admin/zeevee-inc-zyper4k-copper-encoder-usb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Zeevee Inc Zyper4K Copper Encoder USB Control Spec"
manufacturer: "Zeevee Inc"
model_family: "Zyper4K Copper Encoder USB"
aliases: []
compatible_with:
  manufacturers:
    - "Zeevee Inc"
  models:
    - "Zyper4K Copper Encoder USB"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - zeevee.com
source_urls:
  - https://www.zeevee.com/zmp-api-manual/
  - https://www.zeevee.com/zyper4k-advanced-topics/
  - https://www.zeevee.com/zmp-rs232-syntax-guide/
retrieved_at: 2026-09-02T18:21:57.396Z
last_checked_at: 2026-09-22T11:54:27.259Z
generated_at: 2026-09-22T11:54:27.259Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility for the Copper Encoder USB variant not stated in source"
  - "voltage/current/power specs not stated in source"
  - "per-event schema not enumerated in source."
  - "per-event schema for `events` mode not enumerated in source"
  - "SSH port number not stated in source (default 22 assumed by tool, not in source)"
verification:
  verdict: verified
  checked_at: 2026-09-22T11:54:27.259Z
  matched_actions: 270
  action_count: 270
  confidence: medium
  summary: "Spec's 270 wire-literal ZMP ASCII commands each have a verbatim counterpart in the refined source manual; transport port 23 and no-auth default both anchored in source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Zeevee Inc Zyper4K Copper Encoder USB Control Spec

## Summary
Spec covers the ZyPer Management Platform (ZMP) ASCII command-line API used to control ZeeVee ZyPer4K Copper Encoder USB endpoints. Access is over Telnet or SSH to the ZMP server; commands cover device discovery, joining encoder-to-decoder video/audio/USB streams, RS-232 and IR tunneling, EDID management, multiview/video-wall layout, presets, SNMP/LDAP/TLS admin, redundancy and firmware update.

<!-- UNRESOLVED: firmware version compatibility for the Copper Encoder USB variant not stated in source -->
<!-- UNRESOLVED: voltage/current/power specs not stated in source -->

## Transport
```yaml
# Source describes telnet and SSH access to the ZMP API server.
# Telnet port default documented as standard telnet (23); SSH available on the same server.
# Source states "By default Telnet has no password."
protocols:
  - tcp
addressing:
  port: 23  # inferred: telnet default; SSH port not stated in source
auth:
  type: none  # inferred: no auth procedure in source. Default telnet password is none; optional telnet password may be set via `set server telnet password`.
```

## Traits
```yaml
# Power: not explicitly addressed (encoder always-on in ZMP model)
# Routable: yes - `join enc dec <mode>` switches encoder source to decoder
# Queryable: yes - `show device status`, `show device config`, `show device capabilities`, etc.
# Levelable: not applicable (no volume control on encoder)
# Note: explicit power on/off is achieved via `restart device` / `shutdown server` / device reboot; no dedicated power on/off action documented.
```

## Actions
```yaml
# Each entry below maps to a distinct command-bearing entry the source documents.
# Variable parts are shown as {param}; literals as quoted strings.
# Kind: action = mutate state; query = read state; kind omitted where source treats both as command.

# --- Discovery / device management ---
- id: add_device
  label: Add Device (manual, cross-VLAN)
  kind: action
  command: "add device ipAddress {ip}"
  params:
    - name: ip
      type: string
      description: IP address of the device

- id: delete_device
  label: Delete Device
  kind: action
  command: "delete device {id}"
  params:
    - name: id
      type: string
      description: Name or MAC address

- id: factory_defaults_device
  label: Factory Defaults Device
  kind: action
  command: "factoryDefaults device {id}"
  params:
    - name: id
      type: string
      description: Name or MAC address

- id: delete_allConfiguration
  label: Delete All Configuration
  kind: action
  command: "delete allConfiguration {action}"
  params:
    - name: action
      type: enum
      description: reboot | restart | shutdown

- id: restart_device
  label: Restart Device
  kind: action
  command: "restart device {id}"
  params:
    - name: id
      type: string
      description: Name or MAC address

- id: shutdown_server
  label: Shutdown Server
  kind: action
  command: "shutdown server"

- id: flashLeds
  label: Flash LEDs (identify)
  kind: action
  command: "flashLeds {id}"
  params:
    - name: id
      type: string
      description: Name or MAC address

- id: diagnostics_device
  label: Diagnostics Device
  kind: query
  command: "diagnostics device {id}"
  params:
    - name: id
      type: string

- id: show_device_status
  label: Show Device Status
  kind: query
  command: "show device status {id}"
  params:
    - name: id
      type: string
      description: Name or portion of MAC address

- id: show_device_config
  label: Show Device Config
  kind: query
  command: "show device config {id}"
  params:
    - name: id
      type: string

- id: show_device_capabilities
  label: Show Device Capabilities
  kind: query
  command: "show device capabilities {id}"
  params:
    - name: id
      type: string

- id: show_device_connections
  label: Show Device Connections
  kind: query
  command: "show device connections"

- id: show_device_names
  label: Show Device Names
  kind: query
  command: "show device names"

- id: show_device_userAdded
  label: Show User-Added Devices
  kind: query
  command: "show device userAdded"

- id: dumpusb
  label: Dump USB Info
  kind: query
  command: "dumpusb"

- id: show_dataTunnels
  label: Show Data Tunnels
  kind: query
  command: "show dataTunnels"

- id: show_values
  label: Show Values (enumerated option sets)
  kind: query
  command: "show values {arg}"
  params:
    - name: arg
      type: string
      description: all | encoder status | encoder config | decoder status | decoder config | server info | server config | server redundancy | multiview status | multiview config

# --- Join (encoder -> decoder routing) ---
- id: join_fastSwitched
  label: Join Fast-Switched
  kind: action
  command: "join {enc} {dec} fastSwitched"
  params:
    - {name: enc, type: string, description: Encoder name or MAC}
    - {name: dec, type: string, description: Decoder name or MAC}

- id: join_genlocked
  label: Join Genlocked (ZyPer4K only)
  kind: action
  command: "join {enc} {dec} genlocked"
  params:
    - {name: enc, type: string}
    - {name: dec, type: string}

- id: join_genlockedScaled
  label: Join Genlocked Scaled (ZyPer4K only)
  kind: action
  command: "join {enc} {dec} genlockedScaled"
  params:
    - {name: enc, type: string}
    - {name: dec, type: string}

- id: join_analogAudio
  label: Join Analog Audio
  kind: action
  command: "join {enc} {dec} analogAudio"
  params:
    - {name: enc, type: string}
    - {name: dec, type: string}

- id: join_hdmiAudio
  label: Join HDMI Audio
  kind: action
  command: "join {enc} {dec} hdmiAudio"
  params:
    - {name: enc, type: string}
    - {name: dec, type: string}

- id: join_danteAudio
  label: Join Dante Audio
  kind: action
  command: "join {enc} {dec} danteAudio"
  params:
    - {name: enc, type: string}
    - {name: dec, type: string}

- id: join_video
  label: Join Video Only
  kind: action
  command: "join {enc} {dec} video"
  params:
    - {name: enc, type: string}
    - {name: dec, type: string}

- id: join_videoWall
  label: Join Encoder to Video Wall
  kind: action
  command: "join {enc} {wall} videoWall"
  params:
    - {name: enc, type: string}
    - {name: wall, type: string, description: Video wall name}

- id: join_multiview
  label: Join Multiview to Display (ZyPer4K only)
  kind: action
  command: "join {mv} {dec} multiview"
  params:
    - {name: mv, type: string, description: Multiview name}
    - {name: dec, type: string}

- id: join_window
  label: Join Window (partial source/display, ZyPer4K)
  kind: action
  command: "join {enc} {dec} window viewportSource {sx} {sy} {sw} {sh} viewportDest {dx} {dy} {dw} {dh}"
  params:
    - {name: enc, type: string}
    - {name: dec, type: string}
    - {name: sx, type: integer, description: Source start X}
    - {name: sy, type: integer, description: Source start Y}
    - {name: sw, type: integer, description: Source width}
    - {name: sh, type: integer, description: Source height}
    - {name: dx, type: integer, description: Dest start X}
    - {name: dy, type: integer, description: Dest start Y}
    - {name: dw, type: integer, description: Dest width}
    - {name: dh, type: integer, description: Dest height}

- id: join_usb
  label: Join USB
  kind: action
  command: "join {enc} {dec} usb"
  params:
    - {name: enc, type: string}
    - {name: dec, type: string}

- id: join_none
  label: Disconnect Join
  kind: action
  command: "join none {dec} fastSwitched"
  params:
    - {name: dec, type: string}

- id: join_videoSource_audio
  label: Auto-Join Audio With Video (ZyPerUHD)
  kind: action
  command: "join videoSource {dec} audio"
  params:
    - {name: dec, type: string}

- id: join_videoSource_hdmiAudio
  label: Auto-Join HDMI Audio With Video (ZyPer4K)
  kind: action
  command: "join videoSource {dec} hdmiAudio"
  params:
    - {name: dec, type: string}

- id: channel_up
  label: Channel Up (decoder cycles encoder by suffix)
  kind: action
  command: "channel up {dec}"
  params:
    - {name: dec, type: string, description: Decoder name or MAC}

- id: channel_down
  label: Channel Down
  kind: action
  command: "channel down {dec}"
  params:
    - {name: dec, type: string}

# --- Set device ---
- id: set_device_general_name
  label: Set Device Name
  kind: action
  command: "set device {id} general name {str}"
  params:
    - {name: id, type: string}
    - {name: str, type: string, description: No colon, no quotes, no spaces}

- id: set_device_ip
  label: Set Device IP Mode
  kind: action
  command: "set device {id} ip {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: dhcp | linkLocal}

- id: set_device_ip_static
  label: Set Device Static IP
  kind: action
  command: "set device {id} ip static {addr} {mask} {gateway}"
  params:
    - {name: id, type: string}
    - {name: addr, type: string}
    - {name: mask, type: string}
    - {name: gateway, type: string}

- id: set_device_rs232
  label: Set Device RS-232
  kind: action
  command: "set device {id} rs232 {baud} {data} {stop} {parity}"
  params:
    - {name: id, type: string}
    - {name: baud, type: enum, description: 2400 | 9600 | 19200 | 38400 | 57600 | 115200}
    - {name: data, type: enum, description: 7-bits | 8-bits}
    - {name: stop, type: enum, description: 1-stop | 2-stop}
    - {name: parity, type: enum, description: even | odd | none}

- id: set_device_irProcessing
  label: Set Device IR Processing
  kind: action
  command: "set device {id} irProcessing {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: zyperTrigger | zyperRemote | none}

- id: set_device_optionCard
  label: Set Device Option Card (ZyPer4K)
  kind: action
  command: "set device {id} optionCard type {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: auto | hdsdi | displayPort | analog | hdmiOptionalIn | sdi12g}

- id: set_device_security
  label: Set Device Security (Semtech server-device)
  kind: action
  command: "set device {id} security {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: enabled | disabled}

- id: set_device_sendIpMcastRange
  label: Set Device Multicast Range (ZyPer4K)
  kind: action
  command: "set device {id} sendIpMcastRange {first_ip} {last_ip}"
  params:
    - {name: id, type: string}
    - {name: first_ip, type: string}
    - {name: last_ip, type: string}

- id: set_device_sourceDisplay_iconImageName
  label: Set Device Icon
  kind: action
  command: "set device {id} sourceDisplay iconImageName {fname}"
  params:
    - {name: id, type: string}
    - {name: fname, type: enum, description: abc | cbs | nbc | fox | xbox | golf | espn | tennis | cnn | ps3 | DVD | BluRay | VCR | CableBox | Laptop | BroadcastCamera | SecurityCamera}

- id: set_device_sourceDisplay_location
  label: Set Device Location
  kind: action
  command: "set device {id} sourceDisplay location {loc}"
  params:
    - {name: id, type: string}
    - {name: loc, type: string}

- id: set_device_sourceDisplay_manufacturer
  label: Set Device Manufacturer
  kind: action
  command: "set device {id} sourceDisplay manufacturer {mfg}"
  params:
    - {name: id, type: string}
    - {name: mfg, type: string}

- id: set_device_sourceDisplay_model
  label: Set Device Model
  kind: action
  command: "set device {id} sourceDisplay model {model}"
  params:
    - {name: id, type: string}
    - {name: model, type: string}

- id: set_device_sourceDisplay_serialNumber
  label: Set Device Serial Number
  kind: action
  command: "set device {id} sourceDisplay serialNumber {serial}"
  params:
    - {name: id, type: string}
    - {name: serial, type: string}

- id: set_device_usbFilter
  label: Set Device USB Filter
  kind: action
  command: "set device {id} usbFilter {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: none | exceptHid | storage}

- id: set_device_usbType
  label: Set Device USB Type (ZyPer4K-XSE)
  kind: action
  command: "set device {id} usbType {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: full | hid}

- id: set_device_utilityPort
  label: Set Device Utility Port
  kind: action
  command: "set device {id} utilityPort {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: enabled | disabled | onlyDanteAudio}

- id: set_device_videoPort
  label: Set Device Video Port
  kind: action
  command: "set device {id} videoPort {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: hdmi | hdmiOptionalIn | usbc | auto | displayPort | hdsdi | 12gsdi | component | composite | s-video | vga}

- id: set_device_dante_port
  label: Set Device Dante Port (ZyPerUHD60-2EA/2DA, Z4K-XSE)
  kind: action
  command: "set device {id} danteport {arg} {boot}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: video | utility}
    - {name: boot, type: enum, description: reboot | noReboot}

- id: set_device_dante_ip
  label: Set Device Dante IP Mode
  kind: action
  command: "set device {id} danteip {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: dhcp | linkLocal}

- id: set_device_dante_ip_static
  label: Set Device Dante Static IP
  kind: action
  command: "set device {id} ip static {addr} {mask} {gateway}"
  params:
    - {name: id, type: string}
    - {name: addr, type: string}
    - {name: mask, type: string}
    - {name: gateway, type: string}

- id: set_device_dante_vlan_mode
  label: Set Device Dante VLAN (KDS-17)
  kind: action
  command: "set device {id} dantevlan mode {arg} vlanId {vlan_id} {boot}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: enabled | disabled}
    - {name: vlan_id, type: integer, description: 1-4000}
    - {name: boot, type: enum, description: reboot | noReboot}

# --- Set decoder ---
- id: set_decoder_analogAudioOut
  label: Set Decoder Analog Audio Out
  kind: action
  command: "set decoder {id} analogAudioOut source {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: source analogAudio | source hdmiAudio | source hdmiPassthroughAudio | source hdmiAudioDownmix | danteAudio | directDanteAudio}

- id: set_decoder_hdmiAudioOut
  label: Set Decoder HDMI Audio Out
  kind: action
  command: "set decoder {id} hdmiAudioOut source {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: source analogAudio | source hdmiAudio | source hdmiPassthroughAudio | source hdmiAudioDownmix | danteAudio | directDanteAudio}

- id: set_decoder_connectionMode
  label: Set Decoder Connection Mode (ZyPer4K)
  kind: action
  command: "set decoder {id} connectionMode {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: fast-switched | genlocked | genlocked-scaled}

- id: set_decoder_displayAdvancedTiming
  label: Set Decoder Advanced Timing
  kind: action
  command: "set decoder {id} displayAdvancedTiming activeSize {pix_h} {pix_v} fps {fps} total-size {tot_h} {tot_v} syncFrontPorch {fp_h} {fp_v} syncWidth {sw_h} {sw_v} syncPolarity {h_pol} {v_pol}"
  params:
    - {name: id, type: string}
    - {name: pix_h, type: integer}
    - {name: pix_v, type: integer}
    - {name: fps, type: float}
    - {name: tot_h, type: integer}
    - {name: tot_v, type: integer}
    - {name: fp_h, type: integer}
    - {name: fp_v, type: integer}
    - {name: sw_h, type: integer}
    - {name: sw_v, type: integer}
    - {name: h_pol, type: enum, description: hPositive | hNegative}
    - {name: v_pol, type: enum, description: vPositive | vNegative}

- id: set_decoder_displayMode
  label: Set Decoder Display Mode
  kind: action
  command: "set decoder {id} displayMode {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: box | crop | stretch}

- id: set_decoder_displayResolution
  label: Set Decoder Display Resolution
  kind: action
  command: "set decoder {id} displayResolution {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: string, description: auto | source | activeSize <int> <int> fps <int>|source}

- id: set_decoder_hdcpMode
  label: Set Decoder HDCP Mode
  kind: action
  command: "set decoder {id} hdcpMode {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: auto | forceVersion1.4 | forceVersion2.2}

- id: set_decoder_autoAudioConnections
  label: Set Decoder Auto Audio Follow Video
  kind: action
  command: "set decoder {id} autoAudioConnections hdmiAudioFollowVideo {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: enabled | disabled}

- id: set_decoder_danteAudioOut
  label: Set Decoder Dante Audio Out
  kind: action
  command: "set decoder {id} danteAudioOut source {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: joinedAudio | none | analogAudio | hdmiAudioDownmix | DanteAudio}

- id: set_decoder_edidPreferMode
  label: Set Decoder EDID Preferred Mode
  kind: action
  command: "set decoder {id} edidPreferMode {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: max | strict}

- id: set_decoder_hdmi5vControl
  label: Set Decoder HDMI 5V Control (Z4K-XS/XSE/XR)
  kind: action
  command: "set decoder {id} hdmi5vControl {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: enabled | disabled}

- id: set_decoder_lowLatency
  label: Set Decoder Low Latency (ZyPerUHD60)
  kind: action
  command: "set decoder {id} lowLatency {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: enabled | disabled}

- id: set_decoder_osdStatusMode
  label: Set Decoder OSD Status Mode
  kind: action
  command: "set decoder {id} osdStatusMode {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: enabled | disabled}

- id: set_decoder_powerSave
  label: Set Decoder Power Save (ZyPerUHD/UHD60)
  kind: action
  command: "set decoder {id} powerSave {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: enabled | disabled}

# --- Set encoder ---
- id: set_encoder_analogAudioOut
  label: Set Encoder Analog Audio Out
  kind: action
  command: "set encoder {id} analogAudioOut source {type}"
  params:
    - {name: id, type: string}
    - {name: type, type: enum, description: none | hdmiAudioDownmix | directDanteAudio}

- id: set_encoder_danteAudioOut
  label: Set Encoder Dante Audio Out (ZyPerUHD60 Dante)
  kind: action
  command: "set encoder {id} danteAudioOut source {mode}"
  params:
    - {name: id, type: string}
    - {name: mode, type: enum, description: analogAudio | hdmiAudioDownmix}

- id: set_encoder_edid_audio
  label: Set Encoder EDID Audio Mode
  kind: action
  command: "set encoder {id} edid audio {mode}"
  params:
    - {name: id, type: string}
    - {name: mode, type: enum, description: onlyPcm | allowCompressed | serverDefault}

- id: set_encoder_hdcpMode
  label: Set Encoder HDCP Mode
  kind: action
  command: "set encoder {id} hdcpMode {type}"
  params:
    - {name: id, type: string}
    - {name: type, type: enum, description: enabled | enabled1_4 | disabled}

- id: load_encoderEdid
  label: Load Encoder EDID
  kind: action
  command: "load encoderEdid {enc} {mode} {file}"
  params:
    - {name: enc, type: string}
    - {name: mode, type: enum, description: auto | builtIn | default | saved}
    - {name: file, type: string}

- id: save_deviceEdid
  label: Save Device EDID to File
  kind: action
  command: "save deviceEdid {id} {file}"
  params:
    - {name: id, type: string}
    - {name: file, type: string}

- id: load_idleImage
  label: Load Idle Image (ZyPerUHD)
  kind: action
  command: "load idleImage {dec} filename {file}"
  params:
    - {name: dec, type: string}
    - {name: file, type: string}

# --- Send IR/RS232/CEC to endpoint ---
- id: send_ir
  label: Send IR Pronto Code
  kind: action
  command: "send {id} ir {hex}"
  params:
    - {name: id, type: string}
    - {name: hex, type: string, description: Hex representation of Pronto code (ZyPer4K family only); max 1024 chars}

- id: send_rs232
  label: Send RS-232 String
  kind: action
  command: "send {id} rs232 {text}"
  params:
    - {name: id, type: string}
    - {name: text, type: string, description: ASCII up to 256 chars; supports \\n \\r \\t \\\\ \\xnn}

- id: send_cec_on
  label: Send CEC On
  kind: action
  command: "send {id} cec on"
  params:
    - {name: id, type: string}

- id: send_cec_off
  label: Send CEC Off
  kind: action
  command: "send {id} cec off"
  params:
    - {name: id, type: string}

- id: send_cec_hex
  label: Send CEC Hex
  kind: action
  command: "send {id} cec {hexString}"
  params:
    - {name: id, type: string}
    - {name: hexString, type: string, description: hex numerals no delimiters (Z4K and UHD60 only)}

- id: switch_rs232
  label: Switch RS-232 Connection
  kind: action
  command: "switch {txid} {rxid} rs232"
  params:
    - {name: txid, type: string}
    - {name: rxid, type: string, description: Use 'none' to pass data to arbitrary IP host}

- id: switch_ir
  label: Switch IR Connection
  kind: action
  command: "switch {txid} {rxid} ir"
  params:
    - {name: txid, type: string}
    - {name: rxid, type: string}

- id: dataConnect
  label: dataConnect (open TCP tunnel for IR/RS232)
  kind: action
  command: "dataConnect {id1} {id2} {mode} tunnelPort {port}"
  params:
    - {name: id1, type: string}
    - {name: id2, type: string, description: Device name or 'server'}
    - {name: mode, type: enum, description: ir | rs232}
    - {name: port, type: integer, description: TCP port 1024-49152; omit keyword for dynamic assign}

- id: show_responses
  label: Show Device Responses
  kind: query
  command: "show responses {id} {type} {param3}"
  params:
    - {name: id, type: string}
    - {name: type, type: enum, description: ir | rs232}
    - {name: param3, type: enum, description: last | lastChangeId | since <int>}

- id: set_responses_rs232TermChars
  label: Set RS-232 Termination Chars
  kind: action
  command: "set responses {id} rs232TermChars {chr}"
  params:
    - {name: id, type: string}
    - {name: chr, type: string, description: Default \"\\n\\r\""}

# --- Preview stream (encoder thumbnail) ---
- id: previewStream_start_hls
  label: Start HLS Preview Stream
  kind: action
  command: "previewStream {enc} start hls width {size}"
  params:
    - {name: enc, type: string}
    - {name: size, type: integer, description: 180-400 pixels}

- id: previewStream_start_jpeg
  label: Start JPEG Preview Stream
  kind: action
  command: "previewStream {enc} start jpeg width {size}"
  params:
    - {name: enc, type: string}
    - {name: size, type: integer, description: 180-400 pixels}

- id: previewStream_stop
  label: Stop Preview Stream
  kind: action
  command: "previewStream {enc} stop"
  params:
    - {name: enc, type: string}

- id: start_encoder_stream
  label: Start Encoder Multicast Stream (ZyPer4K)
  kind: action
  command: "start encoder {id} stream {stream}"
  params:
    - {name: id, type: string}
    - {name: stream, type: enum, description: analogAudio | hdmiAudio | video | videoScaled}

- id: stop_encoder_stream
  label: Stop Encoder Multicast Stream (ZyPer4K)
  kind: action
  command: "stop encoder {id} stream {stream}"
  params:
    - {name: id, type: string}
    - {name: stream, type: enum, description: analogAudio | hdmiAudio | video | videoScaled}

# --- Zone / Video Wall / Multiview management ---
- id: create_zone
  label: Create Zone
  kind: action
  command: "create zone {name}"
  params:
    - {name: name, type: string}

- id: delete_zone
  label: Delete Zone
  kind: action
  command: "delete zone {name}"
  params:
    - {name: name, type: string}

- id: rename_zone
  label: Rename Zone
  kind: action
  command: "rename zone {zonename} newName {newzonename}"
  params:
    - {name: zonename, type: string}
    - {name: newzonename, type: string}

- id: add_zoneDisplay
  label: Add Display to Zone
  kind: action
  command: "add zoneDisplay {name} {id}"
  params:
    - {name: name, type: string, description: Zone name or 'All'}
    - {name: id, type: string}

- id: delete_zoneDisplay
  label: Delete Display from Zone
  kind: action
  command: "delete zoneDisplay {name} {id}"
  params:
    - {name: name, type: string}
    - {name: id, type: string}

- id: show_zones
  label: Show Zones
  kind: query
  command: "show zones"

- id: create_videoWall
  label: Create Video Wall (default 2x2)
  kind: action
  command: "create videoWall {name}"
  params:
    - {name: name, type: string}

- id: delete_videoWall
  label: Delete Video Wall
  kind: action
  command: "delete videoWall {name}"
  params:
    - {name: name, type: string}

- id: set_videoWall_size
  label: Set Video Wall Size & Bezel
  kind: action
  command: "set videoWall {id} size rows {rows} columns {cols} topBezel {bezt} bottomBezel {bezb} leftBezel {bezl} rightBezel {bezr}"
  params:
    - {name: id, type: string}
    - {name: rows, type: integer, description: Max 15 for Z4K/UHD/UHD60; Max 4 for ZyPerHD}
    - {name: cols, type: integer, description: Max 15 for Z4K/UHD/UHD60; Max 4 for ZyPerHD}
    - {name: bezt, type: integer}
    - {name: bezb, type: integer}
    - {name: bezl, type: integer}
    - {name: bezr, type: integer}

- id: set_videoWall_decoder
  label: Assign Decoder to Video Wall Cell
  kind: action
  command: "set videoWall {wallid} decoder {id} row {row} column {col}"
  params:
    - {name: wallid, type: string}
    - {name: id, type: string, description: Decoder name/MAC or 'none'}
    - {name: row, type: integer}
    - {name: col, type: integer}

- id: set_videoWall_newName
  label: Rename Video Wall
  kind: action
  command: "set videoWall {id} newName {name}"
  params:
    - {name: id, type: string}
    - {name: name, type: string}

- id: show_videoWalls
  label: Show Video Walls
  kind: query
  command: "show videoWalls"

- id: create_multiview
  label: Create Multiview (ZyPer4K)
  kind: action
  command: "create multiview {name}"
  params:
    - {name: name, type: string}

- id: clone_multiview
  label: Clone Multiview (ZyPer4K)
  kind: action
  command: "clone multiview {name} to {newmvname}"
  params:
    - {name: name, type: string}
    - {name: newmvname, type: string}

- id: delete_multiview
  label: Delete Multiview (ZyPer4K)
  kind: action
  command: "delete multiview {name}"
  params:
    - {name: name, type: string}

- id: delete_multiviewWindow
  label: Delete Multiview Window (ZyPer4K)
  kind: action
  command: "delete multiviewWindow {name} window {wn}"
  params:
    - {name: name, type: string}
    - {name: wn, type: integer, description: 1-9}

- id: set_multiview_percent
  label: Set Multiview Window (percentage coords, ZyPer4K)
  kind: action
  command: "set multiview {id} windowNumber {wn} encoderName {enc} position percentPositionX {posx} percentPositionY {posy} percentSizeX {sx} percentSizeY {sy} layer {ly}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer, description: 1-19}
    - {name: enc, type: string}
    - {name: posx, type: integer, description: 0-99}
    - {name: posy, type: integer, description: 0-99}
    - {name: sx, type: integer, description: 0-99}
    - {name: sy, type: integer, description: 0-99}
    - {name: ly, type: integer, description: 1-9}

- id: set_multiview_pixel
  label: Set Multiview Window (pixel coords, ZyPer4K)
  kind: action
  command: "set multiview {id} windowNumber {wn} encoderName {enc} position pixelPositionX {posx} pixelPositionY {posy} pixelSizeX {sx} pixelSizeY {sy} layer {ly}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer, description: 1-19}
    - {name: enc, type: string}
    - {name: posx, type: integer}
    - {name: posy, type: integer}
    - {name: sx, type: integer}
    - {name: sy, type: integer}
    - {name: ly, type: integer, description: 1-9}

- id: set_multiview_window_modify
  label: Modify Multiview Window Layer/Pos/Size (ZyPer4K)
  kind: action
  command: "set multiview {id} windowNumber {wn} positionX {posx} positionY {posy} sizeX {sx} sizeY {sy} layer {ly}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer}
    - {name: posx, type: integer}
    - {name: posy, type: integer}
    - {name: sx, type: integer}
    - {name: sy, type: integer}
    - {name: ly, type: integer, description: 1-9}

- id: set_multiview_size_pct
  label: Set Multiview Window Size (percentage)
  kind: action
  command: "set multiview {id} windowNumber {wn} size percentSizeX {sx} percentSizeY {sy}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer}
    - {name: sx, type: integer, description: 0-99}
    - {name: sy, type: integer, description: 0-99}

- id: set_multiview_size_px
  label: Set Multiview Window Size (pixels)
  kind: action
  command: "set multiview {id} windowNumber {wn} size pixelSizeX {sx} pixelSizeY {sy}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer}
    - {name: sx, type: integer}
    - {name: sy, type: integer}

- id: set_multiview_allowMainStream
  label: Set Multiview Allow Main Stream (ZyPer4K)
  kind: action
  command: "set multiview {id} allowMainStream {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: enum, description: enabled | disabled}

- id: set_multiview_audioSource_windowNumber
  label: Set Multiview Audio Source Window (ZyPer4K)
  kind: action
  command: "set multiview {id} audioSource windowNumber {arg}"
  params:
    - {name: id, type: string}
    - {name: arg, type: integer, description: 1-19 or 'none'}

- id: set_multiview_window_channel_up
  label: Multiview Window Channel Up (ZyPer4K)
  kind: action
  command: "set multiview {id} windowNumber {wn} channel up"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer}

- id: set_multiview_window_channel_down
  label: Multiview Window Channel Down (ZyPer4K)
  kind: action
  command: "set multiview {id} windowNumber {wn} channel down"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer}

- id: set_multiview_canvasSize
  label: Set Multiview Canvas Size (ZyPer4K)
  kind: action
  command: "set multiview {id} canvasSize pixels {pixelsHorz} {pixelsVert}"
  params:
    - {name: id, type: string}
    - {name: pixelsHorz, type: integer, description: 640-8192}
    - {name: pixelsVert, type: integer, description: 480-8192; total canvas pixels max 8,847,360}

- id: set_multiview_newEncoderName
  label: Set Multiview Window New Encoder (ZyPer4K)
  kind: action
  command: "set multiview {id} windowNumber {wn} newEncoderName {encName}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer, description: 1-19}
    - {name: encName, type: string, description: Encoder name/MAC or 'none'}

- id: set_multiview_title
  label: Set Multiview Window Title (ZyPer4K, not XS/XR/XSE)
  kind: action
  command: "set multiview {id} windowNumber {wn} title textString {title}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer, description: 1-19}
    - {name: title, type: string}

- id: set_multiview_title_textsize
  label: Set Multiview Title Text Size
  kind: action
  command: "set multiview {id} windowNumber {wn} title text-size {ts}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer}
    - {name: ts, type: integer, description: 1-10}

- id: set_multiview_title_transparency
  label: Set Multiview Title Transparency
  kind: action
  command: "set multiview {id} windowNumber {wn} title transparency text {tt} background {bt}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer}
    - {name: tt, type: integer, description: 0-100}
    - {name: bt, type: integer, description: 0-100}

- id: set_multiview_title_color
  label: Set Multiview Title Color
  kind: action
  command: "set multiview {id} windowNumber {wn} title color text {tc} background {bc}"
  params:
    - {name: id, type: string}
    - {name: wn, type: integer}
    - {name: tc, type: enum, description: black | blue | brown | cyan | darkBlue | gray | green | lightBlue | lightGray | lime | magenta | maroon | olive | orange | purple | red | silver | white | yellow}
    - {name: bc, type: enum, description: same color list as tc}

- id: show_multiviews_config
  label: Show Multiviews Config (ZyPer4K)
  kind: query
  command: "show multiviews config"

- id: show_multiviews_status
  label: Show Multiviews Status (ZyPer4K)
  kind: query
  command: "show multiviews status"

- id: show_multiviews_titles
  label: Show Multiviews Titles (ZyPer4K)
  kind: query
  command: "show multiviews titles {arg}"
  params:
    - {name: arg, type: enum, description: config | text}

# --- KVM (Z4K-XS/XSE/XR) ---
- id: create_kvm
  label: Create KVM (Z4K-XS/XSE/XR)
  kind: action
  command: "create kvm {name}"
  params:
    - {name: name, type: string}

- id: delete_kvm
  label: Delete KVM
  kind: action
  command: "delete kvm {name}"
  params:
    - {name: name, type: string}

- id: delete_kvm_cell
  label: Delete KVM Cell
  kind: action
  command: "delete kvm {name} row {int} col {int}"
  params:
    - {name: name, type: string}
    - {name: int_row, type: integer}
    - {name: int_col, type: integer}

- id: rename_kvm
  label: Rename KVM
  kind: action
  command: "rename zone {kvmname} newName {newkvmname}"
  params:
    - {name: kvmname, type: string}
    - {name: newkvmname, type: string}

- id: set_kvm
  label: Set KVM Cell
  kind: action
  command: "set kvm {name} row {row} column {col} {arg} {id}"
  params:
    - {name: name, type: string}
    - {name: row, type: integer}
    - {name: column, type: integer}
    - {name: arg, type: enum, description: decoder | encoder | multiview | usbSource}
    - {name: id, type: string}

- id: set_kvm_hotkeyBase
  label: Set KVM Hotkey Base (Z4K-XS/XSE/XR)
  kind: action
  command: "set kvm all hotkeyBase {option}"
  params:
    - {name: option, type: enum, description: ctrl-ctrl | shift-shift | alt-alt | scroll-scroll | print-print}

- id: start_kvm
  label: Start KVM
  kind: action
  command: "start kvm {name}"
  params:
    - {name: name, type: string}

- id: stop_kvm
  label: Stop KVM
  kind: action
  command: "stop kvm {name}"
  params:
    - {name: name, type: string}

- id: show_kvm_config
  label: Show KVM Config
  kind: query
  command: "show kvm config"

- id: show_kvm_swapped
  label: Show KVM Swapped
  kind: query
  command: "show kvm swapped"

# --- Presets ---
- id: create_presetNew
  label: Create Preset
  kind: action
  command: "create presetNew {name} commands {connections}"
  params:
    - {name: name, type: string}
    - {name: connections, type: enum, description: empty | existingConnections}

- id: create_presetSchedule
  label: Create Preset Schedule
  kind: action
  command: "create presetSchedule {presetname} schedule {name}"
  params:
    - {name: presetname, type: string}
    - {name: name, type: string}

- id: delete_preset
  label: Delete Preset / Runlog / Schedule
  kind: action
  command: "delete preset {name}"
  params:
    - {name: name, type: string}

- id: delete_preset_runLog
  label: Delete Preset Runlog
  kind: action
  command: "delete preset {name} runLog"
  params:
    - {name: name, type: string}

- id: delete_preset_schedule
  label: Delete Preset Schedule
  kind: action
  command: "delete preset {name} schedule {schname}"
  params:
    - {name: name, type: string}
    - {name: schname, type: string}

- id: run_preset
  label: Run Preset
  kind: action
  command: "run preset {name}"
  params:
    - {name: name, type: string}

- id: set_preset_commands_auto
  label: Set Preset Commands (auto)
  kind: action
  command: "set preset {id} commands auto {connections}"
  params:
    - {name: id, type: string}
    - {name: connections, type: enum, description: existingConnections | empty}

- id: set_preset_commands_blob
  label: Set Preset Commands (blob)
  kind: action
  command: "set preset {id} commands blob {connections}"
  params:
    - {name: id, type: string}
    - {name: connections, type: string, description: Quoted semicolon-separated command list, max 4096 chars}

- id: set_preset_description
  label: Set Preset Description
  kind: action
  command: "set preset {id} description {description}"
  params:
    - {name: id, type: string}
    - {name: description, type: string}

- id: set_preset_schedule_eventColor
  label: Set Preset Schedule Event Color
  kind: action
  command: "set preset {id} schedule {scname} eventColor {color}"
  params:
    - {name: id, type: string}
    - {name: scname, type: string}
    - {name: color, type: string, description: aqua | aquamarine | black | blue | brown | coral | cyan | darkBlue | darkSlateGray | deepPink | deepSkyBlue | fuchsia | gray | green | hotPink | khaki | lightBlue | lightGray | lightSeaGreen | lightSlateGray | lime | magenta | maroon | mistyRose | olive | orange | pink | purple | red | silver | teal | web-hex (e.g. #22ffee) | white | yellow | zvGreen | zvPurple}

- id: set_preset_schedule_month
  label: Set Preset Schedule Month/Day/Time
  kind: action
  command: "set preset {id} schedule {scname} month {month} dayOfMonth {dayOfMonth} dayOfWeek {dayOfWeek} hour {hour} minute {minute}"
  params:
    - {name: id, type: string}
    - {name: scname, type: string}
    - {name: month, type: enum, description: all | jan | feb | mar | apr | may | jun | jul | aug | oct | nov | dec}
    - {name: dayOfMonth, type: string, description: int date or 'all'}
    - {name: dayOfWeek, type: enum, description: all | sunday | monday | tuesday | wednesday | thursday | friday | saturday | weekday | weekend}
    - {name: hour, type: string, description: int 0-23 or 'all'}
    - {name: minute, type: integer, description: 0-59}

- id: show_preset
  label: Show Preset
  kind: query
  command: "show preset {name} {arg}"
  params:
    - {name: name, type: string}
    - {name: arg, type: enum, description: commandBlob | commands | config | runLog | schedule | status}

# --- Accounts / roles ---
- id: create_account
  label: Create Account
  kind: action
  command: "create account {name} {passwordOption}"
  params:
    - {name: name, type: string}
    - {name: passwordOption, type: enum, description: password | tempInitialPassword}

- id: delete_account
  label: Delete Account
  kind: action
  command: "delete account {id}"
  params:
    - {name: id, type: string}

- id: create_role
  label: Create Role
  kind: action
  command: "create role {name} allSubsystems {maxAccess} {accessLevel}"
  params:
    - {name: name, type: string}
    - {name: maxAccess, type: string}
    - {name: accessLevel, type: enum, description: admin | config | join | none | view}

- id: delete_role
  label: Delete Role
  kind: action
  command: "delete role {id}"
  params:
    - {name: id, type: string}

- id: set_role
  label: Set Role Subsystem Access
  kind: action
  command: "set role {rolename} subsystem {subinfo} maxAccess {accessLevel}"
  params:
    - {name: rolename, type: string}
    - {name: subinfo, type: enum, description: account | all | device | ldap | log | multiview | netmap | preset | role | server | snmpagent | tls | videowall | zone}
    - {name: accessLevel, type: enum, description: admin | config | join | none | view}

- id: set_account_all_authMode
  label: Set Account Auth Mode
  kind: action
  command: "set account all authMode {telnet_oldAuth|fullAuth} {web_backend|browser}"
  params:
    - {name: telnet_mode, type: enum, description: oldAuth | fullAuth}
    - {name: web_mode, type: enum, description: backend | browser}

- id: set_account_all_concurrentSessionsMax
  label: Set Concurrent Sessions Max
  kind: action
  command: "set account all concurrentSessionsMax {int|unlimited}"
  params:
    - {name: value, type: string}

- id: set_account_all_idleLogout
  label: Set Idle Logout Minutes
  kind: action
  command: "set account all idleLogout minutes {int|unlimited}"
  params:
    - {name: value, type: string}

- id: set_account_all_onThreeFailures
  label: Set On-Three-Failures Lockout
  kind: action
  command: "set account all onThreeFailures lockoutMinutes {int|none} disableAccount {true|false}"
  params:
    - {name: lockoutMinutes, type: string}
    - {name: disableAccount, type: boolean}

- id: set_account_all_password
  label: Set Account Password Policy
  kind: action
  command: "set account all password complex {enabled|disabled} minLen {int} duration initialExpire {enabled|disabled} minDays {int} maxDays {int|unlimited}"
  params:
    - {name: complex, type: enum, description: enabled | disabled}
    - {name: minLen, type: integer}
    - {name: initialExpire, type: enum, description: enabled | disabled}
    - {name: minDays, type: integer}
    - {name: maxDays, type: string}

- id: set_account_password
  label: Set Account Password
  kind: action
  command: "set account password existing {currentpass|*} new {newpass}"
  params:
    - {name: currentpass, type: string}
    - {name: newpass, type: string}

- id: set_account_username
  label: Set Account Username Options
  kind: action
  command: "set account username {username} {option}"
  params:
    - {name: username, type: string}
    - {name: option, type: enum, description: 2fa enabled|disabled | expirePassword enabled|disabled | lock | password new <string> | role <rolename> | unlock}

- id: load_account_preLoginBanner
  label: Load Pre-Login Banner (terminal/webText/webImage)
  kind: action
  command: "load account all preLoginBanner {arg} {file}"
  params:
    - {name: arg, type: enum, description: terminal | webText | webImage}
    - {name: file, type: string}

- id: load_account_postLoginBanner
  label: Load Post-Login Banner (terminal/webText/webImage)
  kind: action
  command: "load account all postLoginBanner {arg} {file}"
  params:
    - {name: arg, type: enum, description: terminal | webText | webImage}
    - {name: file, type: string}

- id: show_account
  label: Show Account
  kind: query
  command: "show account {select}"
  params:
    - {name: select, type: enum, description: active users | allConfig | list | login banner filenames | login banner text webPreLogin | login banner text webPostLogin}

- id: show_role
  label: Show Role
  kind: query
  command: "show role {rolename|all} maxAccess"
  params:
    - {name: rolename, type: string}

- id: authenticate_username
  label: Authenticate Username (browser only)
  kind: action
  command: "authenticate username {user} password {pwd} token {tkn} newPasword {npwd}"
  params:
    - {name: user, type: string}
    - {name: pwd, type: string}
    - {name: tkn, type: string}
    - {name: npwd, type: string}

- id: logout
  label: Logout
  kind: action
  command: "logout"

- id: logout_force
  label: Force Logout Session
  kind: action
  command: "logout force sessionId {num}"
  params:
    - {name: num, type: integer}

# --- Server config ---
- id: set_server_contact
  label: Set Server Contact
  kind: action
  command: "set server contact {name}"
  params:
    - {name: name, type: string}

- id: set_server_location
  label: Set Server Location
  kind: action
  command: "set server location {name}"
  params:
    - {name: name, type: string}

- id: set_server_hostname
  label: Set Server Hostname
  kind: action
  command: "set server hostname {name}"
  params:
    - {name: name, type: string, description: Default 'zyper.local'; max 128 chars}

- id: set_server_ip_videoPort
  label: Set Server Video Port IP
  kind: action
  command: "set server ip videoPort {mode} address {address} mask {mask} gateway {gateway} dns {dns} reboot"
  params:
    - {name: mode, type: enum, description: static | dhcp}
    - {name: address, type: string}
    - {name: mask, type: string}
    - {name: gateway, type: string}
    - {name: dns, type: string}

- id: set_server_ip_managementPort
  label: Set Server Management Port IP
  kind: action
  command: "set server ip managementPort {mode} address {address} mask {mask} gateway {gateway} dns {dns} reboot"
  params:
    - {name: mode, type: enum, description: static | dhcp}
    - {name: address, type: string}
    - {name: mask, type: string}
    - {name: gateway, type: string}
    - {name: dns, type: string}

- id: set_server_date_ntp
  label: Set Server Date (NTP)
  kind: action
  command: "set server date ntpServer address {domainName}"
  params:
    - {name: domainName, type: string}

- id: set_server_date_manual
  label: Set Server Date (manual)
  kind: action
  command: "set server date manual month {int} day {int} year {int} hour {int} minute {int}"
  params:
    - {name: month, type: integer}
    - {name: day, type: integer}
    - {name: year, type: integer}
    - {name: hour, type: integer}
    - {name: minute, type: integer}

- id: set_server_timezone
  label: Set Server Timezone
  kind: action
  command: "set server timezone {zone}"
  params:
    - {name: zone, type: string, description: POSIX timezone (e.g. America/New_York)}

- id: set_server_telnet_password
  label: Set Telnet Password
  kind: action
  command: "set server telnet password {pass}"
  params:
    - {name: pass, type: string, description: Empty to clear}

- id: set_server_telnet_mode
  label: Set Telnet Mode
  kind: action
  command: "set server telnet mode {mode}"
  params:
    - {name: mode, type: enum, description: enabled | disabled}

- id: set_server_ftp_mode
  label: Set FTP Mode
  kind: action
  command: "set server ftp mode {arg}"
  params:
    - {name: arg, type: enum, description: enabled | disabled}

- id: set_server_autoEdidMode
  label: Set Server Auto-EDID Mode
  kind: action
  command: "set server autoEdidMode {mode}"
  params:
    - {name: mode, type: enum, description: enabled | disabled}

- id: set_server_encoderDefault_edid_audio
  label: Set Server Default Encoder EDID Audio
  kind: action
  command: "set server encoderDefault edid audio {mode}"
  params:
    - {name: mode, type: enum, description: allowCompressed | onlyPcm}

- id: set_server_dataTunnelMode
  label: Set Server Data Tunnel Mode
  kind: action
  command: "set server dataTunnelMode {mode}"
  params:
    - {name: mode, type: enum, description: raw | telnet}

- id: set_server_discoverMode
  label: Set Server Discovery Mode
  kind: action
  command: "set server discoverMode all {mode}"
  params:
    - {name: mode, type: enum, description: broadcast | multicast | none}

- id: set_server_isolationMode
  label: Set Server Isolation Mode
  kind: action
  command: "set server isolationMode {arg}"
  params:
    - {name: arg, type: enum, description: enabled | disabled}

- id: set_server_license
  label: Set Server License
  kind: action
  command: "set server license {key}"
  params:
    - {name: key, type: string}

- id: set_server_api_lineWrap
  label: Set Server API Line Wrap
  kind: action
  command: "set server api lineWrap {wrap}"
  params:
    - {name: wrap, type: integer, description: 100-512}

- id: set_server_redundancy_mode
  label: Set Server Redundancy Mode
  kind: action
  command: "set server redundancy mode {arg}"
  params:
    - {name: arg, type: enum, description: enabled | disabled}

- id: set_server_redundancy_virtualIp
  label: Set Server Redundancy Virtual IP
  kind: action
  command: "set server redundancy {serv_id} virtualIp address {IP_Address} networkInterface {video|management}"
  params:
    - {name: serv_id, type: enum, description: allServers | thisServer | <server IP Address>}
    - {name: IP_Address, type: string}
    - {name: networkInterface, type: enum, description: video | management}

- id: set_server_redundancy_preferredRole
  label: Set Server Redundancy Preferred Role
  kind: action
  command: "set server redundancy {serv_id} preferredMaster {true|false} preferredSlave {true|false}"
  params:
    - {name: serv_id, type: string}
    - {name: preferredMaster, type: boolean}
    - {name: preferredSlave, type: boolean}

- id: set_server_security_deviceSecurityKey
  label: Set Server Device Security Key
  kind: action
  command: "set server security deviceSecurityKey {key}"
  params:
    - {name: key, type: string, description: 8-64 chars}

- id: set_server_isaac_address
  label: Set Isaac Server Address
  kind: action
  command: "set server isaac address {domainname}"
  params:
    - {name: domainname, type: string}

- id: set_server_isaac_subsystemId
  label: Set Isaac Server Subsystem ID
  kind: action
  command: "set server isaac subsystemId {subsystemID}"
  params:
    - {name: subsystemID, type: string}

- id: set_terminal_output
  label: Set Terminal Output
  kind: action
  command: "set terminal output {normal|json} echo {yes|no} prompt {yes|no}"
  params:
    - {name: format, type: enum, description: normal | json}
    - {name: echo, type: boolean}
    - {name: prompt, type: boolean}

- id: save_server_database
  label: Save Server Database
  kind: action
  command: "save server database {name}"
  params:
    - {name: name, type: string}

- id: restore_server_database
  label: Restore Server Database
  kind: action
  command: "restore server database {name}"
  params:
    - {name: name, type: string, description: Must match current API version}

- id: save_system_config
  label: Save System Config
  kind: action
  command: "save system config {name}"
  params:
    - {name: name, type: string}

- id: revert_server
  label: Revert Server
  kind: action
  command: "revert server"

- id: update_server
  label: Update Server Software
  kind: action
  command: "update server {file}"
  params:
    - {name: file, type: string, description: .zyper file}

- id: update_device
  label: Update Device Firmware
  kind: action
  command: "update device {arg} {file}"
  params:
    - {name: arg, type: enum, description: id | all | encoders | decoders}
    - {name: file, type: string, description: .apz or .zip file}

- id: troubleReport
  label: Generate Trouble Report
  kind: action
  command: "troubleReport password {pw}"
  params:
    - {name: pw, type: string, description: Optional password to encrypt .gpg file}

- id: logging_level
  label: Set Logging Level
  kind: action
  command: "logging level {arg}"
  params:
    - {name: arg, type: integer, description: 1-4}

- id: logging_note
  label: Add Logging Note
  kind: action
  command: "logging note {string}"
  params:
    - {name: string, type: string, description: 1-132 chars}

- id: show_logs_authentications
  label: Show Authentication Log
  kind: query
  command: "show logs authentications max {quantity}"
  params:
    - {name: quantity, type: integer}

- id: show_logs_commands
  label: Show Command Log
  kind: query
  command: "show logs commands max {quantity}"
  params:
    - {name: quantity, type: integer}

- id: show_server_config
  label: Show Server Config
  kind: query
  command: "show server config"

- id: show_server_info
  label: Show Server Info
  kind: query
  command: "show server info"

- id: show_server_redundancy
  label: Show Server Redundancy
  kind: query
  command: "show server redundancy"

- id: show_server_ip_duplicates
  label: Show Server IP Duplicates
  kind: query
  command: "show server ip duplicates"

- id: show_server_managedDevices
  label: Show Server Managed Devices
  kind: query
  command: "show server managedDevices all"

- id: show_files
  label: Show Files
  kind: query
  command: "show files {type}"
  params:
    - {name: type, type: enum, description: all | edid | frmware | icon | idleImage}

# --- SNMP ---
- id: add_snmp_trapServer_v2c
  label: Add SNMP v2c Trap Server
  kind: action
  command: "add snmp trapServer v2cTrap ipAddress {address} community {comm}"
  params:
    - {name: address, type: string}
    - {name: comm, type: string}

- id: add_snmp_user_v2c
  label: Add SNMP v2c User
  kind: action
  command: "add snmp user v2c accessLevel readOnly community {comm}"
  params:
    - {name: comm, type: string}

- id: add_snmp_user_v3
  label: Add SNMP v3 User
  kind: action
  command: "add snmp user v3 accessLevel readOnly auth MD5 encrypted no username {name} password {password}"
  params:
    - {name: name, type: string}
    - {name: password, type: string, description: 8-127 chars}

- id: add_snmp_netNode_v3
  label: Add SNMP v3 NetNode
  kind: action
  command: "add snmp netnode ipAddress {ipaddr} snmp v3 authType {auth} username {name} password {pass}"
  params:
    - {name: ipaddr, type: string}
    - {name: auth, type: enum, description: sha1 | sha512}
    - {name: name, type: string}
    - {name: pass, type: string}

- id: add_snmp_netNode_v2c
  label: Add SNMP v2c NetNode
  kind: action
  command: "add snmp netnode ipAddress {ipaddr} snmp v2c communityName {name}"
  params:
    - {name: ipaddr, type: string}
    - {name: name, type: string}

- id: set_snmp_netNode_v3
  label: Update SNMP v3 NetNode
  kind: action
  command: "set snmp netnode {nameId} version v3 authType {auth} username {name} password {pass}"
  params:
    - {name: nameId, type: string}
    - {name: auth, type: enum, description: sha1 | sha512}
    - {name: name, type: string}
    - {name: pass, type: string}

- id: set_snmp_netNode_v2c
  label: Update SNMP v2c NetNode
  kind: action
  command: "set snmp netnode {nameID} snmp v2c communityName {name}"
  params:
    - {name: nameID, type: string}
    - {name: name, type: string}

- id: set_snmp_netNode_ipAddress
  label: Update SNMP NetNode IP Address
  kind: action
  command: "set snmp netnode {ipaddr} ipAddress {newipaddr}"
  params:
    - {name: ipaddr, type: string}
    - {name: newipaddr, type: string}

- id: delete_snmp_trapServer
  label: Delete SNMP Trap Server
  kind: action
  command: "delete snmp trapServer v2cTrap {address} community {comm}"
  params:
    - {name: address, type: string}
    - {name: comm, type: string}

- id: delete_snmp_user_v2c
  label: Delete SNMP v2c User
  kind: action
  command: "delete snmp user v2c"

- id: delete_snmp_user_v3
  label: Delete SNMP v3 User
  kind: action
  command: "delete snmp user v3 username {name}"
  params:
    - {name: name, type: string}

- id: delete_snmp_netNode
  label: Delete SNMP NetNode
  kind: action
  command: "delete snmp netNode {arg} {ident}"
  params:
    - {name: arg, type: enum, description: byName | byId}
    - {name: ident, type: string}

- id: show_snmp
  label: Show SNMP
  kind: query
  command: "show snmp {arg}"
  params:
    - {name: arg, type: enum, description: trapServers | users}

- id: show_snmp_netNode
  label: Show SNMP NetNode
  kind: query
  command: "show snmp {ident} {arg}"
  params:
    - {name: ident, type: enum, description: all | <name>}
    - {name: arg, type: enum, description: general | snooping | warnings | justChanges since <id>}

- id: show_snmp_netNode_vlan
  label: Show SNMP NetNode VLAN
  kind: query
  command: "show snmp {ident} vlan {arg} snooping"
  params:
    - {name: ident, type: string}
    - {name: arg, type: string, description: VLAN number or 'all'}

- id: show_snmp_netNode_port
  label: Show SNMP NetNode Port
  kind: query
  command: "show snmp {ident} port {arg} {detail}"
  params:
    - {name: ident, type: string}
    - {name: arg, type: string, description: Port number or 'all'}
    - {name: detail, type: enum, description: state | peer | snooping | vlan | stats}

- id: show_snmp_netNode_multicastForwardingDb
  label: Show SNMP NetNode Multicast Forwarding DB
  kind: query
  command: "show snmp {ident} multicastForwardingDb"
  params:
    - {name: ident, type: string}

# --- LDAP ---
- id: add_ldap
  label: Add LDAP Group ID
  kind: action
  command: "add ldap ldapGroupId {id} mapto roleName {name}"
  params:
    - {name: id, type: integer, description: 1-65535}
    - {name: name, type: enum, description: Tech | admin}

- id: delete_ldap
  label: Delete LDAP Group ID
  kind: action
  command: "delete ldap ldapGroupId {id}"
  params:
    - {name: id, type: integer}

- id: set_ldap_mode
  label: Set LDAP Mode
  kind: action
  command: "set ldap mode {mode}"
  params:
    - {name: mode, type: enum, description: enabled | disabled}

- id: set_ldap_server_address
  label: Set LDAP Server Address
  kind: action
  command: "set ldap server address {domain}"
  params:
    - {name: domain, type: string}

- id: set_ldap_server_baseSearchDn
  label: Set LDAP Base Search DN
  kind: action
  command: "set ldap server baseSearchDn {name}"
  params:
    - {name: name, type: string}

- id: set_ldap_server_bindDn_username
  label: Set LDAP Bind DN Username
  kind: action
  command: "set ldap server bindDn username {username}"
  params:
    - {name: username, type: string}

- id: set_ldap_server_bindDn_password
  label: Set LDAP Bind DN Password
  kind: action
  command: "set ldap server bindDn password {password}"
  params:
    - {name: password, type: string}

- id: set_ldap_type
  label: Set LDAP Type
  kind: action
  command: "set ldap type {type}"
  params:
    - {name: type, type: enum, description: openLdap | activeDirectory}

- id: show_ldap
  label: Show LDAP
  kind: query
  command: "show ldap {type}"
  params:
    - {name: type, type: enum, description: server | groupIdToRole}

# --- TLS ---
- id: set_tls_server_mode
  label: Set TLS Server Mode
  kind: action
  command: "set tls server mode {mode}"
  params:
    - {name: mode, type: enum, description: enabled | disabled}

- id: set_tls_server_fqdn
  label: Set TLS Server FQDN
  kind: action
  command: "set tls server fqdn {domain|fromCert}"
  params:
    - {name: domain, type: string}

- id: generate_tls_ca_privKeyPass
  label: Generate TLS CA Private Key
  kind: action
  command: "generate tls ca privKeyPass {privKey} country {country} state {state} locality {local} organization {org} organizationUnit {orgunit} email {email}"
  params:
    - {name: privKey, type: string, description: '*' to prompt for passphrase}
    - {name: country, type: string, description: 2-char country code}
    - {name: state, type: string, description: 2-char state code}
    - {name: local, type: string}
    - {name: org, type: string}
    - {name: orgunit, type: string}
    - {name: email, type: string}

- id: generate_tls_server_csr_privKeyPass
  label: Generate TLS Server CSR Private Key
  kind: action
  command: "generate tls server csr privKeyPass {privKey} fqdn {domain} country {country} state {state} locality {local} organization {org} organizationUnit {orgunit} email {email}"
  params:
    - {name: privKey, type: string}
    - {name: domain, type: string}
    - {name: country, type: string}
    - {name: state, type: string}
    - {name: local, type: string}
    - {name: org, type: string}
    - {name: orgunit, type: string}
    - {name: email, type: string}

- id: generate_tls_device_csr_privKeyPass
  label: Generate TLS Device CSR Private Key
  kind: action
  command: "generate tls device csr privKeyPass {privKey} fqdn {domain} country {country} state {state} locality {local} organization {org} organizationUnit {orgunit} email {email}"
  params:
    - {name: privKey, type: string}
    - {name: domain, type: string}
    - {name: country, type: string}
    - {name: state, type: string}
    - {name: local, type: string}
    - {name: org, type: string}
    - {name: orgunit, type: string}
    - {name: email, type: string}

- id: generate_tls_radius_csr_privKeyPass
  label: Generate TLS RADIUS CSR Private Key
  kind: action
  command: "generate tls radius csr privKeyPass {privKey} fqdn {domain} country {country} state {state} locality {local} organization {org} organizationUnit {orgunit} email {email}"
  params:
    - {name: privKey, type: string}
    - {name: domain, type: string}
    - {name: country, type: string}
    - {name: state, type: string}
    - {name: local, type: string}
    - {name: org, type: string}
    - {name: orgunit, type: string}
    - {name: email, type: string}

- id: load_tls_ca_cert
  label: Load TLS CA Certificate
  kind: action
  command: "load tls ca cert fromInput *"
  params: []

- id: load_tls_ca_cert_fromFile
  label: Load TLS CA Certificate from File
  kind: action
  command: "load tls ca cert fromFile {filename}"
  params:
    - {name: filename, type: string}

- id: load_tls_ca_privateKey
  label: Load TLS CA Private Key (fromInput)
  kind: action
  command: "load tls ca privateKey privKeyPass * fromInput *"
  params: []

- id: load_tls_ca_privateKey_fromFile
  label: Load TLS CA Private Key from File
  kind: action
  command: "load tls ca privateKey privKeyPass * fromFile {filename}"
  params:
    - {name: filename, type: string}

- id: load_tls_server_cert
  label: Load TLS Server Certificate
  kind: action
  command: "load tls server cert fromInput *"
  params: []

- id: load_tls_server_cert_fromFile
  label: Load TLS Server Certificate from File
  kind: action
  command: "load tls server cert fromFile {filename}"
  params:
    - {name: filename, type: string}

- id: load_tls_server_caIntermediates
  label: Load TLS Server CA Intermediates
  kind: action
  command: "load tls server caIntermediates fromInput {none|*}"
  params:
    - {name: arg, type: enum, description: none | *}

- id: load_tls_server_caIntermediates_fromFile
  label: Load TLS Server CA Intermediates from File
  kind: action
  command: "load tls server caIntermediates fromFile {filename|none}"
  params:
    - {name: filename, type: string}

- id: load_tls_server_privateKey
  label: Load TLS Server Private Key (fromInput)
  kind: action
  command: "load tls server privateKey privKeyPass * fromInput *"
  params: []

- id: load_tls_server_privateKey_fromFile
  label: Load TLS Server Private Key from File
  kind: action
  command: "load tls server privateKey privKeyPass * fromFile {filename}"
  params:
    - {name: filename, type: string}

- id: load_tls_device_cert
  label: Load TLS Device Certificate (fromInput)
  kind: action
  command: "load tls device cert fromInput *"
  params: []

- id: load_tls_device_cert_fromFile
  label: Load TLS Device Certificate from File
  kind: action
  command: "load tls device cert fromFile {filename}"
  params:
    - {name: filename, type: string}

- id: load_tls_device_caIntermediates
  label: Load TLS Device CA Intermediates
  kind: action
  command: "load tls device caIntermediates fromInput {none|*}"
  params:
    - {name: arg, type: enum, description: none | *}

- id: load_tls_device_caIntermediates_fromFile
  label: Load TLS Device CA Intermediates from File
  kind: action
  command: "load tls device caIntermediates fromFile {filename|none}"
  params:
    - {name: filename, type: string}

- id: load_tls_device_privateKey
  label: Load TLS Device Private Key (fromInput)
  kind: action
  command: "load tls device privateKey privKeyPass * fromInput *"
  params: []

- id: load_tls_device_privateKey_fromFile
  label: Load TLS Device Private Key from File
  kind: action
  command: "load tls device privateKey privKeyPass * fromFile {filename}"
  params:
    - {name: filename, type: string}

- id: sign_tls_csr
  label: Sign TLS CSR (fromInput)
  kind: action
  command: "sign tls csr caPrivateKeyPass * fromInput *"
  params: []

- id: sign_tls_csr_fromFile
  label: Sign TLS CSR (fromFile)
  kind: action
  command: "sign tls csr PrivateKeyPass * fromFile {filename}"
  params:
    - {name: filename, type: string}

- id: show_tls_ca_pem
  label: Show TLS CA PEM
  kind: query
  command: "show tls ca pem {arg}"
  params:
    - {name: arg, type: enum, description: cert | privKey | signedCert}

- id: show_tls_device_pem
  label: Show TLS Device PEM
  kind: query
  command: "show tls device pem {target} {arg}"
  params:
    - {name: target, type: enum, description: device | radius | server}
    - {name: arg, type: enum, description: csr | cert | privKey | caIntermediates}

- id: show_tls_summary
  label: Show TLS Summary
  kind: query
  command: "show tls {target} summary"
  params:
    - {name: target, type: enum, description: ca | radius | server}

- id: show_tls_device_summary
  label: Show TLS Device Summary
  kind: query
  command: "show tls device summary"

- id: convertPID_12g_sdi
  label: Convert PID 12G SDI Devices (ZyPer4K)
  kind: action
  command: "convertPID ZyPer4K sdi12g {toNewPid|toOldPid} {filename}"
  params:
    - {name: dir, type: enum, description: toNewPid | toOldPid}
    - {name: filename, type: string}

# --- Redundancy ---
- id: redundancy_add_server_ip
  label: Redundancy Add Server IP
  kind: action
  command: "redundancy add server ip {ip}"
  params:
    - {name: ip, type: string}

- id: redundancy_delete_server_ip
  label: Redundancy Delete Server IP
  kind: action
  command: "redundancy delete server ip {ip}"
  params:
    - {name: ip, type: string}

- id: redundancy_delete_downServers
  label: Redundancy Delete Down Servers
  kind: action
  command: "redundancy delete downServers"

- id: redundancy_switchover
  label: Redundancy Switchover
  kind: action
  command: "redundancy switchover"

# --- Misc ---
- id: events
  label: Enter Events Mode
  kind: query
  command: "events"

- id: help
  label: Help
  kind: query
  command: "help {arg}"
  params:
    - {name: arg, type: string, description: all alphabetical | all byConcept | all bySubsystem | all byAccessLevel | concept <topic> | subsystem <sub> | accessLevel <level> | search string <keyword> | <command> help | <command> ? | ?}

- id: sleep
  label: Sleep (ms)
  kind: action
  command: "sleep {ms}"
  params:
    - {name: ms, type: integer}

- id: script
  label: Run Script
  kind: action
  command: "script {file} {loop?}"
  params:
    - {name: file, type: string}
    - {name: loop, type: string, description: optional 'loop' keyword}
```

## Feedbacks
```yaml
# Responses observed from device → ZMP. Documented as readable state.
- id: power_state
  type: enum
  values: [up, down]
  description: From `show device status` field `state=Up|Down`
- id: hdmi_link
  type: enum
  values: [connected, disconnected]
  description: From `show device status` field `device.hdmiInput.cableConnected`
- id: hdcp_state
  type: enum
  values: [active, inactive]
  description: From `show device status` field `device.hdmiInput.hdcp`
- id: hdcp_version
  type: enum
  values: [none, "1.4", "2.2"]
  description: From `show device status` field `device.hdmiInput.hdcpVersion`
- id: rs232_terminator
  type: string
  description: Configured RS-232 response termination characters; default "\n\r"
- id: rs232_response
  type: string
  description: From `show responses {id} rs232 last` - buffered RS-232 string returned by the device
- id: ir_response
  type: string
  description: From `show responses {id} ir last` - buffered IR string returned by the device
- id: device_temperature
  type: string
  description: From `show device status` field `device.temperature.main` (e.g. 59C)
- id: firmware_version
  type: string
  description: From `show device status` field `device.gen.firmware`
- id: model_name
  type: string
  description: From `show device config` field `device.gen.model` (e.g. Zyper4K)
- id: device_state
  type: enum
  values: [up, down]
  description: From `show device config` field `device.gen.state`
- id: video_port
  type: enum
  values: [auto, initializing, unknown, hdmi, displayPort, hdmiOptionalIn, usbc, vga, component, composite, s-video, analogNone, hdsdi, "12gsdi"]
  description: Active input port on encoder
- id: rs232_config
  type: string
  description: From `show values encoder config` device.rs232.baud/parity enumerated set
```

## Variables
```yaml
# Parameters that are settable but not discrete actions; primarily server-wide config.
- id: encoder_default_edid_audio
  type: enum
  values: [onlyPcm, allowCompressed]
  description: Server-wide default; see `set server encoderDefault edid audio`
- id: data_tunnel_mode
  type: enum
  values: [telnet, raw]
  description: Set via `set server dataTunnelMode`
- id: telnet_mode
  type: enum
  values: [enabled, disabled]
  description: Set via `set server telnet mode`
- id: telnet_password
  type: string
  description: Set via `set server telnet password` (default none)
- id: ftp_mode
  type: enum
  values: [enabled, disabled]
  description: Set via `set server ftp mode`
- id: auto_edid_mode
  type: enum
  values: [enabled, disabled]
  description: Set via `set server autoEdidMode`
- id: discovery_mode
  type: enum
  values: [broadcast, multicast, none]
  description: Set via `set server discoverMode all`
- id: isolation_mode
  type: enum
  values: [enabled, disabled]
  description: Set via `set server isolationMode`
- id: logging_level
  type: integer
  description: 1-4 (or up to 5 per `show values server config`); set via `logging level`
- id: redundancy_mode
  type: enum
  values: [enabled, disabled]
  description: Set via `set server redundancy mode`
- id: api_line_wrap
  type: integer
  description: 100-512; set via `set server api lineWrap`
- id: timezone
  type: string
  description: POSIX timezone string; set via `set server timezone`
- id: edid_prefer_mode
  type: enum
  values: [max, strict]
  description: Decoder-wide; set via `set decoder {id} edidPreferMode`
- id: hdmi_5v_control
  type: enum
  values: [enabled, disabled]
  description: Z4K-XS/XSE/XR; set via `set decoder {id} hdmi5vControl`
- id: utility_port
  type: enum
  values: [enabled, disabled, onlyDanteAudio]
  description: Set via `set device {id} utilityPort`
- id: usb_filter
  type: enum
  values: [none, exceptHid, storage]
  description: Set via `set device {id} usbFilter`
- id: usb_type
  type: enum
  values: [full, hid]
  description: Z4K-XSE only; set via `set device {id} usbType`
- id: rs232_baud
  type: enum
  values: ["2400", "9600", "19200", "38400", "57600", "115200"]
  description: Set via `set device {id} rs232`
- id: rs232_data
  type: enum
  values: ["7-bits", "8-bits"]
- id: rs232_stop
  type: enum
  values: ["1-stop", "2-stop"]
- id: rs232_parity
  type: enum
  values: [none, even, odd]
- id: video_port
  type: enum
  values: [hdmi, hdmiOptionalIn, usbc, auto, displayPort, hdsdi, "12gsdi", component, composite, s-video, vga]
```

## Events
```yaml
# Unsolicited notifications supported by the ZMP.
# `events` command enters streaming event mode; any keystroke exits.
- id: server_event_stream
  description: After `events`, server pushes initial events then incremental events over the telnet session until a key is pressed.
  # UNRESOLVED: per-event schema not enumerated in source.
```

## Macros
```yaml
# Multi-step sequences explicitly described in source.
- id: redundancy_switchover_sequence
  description: "Cause master/slave role swap on an active slave. Use `redundancy switchover`. Existing TCP connections to master terminate; new master accepts connections at the configured virtual IP."
- id: enable_security_pairing
  description: "Sequence for Semtech server-device security: (1) `set server security deviceSecurityKey <8-64 chars>` on both servers, (2) `set device {id} security enabled` per endpoint. Disabling requires all devices to first disable security, then change key, then re-enable."
- id: password_reset_no_physical_access
  description: "FTP empty file named `defaultPasswords` (no extension) to the ZMP /files directory; power-cycle the MP within 1 minute to default telnet password."
- id: enable_kvm_hotkey
  description: "Configure `set kvm all hotkeyBase <option>` then use double-tap base keys to enter hotkey mode; S swaps window under mouse with home, R resets all windows to saved config."
```

## Safety
```yaml
confirmation_required_for:
  - delete allConfiguration action=reboot|restart|shutdown  # wipes all device/server config
  - factoryDefaults device  # hardware-level reset
  - update device all  # firmware push to all endpoints
  - update server  # server software update; causes reboot
  - shutdown server
  - restore server database  # replaces current DB; server restart
  - revert server  # rolls back to previous software + DB
interlocks: []
# Source notes:
# - Issuing dataConnect or switch can cause the ZyPer endpoint to reboot; link should be left alone once established.
# - HDCP mode changes on decoder cause reboot (ZyPerUHD/UHD60).
# - Some `set` commands on decoder force device reboot (e.g. hdcpMode, osdStatusMode, danteAudioOut).
# - RESTORED database MUST have been created with the exact same API version.
```

## Notes
- The ZyPer Management Platform (ZMP) is the controlling server; encoders/decoders do not accept commands directly. All commands shown are sent to the ZMP via Telnet or SSH.
- Telnet password default is none; set via `set server telnet password`.
- Device names cannot contain colon `:`, quotes `"`, or blank spaces.
- RS-232 send syntax: text supports `\n \r \t \\ \xnn`; spaces in raw text require quotes.
- CEC support: not on ZyPerHD; CEC hexString not on ZyPerUHD; ZyPer4K CEC requires firmware 3.5.2+.
- HLS preview streams require Z4K firmware 4.0.1.0 or newer.
- Preview stream URL pattern: `http://<mp_ip>/media/<encoder_mac>.m3u8` (HLS) or `.jpeg` (JPEG).
- Server software versions referenced: 3.3.40029, 3.3.39589, 4.1.xxxxx; firmware version compatibility per device family.

<!-- UNRESOLVED: voltage/current/power specs not stated in source -->
<!-- UNRESOLVED: per-event schema for `events` mode not enumerated in source -->
<!-- UNRESOLVED: SSH port number not stated in source (default 22 assumed by tool, not in source) -->

## Provenance

```yaml
source_domains:
  - zeevee.com
source_urls:
  - https://www.zeevee.com/zmp-api-manual/
  - https://www.zeevee.com/zyper4k-advanced-topics/
  - https://www.zeevee.com/zmp-rs232-syntax-guide/
retrieved_at: 2026-09-02T18:21:57.396Z
last_checked_at: 2026-09-22T11:54:27.259Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:54:27.259Z
matched_actions: 270
action_count: 270
confidence: medium
summary: "Spec's 270 wire-literal ZMP ASCII commands each have a verbatim counterpart in the refined source manual; transport port 23 and no-auth default both anchored in source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility for the Copper Encoder USB variant not stated in source"
- "voltage/current/power specs not stated in source"
- "per-event schema not enumerated in source."
- "per-event schema for `events` mode not enumerated in source"
- "SSH port number not stated in source (default 22 assumed by tool, not in source)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
