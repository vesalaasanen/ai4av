---
spec_id: admin/zeevee_inc_av_over_ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Zeevee Inc AV Over IP Control Spec"
manufacturer: "Zeevee Inc"
model_family: ZyPer4K
aliases: []
compatible_with:
  manufacturers:
    - "Zeevee Inc"
  models:
    - ZyPer4K
    - ZyPerUHD
    - ZyPerUHD60
    - "ZyPerMP Management Platform"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - zeevee.com
  - partners.zeevee.com
source_urls:
  - https://www.zeevee.com/wp-content/uploads/2025/09/ZMP_4_0_3_user-manual.pdf
  - https://www.zeevee.com/zmp-api-manual/
  - https://www.zeevee.com/zmp-rs232-syntax-guide/
  - https://partners.zeevee.com/English/
retrieved_at: 2026-08-11T03:33:28.044Z
last_checked_at: 2026-08-19T10:04:11.661Z
generated_at: 2026-08-19T10:04:11.661Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "this doc covers the entire ZMP API controlling the ZyPer product family rather than a single device; treat the spec as a control-surface summary. Specific encoder/decoder model command applicability varies by family and is noted per-action where the source distinguishes ZyPer4K / ZyPerUHD / ZyPerUHD60 / ZyPerHD. Firmware matrix, exact ZMP server hardware (NUC vs. Proserver vs. VMware), and licensing tiers not fully detailed."
  - "HTTP base URL not stated; example uses http://<mp_ip_address>/media/..."
  - "full parameter enumeration for every command in source exceeds scope; many sub-options and enum values summarized. Use source for exhaustive list."
  - "firmware version compatibility not stated in source."
  - "exact ZMP hardware platform variants (NUC / Proserver / VMware / ZyUHD60-EMP) only named per update file, not enumerated per command applicability."
verification:
  verdict: verified
  checked_at: 2026-08-19T10:04:11.661Z
  matched_actions: 235
  action_count: 235
  confidence: medium
  summary: "All 235 spec actions have literal command matches in the source's API Command Listing and detailed subsections. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Zeevee Inc AV Over IP Control Spec

## Summary
ZeeVee ZyPer family AV-over-IP product line (ZyPer4K, ZyPerUHD, ZyPerUHD60) managed via the ZyPer Management Platform (ZMP) server. Control API exposed over Telnet/SSH (text CLI with `Zyper$` prompt) and HTTPS Web interface; events also delivered via WebSocket on port 8001 and HTTP polling. The CLI is a comprehensive text command set covering device discovery, routing/joining, video-wall configuration, multiview, presets, EDID management, RS-232/IR data tunneling, TLS certificates, SNMP, accounts, and licensing.

<!-- UNRESOLVED: this doc covers the entire ZMP API controlling the ZyPer product family rather than a single device; treat the spec as a control-surface summary. Specific encoder/decoder model command applicability varies by family and is noted per-action where the source distinguishes ZyPer4K / ZyPerUHD / ZyPerUHD60 / ZyPerHD. Firmware matrix, exact ZMP server hardware (NUC vs. Proserver vs. VMware), and licensing tiers not fully detailed. -->

## Transport
```yaml
protocols:
  - tcp  # Telnet control session
  - http  # Web UI / HTTPS / WebSocket events
addressing:
  port: 23  # Telnet to ZMP server (inferred from telnet examples in source, port 23 not explicitly numbered but telnet shown)
  base_url: ""  # UNRESOLVED: HTTP base URL not stated; example uses http://<mp_ip_address>/media/...
  # Source documents WebSocket event channel on port 8001 using protocol "zeeVeeLogging"
  # (ws://<mp>:8001). HTTP preview streams at http://<mp_ip_address>/media/<encoder_mac>.m3u8 (HLS)
  # or http://<mp_ip_address>/media/<encoder_mac>.jpeg (JPEG, 1 fps).
auth:
  type: password  # inferred: source documents create account / set account password / authenticate username commands
  # Note: source states "By default Telnet has no password"; password is optional via set server telnet password.
```

## Traits
```yaml
traits:
  - powerable  # inferred: restart device / factoryDefaults device / shutdown server / set decoder powerSave
  - routable  # inferred: extensive join / routing / multiview / videoWall commands
  - queryable  # inferred: show device status / show device config / show device capabilities / show values
  - levelable  # inferred: set device rs232, audio mode settings, analog/hdmi audio routing
```

## Actions
```yaml
- id: add_device
  label: Add device manually
  kind: action
  command: "add device ipAddress {ip}"
  params:
    - name: ip
      type: string
      description: IPv4 address of the device on a different VLAN/Subnet
- id: add_snmp_user_v3
  label: Add SNMP v3 user
  kind: action
  command: "add snmp user v3 accessLevel readOnly auth MD5 encrypted no username {name} password {password}"
  params:
    - name: name
      type: string
    - name: password
      type: string
- id: add_snmp_trapServer
  label: Add SNMP trap server
  kind: action
  command: "add snmp trapServer v2cTrap ipAddress {address} community {comm}"
  params:
    - name: address
      type: string
    - name: comm
      type: string
- id: add_snmp_netNode_v3
  label: Add SNMP netNode v3 (VAM)
  kind: action
  command: "add snmp netnode ipAddress {ipaddr} snmp v3 authType {auth} username {name} password {pass}"
  params:
    - name: ipaddr
      type: string
    - name: auth
      type: string
      enum: [sha1, sha512]
    - name: name
      type: string
    - name: pass
      type: string
- id: add_snmp_netNode_v2c
  label: Add SNMP netNode v2c (VAM)
  kind: action
  command: "add snmp netnode ipAddress {ipaddr} snmp v2c communityName {name}"
  params:
    - name: ipaddr
      type: string
    - name: name
      type: string
- id: add_zoneDisplay
  label: Add display to zone
  kind: action
  command: "add zoneDisplay {name} {id}"
  params:
    - name: name
      type: string
    - name: id
      type: string
- id: channel
  label: Cycle encoder channel up/down on decoder
  kind: action
  command: "channel {direction} {decoder-id}"
  params:
    - name: direction
      type: string
      enum: [up, down]
    - name: decoder-id
      type: string
- id: clone_multiview
  label: Clone multiview
  kind: action
  command: "clone multiview {name} to {newmvname}"
  params:
    - name: name
      type: string
    - name: newmvname
      type: string
- id: create_account
  label: Create user account
  kind: action
  command: "create account {name} passwordOption"
  params:
    - name: name
      type: string
    - name: passwordOption
      type: string
      enum: [password, tempInitialPassword]
- id: create_multiview
  label: Create multiview display (ZyPer4K only)
  kind: action
  command: "create multiview {name}"
  params:
    - name: name
      type: string
- id: create_presetNew
  label: Create new preset
  kind: action
  command: "create presetNew {name} commands {connections}"
  params:
    - name: name
      type: string
    - name: connections
      type: string
      enum: [empty, existingConnections]
- id: create_presetSchedule
  label: Create preset schedule
  kind: action
  command: "create presetSchedule {presetname} schedule {name}"
  params:
    - name: presetname
      type: string
    - name: name
      type: string
- id: create_role
  label: Create role
  kind: action
  command: "create role {name} allSubsystems maxAccess {accessLevel}"
  params:
    - name: name
      type: string
    - name: accessLevel
      type: string
      enum: [admin, config, join, none, view]
- id: create_videoWall
  label: Create 2x2 video wall
  kind: action
  command: "create videoWall {name}"
  params:
    - name: name
      type: string
- id: create_zone
  label: Create zone
  kind: action
  command: "create zone {name}"
  params:
    - name: name
      type: string
- id: dataConnect
  label: Open RS232/IR data tunnel via TCP port
  kind: action
  command: "dataConnect {id1} {id2} {mode} tunnelPort {port}"
  params:
    - name: id1
      type: string
    - name: id2
      type: string
    - name: mode
      type: string
      enum: [ir, rs232]
    - name: port
      type: integer
      description: TCP port (1024..49152)
- id: delete_account
  label: Delete account
  kind: action
  command: "delete account {id}"
  params:
    - name: id
      type: string
- id: delete_allConfiguration
  label: Delete all configuration
  kind: action
  command: "delete allConfiguration {action}"
  params:
    - name: action
      type: string
      enum: [reboot, restart, shutdown]
- id: delete_device
  label: Delete device
  kind: action
  command: "delete device {id}"
  params:
    - name: id
      type: string
- id: delete_multiview
  label: Delete multiview
  kind: action
  command: "delete multiview {name}"
  params:
    - name: name
      type: string
- id: delete_multiviewWindow
  label: Delete multiview window
  kind: action
  command: "delete multiviewWindow {name} window {arg}"
  params:
    - name: name
      type: string
    - name: arg
      type: integer
      description: window number (1..9)
- id: delete_snmp_netNode
  label: Delete SNMP netNode
  kind: action
  command: "delete snmp netNode {arg} {ident}"
  params:
    - name: arg
      type: string
      enum: [byName, byId]
    - name: ident
      type: string
- id: delete_preset
  label: Delete preset / runlog / schedule
  kind: action
  command: "delete preset {name}"
  params:
    - name: name
      type: string
- id: delete_preset_runLog
  label: Delete preset runlog
  kind: action
  command: "delete preset {name} runLog"
  params:
    - name: name
      type: string
- id: delete_preset_schedule
  label: Delete preset schedule
  kind: action
  command: "delete preset {name} schedule {schname}"
  params:
    - name: name
      type: string
    - name: schname
      type: string
- id: delete_role
  label: Delete role
  kind: action
  command: "delete role {id}"
  params:
    - name: id
      type: string
- id: delete_snmp
  label: Delete SNMP user or trap server
  kind: action
  command: "delete snmp {arg} {name}"
  params:
    - name: arg
      type: string
      enum: [trapServer v2cTrap ipAddress, user v2c, user v3]
    - name: name
      type: string
- id: delete_videoWall
  label: Delete video wall
  kind: action
  command: "delete videoWall {name}"
  params:
    - name: name
      type: string
- id: delete_zone
  label: Delete zone
  kind: action
  command: "delete zone {name}"
  params:
    - name: name
      type: string
- id: delete_zoneDisplay
  label: Delete display from zone
  kind: action
  command: "delete zoneDisplay {name} {id}"
  params:
    - name: name
      type: string
    - name: id
      type: string
- id: diagnostics_device
  label: Run diagnostics on device
  kind: action
  command: "diagnostics device {id}"
  params:
    - name: id
      type: string
- id: dumpusb
  label: Dump USB device info
  kind: action
  command: "dumpusb"
  params: []
- id: events
  label: Enter events mode on telnet session
  kind: action
  command: "events"
  params: []
- id: factoryDefaults_device
  label: Reset device to factory defaults
  kind: action
  command: "factoryDefaults device {id}"
  params:
    - name: id
      type: string
- id: flashLeds
  label: Flash device LEDs for identification
  kind: action
  command: "flashLeds {id}"
  params:
    - name: id
      type: string
- id: join_fastSwitched
  label: Join encoder to decoder fastSwitched
  kind: action
  command: "join {enc} {dec} fastSwitched"
  params:
    - name: enc
      type: string
    - name: dec
      type: string
- id: join_genlocked
  label: Join encoder to decoder genlocked (ZyPer4K only)
  kind: action
  command: "join {enc} {dec} genlocked"
  params:
    - name: enc
      type: string
    - name: dec
      type: string
- id: join_genlockedScaled
  label: Join encoder to decoder genlockedScaled (ZyPer4K only)
  kind: action
  command: "join {enc} {dec} genlockedScaled"
  params:
    - name: enc
      type: string
    - name: dec
      type: string
- id: join_hdmiAudio
  label: Join hdmiAudio
  kind: action
  command: "join {enc} {dec} hdmiAudio"
  params:
    - name: enc
      type: string
    - name: dec
      type: string
- id: join_analogAudio
  label: Join analog audio
  kind: action
  command: "join {enc} {dec} analogAudio"
  params:
    - name: enc
      type: string
    - name: dec
      type: string
- id: join_danteAudio
  label: Join Dante audio
  kind: action
  command: "join {enc} {dec} danteAudio"
  params:
    - name: enc
      type: string
    - name: dec
      type: string
- id: join_video
  label: Join video only (no audio)
  kind: action
  command: "join {enc} {dec} video"
  params:
    - name: enc
      type: string
    - name: dec
      type: string
- id: join_videoWall
  label: Join encoder to video wall
  kind: action
  command: "join {enc} {wall} videoWall"
  params:
    - name: enc
      type: string
    - name: wall
      type: string
- id: join_multiview
  label: Join multiview to decoder (ZyPer4K only)
  kind: action
  command: "join {multiview} {dec} multiview"
  params:
    - name: multiview
      type: string
    - name: dec
      type: string
- id: join_window
  label: Join window portion of source to display (ZyPer4K only)
  kind: action
  command: "join {enc} {dec} window viewportSource {sx} {sy} {sw} {sh} viewportDest {dx} {dy} {dw} {dh}"
  params:
    - name: enc
      type: string
    - name: dec
      type: string
    - name: sx
      type: integer
    - name: sy
      type: integer
    - name: sw
      type: integer
    - name: sh
      type: integer
    - name: dx
      type: integer
    - name: dy
      type: integer
    - name: dw
      type: integer
    - name: dh
      type: integer
- id: join_usb
  label: Join USB connection
  kind: action
  command: "join {enc} {dec} usb"
  params:
    - name: enc
      type: string
    - name: dec
      type: string
- id: join_none
  label: Disconnect existing join
  kind: action
  command: "join none {dec} fastSwitched"
  params:
    - name: dec
      type: string
- id: join_videoSource_hdmiAudio
  label: Auto-join hdmiAudio with video (ZyPer4K)
  kind: action
  command: "join videoSource {dec} hdmiAudio"
  params:
    - name: dec
      type: string
- id: join_videoSource_audio
  label: Auto-join audio with video (ZyPerUHD)
  kind: action
  command: "join videoSource {dec} audio"
  params:
    - name: dec
      type: string
- id: load_encoderEdid
  label: Load EDID to encoder
  kind: action
  command: "load encoderEdid {enc} {mode} {file}"
  params:
    - name: enc
      type: string
    - name: mode
      type: string
      enum: [auto, builtIn, default, saved]
    - name: file
      type: string
- id: load_idleImage
  label: Load idle image to UHD decoder
  kind: action
  command: "load idleImage {dec} filename {file}"
  params:
    - name: dec
      type: string
    - name: file
      type: string
- id: logout
  label: Logout current session
  kind: action
  command: "logout"
  params: []
- id: logout_force
  label: Force logout session
  kind: action
  command: "logout force sessionId {num}"
  params:
    - name: num
      type: integer
- id: previewStream_start
  label: Start preview stream
  kind: action
  command: "previewStream {enc} start {comp} width {size}"
  params:
    - name: enc
      type: string
    - name: comp
      type: string
      enum: [hls, jpeg]
    - name: size
      type: integer
      description: width pixels (180..400)
- id: previewStream_stop
  label: Stop preview stream
  kind: action
  command: "previewStream {enc} stop"
  params:
    - name: enc
      type: string
- id: redundancy_switchover
  label: Master/slave switchover
  kind: action
  command: "redundancy switchover"
  params: []
- id: redundancy_delete_downServers
  label: Cleanup down servers
  kind: action
  command: "redundancy delete downServers"
  params: []
- id: rename_zone
  label: Rename zone
  kind: action
  command: "rename zone {zonename} newName {newzonename}"
  params:
    - name: zonename
      type: string
    - name: newzonename
      type: string
- id: restart_device
  label: Restart device
  kind: action
  command: "restart device {id}"
  params:
    - name: id
      type: string
- id: restore_server_database
  label: Restore server database
  kind: action
  command: "restore server database {name}"
  params:
    - name: name
      type: string
- id: revert_server
  label: Revert to previous server version
  kind: action
  command: "revert server"
  params: []
- id: run_preset
  label: Run preset
  kind: action
  command: "run preset {name}"
  params:
    - name: name
      type: string
- id: save_deviceEdid
  label: Save EDID from decoder
  kind: action
  command: "save deviceEdid {id} {file}"
  params:
    - name: id
      type: string
    - name: file
      type: string
- id: save_server_database
  label: Save server database
  kind: action
  command: "save server database {name}"
  params:
    - name: name
      type: string
- id: save_system_config
  label: Save system configuration
  kind: action
  command: "save system config {name}"
  params:
    - name: name
      type: string
- id: script
  label: Execute script
  kind: action
  command: "script {file}"
  params:
    - name: file
      type: string
- id: send_ir
  label: Send IR Pronto code to device
  kind: action
  command: "send {id} ir {text}"
  params:
    - name: id
      type: string
    - name: text
      type: string
      description: Pronto hex string, max 1024 chars
- id: send_rs232
  label: Send RS232 string to device
  kind: action
  command: "send {id} rs232 {text}"
  params:
    - name: id
      type: string
    - name: text
      type: string
      description: ASCII string, max 256 chars
- id: send_cec_on
  label: Send CEC on to device
  kind: action
  command: "send {id} cec on"
  params:
    - name: id
      type: string
- id: send_cec_off
  label: Send CEC off to device
  kind: action
  command: "send {id} cec off"
  params:
    - name: id
      type: string
- id: send_cec_hex
  label: Send CEC hex string to device
  kind: action
  command: "send {id} cec hexString {text}"
  params:
    - name: id
      type: string
    - name: text
      type: string
- id: set_account_password
  label: Change account password
  kind: action
  command: "set account password existing {currentpass} new {newpass}"
  params:
    - name: currentpass
      type: string
    - name: newpass
      type: string
- id: set_account_2fa
  label: Enable/disable 2FA on account
  kind: action
  command: "set account username {user} 2fa {arg}"
  params:
    - name: user
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_account_lock
  label: Lock account
  kind: action
  command: "set account username {user} lock"
  params:
    - name: user
      type: string
- id: set_account_unlock
  label: Unlock account
  kind: action
  command: "set account username {user} unlock"
  params:
    - name: user
      type: string
- id: set_account_role
  label: Set role for account
  kind: action
  command: "set account username {user} role {rolename}"
  params:
    - name: user
      type: string
    - name: rolename
      type: string
- id: set_decoder_analogAudioOut
  label: Set decoder analog audio out source
  kind: action
  command: "set decoder {id} analogAudioOut source {type}"
  params:
    - name: id
      type: string
    - name: type
      type: string
      enum: [none, hdmiAudioDownmix, directDanteAudio]
- id: set_decoder_danteAudioOut
  label: Set decoder Dante audio out source
  kind: action
  command: "set decoder {id} danteAudioOut source {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [joinedAudio, none, analogAudio, hdmiAudioDownmix, DanteAudio]
- id: set_decoder_edidPreferMode
  label: Set decoder EDID prefer mode
  kind: action
  command: "set decoder {id} edidPreferMode {type}"
  params:
    - name: id
      type: string
    - name: type
      type: string
      enum: [max, strict]
- id: set_decoder_hdmi5vControl
  label: Enable/disable HDMI 5V line
  kind: action
  command: "set decoder {id} hdmi5vControl {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_decoder_lowLatency
  label: Enable/disable low latency mode (ZyPerUHD60)
  kind: action
  command: "set decoder {id} lowLatency {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_decoder_osdStatusMode
  label: Enable/disable OSD status
  kind: action
  command: "set decoder {id} osdStatusMode {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_decoder_powerSave
  label: Enable/disable power save (ZyPerUHD/UHD60)
  kind: action
  command: "set decoder {id} powerSave {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_decoder_displayResolution
  label: Override decoder display resolution
  kind: action
  command: "set decoder {id} displayResolution activeSize {h} {v} fps {fps}"
  params:
    - name: id
      type: string
    - name: h
      type: integer
    - name: v
      type: integer
    - name: fps
      type: integer
- id: set_device_ip_dhcp
  label: Set device IP to DHCP/linkLocal
  kind: action
  command: "set device {id} ip {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [dhcp, linkLocal]
- id: set_device_ip_static
  label: Set device static IP
  kind: action
  command: "set device {id} ip static {addr} {mask} {gateway}"
  params:
    - name: id
      type: string
    - name: addr
      type: string
    - name: mask
      type: string
    - name: gateway
      type: string
- id: set_device_rs232
  label: Configure RS232 on device
  kind: action
  command: "set device {id} rs232 {baud} {data} {stop} {parity}"
  params:
    - name: id
      type: string
    - name: baud
      type: integer
      enum: [2400, 9600, 19200, 38400, 57600, 115200]
    - name: data
      type: string
      enum: ["7-bits", "8-bits"]
    - name: stop
      type: string
      enum: ["1-stop", "2-stop"]
    - name: parity
      type: string
      enum: [none, even, odd]
- id: set_device_security
  label: Enable/disable device security (ZyPer4K-XS/XR)
  kind: action
  command: "set device {id} security {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_device_irProcessing
  label: Configure IR processing
  kind: action
  command: "set device {id} irProcessing {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [zyperTrigger, zyperRemote, none]
- id: set_device_videoPort
  label: Select active input port
  kind: action
  command: "set device {id} videoPort {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [hdmi, hdmiOptionalIn, usbc, auto, displayPort, hdsdi, 12gsdi, component, composite, s-video, vga]
- id: set_device_utilityPort
  label: Enable/disable utility port
  kind: action
  command: "set device {id} utilityPort {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled, onlyDanteAudio]
- id: set_device_usbFilter
  label: Set USB filter
  kind: action
  command: "set device {id} usbFilter {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [none, exceptHid, storage]
- id: set_device_general_name
  label: Set device name
  kind: action
  command: "set device {id} general name {str}"
  params:
    - name: id
      type: string
    - name: str
      type: string
- id: set_encoder_hdcpMode
  label: Set encoder HDCP mode
  kind: action
  command: "set encoder {id} hdcpMode {type}"
  params:
    - name: id
      type: string
    - name: type
      type: string
      enum: [enabled, enabled1_4, disabled]
- id: set_encoder_edid_audio
  label: Set encoder EDID audio format
  kind: action
  command: "set encoder {id} edid audio {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: string
      enum: [onlyPcm, allowCompressed, serverDefault]
- id: set_encoder_analogAudioOut
  label: Set encoder analog audio source
  kind: action
  command: "set encoder {id} analogAudioOut source {type}"
  params:
    - name: id
      type: string
    - name: type
      type: string
      enum: [none, hdmiAudioDownmix, directDanteAudio]
- id: set_encoder_danteAudioOut
  label: Set encoder Dante audio out
  kind: action
  command: "set encoder {id} danteAudioOut source {mode}"
  params:
    - name: id
      type: string
    - name: mode
      type: string
      enum: [analogAudio, hdmiAudioDownmix]
- id: set_multiview
  label: Assign source to multiview window
  kind: action
  command: "set multiview {id} windowNumber {wn} encoderName {enc} position {px} {py} {sx} {sy} layer {ly}"
  params:
    - name: id
      type: string
    - name: wn
      type: integer
      description: window number 1..19
    - name: enc
      type: string
    - name: px
      type: integer
    - name: py
      type: integer
    - name: sx
      type: integer
    - name: sy
      type: integer
    - name: ly
      type: integer
      description: layer 1..9
- id: set_multiview_canvasSize
  label: Set multiview canvas size
  kind: action
  command: "set multiview {id} canvasSize {h} {v}"
  params:
    - name: id
      type: string
    - name: h
      type: integer
      description: 640..8192
    - name: v
      type: integer
      description: 480..8192
- id: set_multiview_audioSource
  label: Set multiview audio source window
  kind: action
  command: "set multiview {id} audioSource windowNumber {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
- id: set_preset_commands_blob
  label: Set preset commands as blob
  kind: action
  command: "set preset {id} commands blob {connections}"
  params:
    - name: id
      type: string
    - name: connections
      type: string
      description: quoted semicolon-separated command list
- id: set_preset_description
  label: Set preset description
  kind: action
  command: "set preset {id} description {description}"
  params:
    - name: id
      type: string
    - name: description
      type: string
- id: set_preset_schedule_month
  label: Set preset schedule month/day/time
  kind: action
  command: "set preset {id} schedule {scname} month {month} dayOfMonth {day} dayOfWeek {dow} hour {hour} minute {minute}"
  params:
    - name: id
      type: string
    - name: scname
      type: string
    - name: month
      type: string
    - name: day
      type: string
    - name: dow
      type: string
    - name: hour
      type: string
    - name: minute
      type: integer
- id: set_responses_rs232TermChars
  label: Set RS232 termination chars
  kind: action
  command: "set responses {id} rs232TermChars {chr}"
  params:
    - name: id
      type: string
    - name: chr
      type: string
- id: set_role
  label: Set role permissions
  kind: action
  command: "set role rolename {rolename} subsystem {subinfo} maxAccess {accessLevel}"
  params:
    - name: rolename
      type: string
    - name: subinfo
      type: string
    - name: accessLevel
      type: string
      enum: [admin, config, join, none, view]
- id: set_server_autoEdidMode
  label: Set server auto EDID mode
  kind: action
  command: "set server autoEdidMode {mode}"
  params:
    - name: mode
      type: string
      enum: [enabled, disabled]
- id: set_server_dataTunnelMode
  label: Set data tunnel mode
  kind: action
  command: "set server dataTunnelMode {mode}"
  params:
    - name: mode
      type: string
      enum: [raw, telnet]
- id: set_server_telnet_password
  label: Set telnet password
  kind: action
  command: "set server telnet password {pass}"
  params:
    - name: pass
      type: string
- id: set_server_telnet_mode
  label: Enable/disable telnet
  kind: action
  command: "set server telnet mode {mode}"
  params:
    - name: mode
      type: string
      enum: [enabled, disabled]
- id: set_server_redundancy_mode
  label: Enable/disable server redundancy
  kind: action
  command: "set server redundancy mode {arg}"
  params:
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_server_security_deviceSecurityKey
  label: Set server security key
  kind: action
  command: "set server security deviceSecurityKey {key}"
  params:
    - name: key
      type: string
      description: 8..64 chars
- id: set_server_discoverMode
  label: Set server discover mode
  kind: action
  command: "set server discoverMode {mode}"
  params:
    - name: mode
      type: string
      enum: [broadcast, multicast]
- id: set_terminal_output
  label: Set terminal output format
  kind: action
  command: "set terminal output {fmt} echo {echo} prompt {prompt}"
  params:
    - name: fmt
      type: string
      enum: [normal, json]
    - name: echo
      type: string
      enum: [yes, no]
    - name: prompt
      type: string
      enum: [yes, no]
- id: set_videoWall_size
  label: Set video wall size and bezel
  kind: action
  command: "set videoWall {id} size rows {rows} columns {cols} topBezel {bezt} bottomBezel {bezb} leftBezel {bezl} rightBezel {bezr}"
  params:
    - name: id
      type: string
    - name: rows
      type: integer
    - name: cols
      type: integer
    - name: bezt
      type: integer
    - name: bezb
      type: integer
    - name: bezl
      type: integer
    - name: bezr
      type: integer
- id: set_videoWall_decoder
  label: Assign decoder to video wall position
  kind: action
  command: "set videoWall {wallid} decoder {id} row {row} column {col}"
  params:
    - name: wallid
      type: string
    - name: id
      type: string
    - name: row
      type: integer
    - name: col
      type: integer
- id: set_videoWall_newName
  label: Rename video wall
  kind: action
  command: "set videoWall {id} newName {name}"
  params:
    - name: id
      type: string
    - name: name
      type: string
- id: shutdown_server
  label: Shutdown server
  kind: action
  command: "shutdown server"
  params: []
- id: sleep
  label: Sleep delay (ms)
  kind: action
  command: "sleep {ms}"
  params:
    - name: ms
      type: integer
- id: start_encoder
  label: Start encoder stream
  kind: action
  command: "start encoder {id} stream {stream}"
  params:
    - name: id
      type: string
    - name: stream
      type: string
      enum: [analogAudio, hdmiAudio, video, videoScaled]
- id: stop_encoder
  label: Stop encoder stream
  kind: action
  command: "stop encoder {id} stream {stream}"
  params:
    - name: id
      type: string
    - name: stream
      type: string
      enum: [analogAudio, hdmiAudio, video, videoScaled]
- id: switch_rs232
  label: Switch RS232 between devices
  kind: action
  command: "switch {txid} {rxid} rs232"
  params:
    - name: txid
      type: string
    - name: rxid
      type: string
- id: switch_ir
  label: Switch IR between devices
  kind: action
  command: "switch {txid} {rxid} ir"
  params:
    - name: txid
      type: string
    - name: rxid
      type: string
- id: troubleReport
  label: Generate trouble report
  kind: action
  command: "troubleReport"
  params: []
- id: troubleReport_password
  label: Generate encrypted trouble report
  kind: action
  command: "troubleReport password {pw}"
  params:
    - name: pw
      type: string
- id: update_device
  label: Update device firmware
  kind: action
  command: "update device {arg} {file}"
  params:
    - name: arg
      type: string
      enum: [id, all, encoders, decoders]
    - name: file
      type: string
- id: update_server
  label: Update server software
  kind: action
  command: "update server {file}"
  params:
    - name: file
      type: string
# ===== UPGRADE PASS: added commands from source not previously captured =====
# ----- Auth / account / misc -----
- id: authenticate_username
  label: Browser authenticate user
  kind: action
  command: "authenticate username {user} password {pwd} token {tkn} newPasword {npwd}"
  params:
    - name: user
      type: string
    - name: pwd
      type: string
    - name: tkn
      type: string
    - name: npwd
      type: string
  notes: "Per source: not intended to be run directly from the API CLI; used by browsers."
- id: help
  label: Show API help
  kind: action
  command: "help {arg}"
  params:
    - name: arg
      type: string
      enum: ["", "all alphabetical", "all byConcept", "all bySubsystem", "all byAccessLevel"]
- id: logging_level
  label: Set logging level
  kind: action
  command: "logging level {level}"
  params:
    - name: level
      type: integer
      description: 1..4
- id: logging_note
  label: Add text note to log
  kind: action
  command: "logging note {string}"
  params:
    - name: string
      type: string
      description: 1..132 chars
- id: set_account_all
  label: Set security features for all accounts
  kind: action
  command: "set account all {option}"
  params:
    - name: option
      type: string
      description: >-
        Per source table. Examples: "authMode telnet oldAuth|fullAuth";
        "authMode web backend|browser"; "concurrentSessionsMax <int>";
        "idleLogout minutes <int>|unlimited";
        "onThreeFailures lockoutMinutes <int>|none disableAccount true|false";
        "password complex enabled|disabled minLen <int>".
- id: set_account_username_password
  label: Set new password for an account
  kind: action
  command: "set account username {user} password new {pass}"
  params:
    - name: user
      type: string
    - name: pass
      type: string
      description: string or * to be prompted
- id: set_account_username_expirePassword
  label: Enable/disable password expiry on account
  kind: action
  command: "set account username {user} expirePassword {arg}"
  params:
    - name: user
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled]
# ----- Load account banners -----
- id: load_account
  label: Load pre/post login banner text or image
  kind: action
  command: "load account all {prepost} {arg} {file}"
  params:
    - name: prepost
      type: string
      enum: [preLoginBanner, postLoginBanner]
    - name: arg
      type: string
      enum: [terminal, webText, webImage]
    - name: file
      type: string
# ----- Decoder additions -----
- id: set_decoder_connectionMode
  label: Set decoder connection mode (ZyPer4K only)
  kind: action
  command: "set decoder {id} connectionMode {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [fastSwitched, genlocked, genlockedScaled]
- id: set_decoder_displayMode
  label: Set decoder display mode (box/crop/stretch)
  kind: action
  command: "set decoder {id} displayMode {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [box, crop, stretch]
- id: set_decoder_hdcpMode
  label: Set decoder HDCP mode (ZyPerUHD/UHD60 only)
  kind: action
  command: "set decoder {id} hdcpMode {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [auto, forceVersion1.4, forceVersion2.2]
  notes: "Per source: will cause decoder to reboot."
- id: set_decoder_hdmiAudioOut
  label: Set decoder HDMI audio out source (ZyPer4K/UHD60 only)
  kind: action
  command: "set decoder {id} hdmiAudioOut source {type}"
  params:
    - name: id
      type: string
    - name: type
      type: string
      enum: [analogAudio, hdmiAudio, hdmiPassthroughAudio, hdmiAudioDownmix]
- id: set_decoder_autoAudioConnections_hdmiAudioFollowVideo
  label: Set decoder audio follow video
  kind: action
  command: "set decoder {id} autoAudioConnections hdmiAudioFollowVideo {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_decoder_displayResolution_auto
  label: Set decoder display resolution from EDID
  kind: action
  command: "set decoder {id} displayResolution auto"
  params:
    - name: id
      type: string
- id: set_decoder_displayResolution_source
  label: Set decoder display resolution to follow source
  kind: action
  command: "set decoder {id} displayResolution source"
  params:
    - name: id
      type: string
- id: set_decoder_displayAdvancedTiming
  label: Override decoder detailed video timing
  kind: action
  command: "set decoder {id} displayAdvancedTiming activeSize {ph} {pv} fps {fps} totalSize {th} {tv} syncFrontPorch {fh} {fv} syncWidth {sh} {sv} syncPolarity {hp} {vp}"
  params:
    - name: id
      type: string
    - name: ph
      type: integer
    - name: pv
      type: integer
    - name: fps
      type: number
    - name: th
      type: integer
    - name: tv
      type: integer
    - name: fh
      type: integer
    - name: fv
      type: integer
    - name: sh
      type: integer
    - name: sv
      type: integer
    - name: hp
      type: string
      enum: [hPositive, hNegative]
    - name: vp
      type: string
      enum: [vPositive, vNegative]
# ----- Device sourceDisplay / optionCard / multicast / dante -----
- id: set_device_sourceDisplay_iconImageName
  label: Set device display icon
  kind: action
  command: "set device {id} sourceDisplay iconImageName {fname}"
  params:
    - name: id
      type: string
    - name: fname
      type: string
      description: filename of icon (e.g. abc, cbs, nbc, fox, xbox, espn)
- id: set_device_sourceDisplay_location
  label: Set device location description
  kind: action
  command: "set device {id} sourceDisplay location {loc}"
  params:
    - name: id
      type: string
    - name: loc
      type: string
- id: set_device_sourceDisplay_manufacturer
  label: Set device manufacturer description
  kind: action
  command: "set device {id} sourceDisplay manufacturer {mfg}"
  params:
    - name: id
      type: string
    - name: mfg
      type: string
- id: set_device_sourceDisplay_model
  label: Set device model description
  kind: action
  command: "set device {id} sourceDisplay model {model}"
  params:
    - name: id
      type: string
    - name: model
      type: string
- id: set_device_sourceDisplay_serialNumber
  label: Set device serial number
  kind: action
  command: "set device {id} sourceDisplay serialNumber {serial}"
  params:
    - name: id
      type: string
    - name: serial
      type: string
- id: set_device_optionCard
  label: Force option card type (ZyPer4K only)
  kind: action
  command: "set device {id} optionCard type {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [auto, hdsdi, displayPort, analog, hdmiOptionalIn, sdi12g]
- id: set_device_sendIpMcastRange
  label: Set multicast address range (ZyPer4K only)
  kind: action
  command: "set device {id} sendIpMcastRange {first} {last}"
  params:
    - name: id
      type: string
      description: device name/MAC, "all", or "encoders"
    - name: first
      type: string
      description: starting multicast IP (224.1.1.1 min)
    - name: last
      type: string
      description: ending multicast IP (239.255.255.255 max)
- id: set_device_dante_ip_dhcp
  label: Set device Dante core to DHCP/linkLocal (UHD60-2EA/2DA only)
  kind: action
  command: "set device {id} dante ip {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [dhcp, linkLocal]
- id: set_device_dante_ip_static
  label: Set device Dante core static IP (UHD60-2EA/2DA only)
  kind: action
  command: "set device {id} dante ip static {addr} {mask} {gateway}"
  params:
    - name: id
      type: string
    - name: addr
      type: string
    - name: mask
      type: string
    - name: gateway
      type: string
# ----- Multiview additions -----
- id: set_multiview_allowMainStream
  label: Allow/disallow main stream in multiview (ZyPer4K only)
  kind: action
  command: "set multiview {id} allowMainStream {arg}"
  params:
    - name: id
      type: string
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_multiview_newEncoderName
  label: Assign new encoder to multiview window (ZyPer4K only)
  kind: action
  command: "set multiview {id} windowNumber {wn} newEncoderName {enc}"
  params:
    - name: id
      type: string
    - name: wn
      type: integer
      description: 1..19
    - name: enc
      type: string
      description: encoder name/MAC or "none"
- id: set_multiview_windowNumber_channel
  label: Cycle encoder source in multiview window (ZyPer4K only)
  kind: action
  command: "set multiview {id} windowNumber {wn} channel {arg}"
  params:
    - name: id
      type: string
    - name: wn
      type: integer
      description: 1..19
    - name: arg
      type: string
      enum: [up, down]
- id: set_multiview_title_textString
  label: Set multiview window title text (ZyPer4K only)
  kind: action
  command: "set multiview {id} windowNumber {wn} title textString {title}"
  params:
    - name: id
      type: string
    - name: wn
      type: integer
    - name: title
      type: string
- id: set_multiview_title_textSize
  label: Set multiview window title text size (ZyPer4K only)
  kind: action
  command: "set multiview {id} windowNumber {wn} title textSize {ts}"
  params:
    - name: id
      type: string
    - name: wn
      type: integer
    - name: ts
      type: integer
      description: 1..10
- id: set_multiview_title_transparency
  label: Set multiview window title transparency (ZyPer4K only)
  kind: action
  command: "set multiview {id} windowNumber {wn} title transparency text {tt} background {bt}"
  params:
    - name: id
      type: string
    - name: wn
      type: integer
    - name: tt
      type: integer
      description: text transparency 0..100
    - name: bt
      type: integer
      description: background transparency 0..100
- id: set_multiview_title_color
  label: Set multiview window title colors (ZyPer4K only)
  kind: action
  command: "set multiview {id} windowNumber {wn} title color text {tc} background {bc}"
  params:
    - name: id
      type: string
    - name: wn
      type: integer
    - name: tc
      type: string
      description: text color name
    - name: bc
      type: string
      description: background color name
# ----- Preset additions -----
- id: set_preset_commands_auto
  label: Set preset commands from existing/empty
  kind: action
  command: "set preset {id} commands auto {connections}"
  params:
    - name: id
      type: string
    - name: connections
      type: string
      enum: [existingConnections, empty]
- id: set_preset_schedule_eventColor
  label: Set preset schedule calendar color
  kind: action
  command: "set preset {id} schedule {scname} eventColor {color}"
  params:
    - name: id
      type: string
    - name: scname
      type: string
    - name: color
      type: string
      description: color name or #RRGGBB hex
# ----- Server additions -----
- id: set_server_api_lineWrap
  label: Set API CLI line wrap width
  kind: action
  command: "set server api lineWrap {wrap}"
  params:
    - name: wrap
      type: integer
      description: 100..512
- id: set_server_contact
  label: Set server contact name
  kind: action
  command: "set server contact {name}"
  params:
    - name: name
      type: string
      description: 1..256 chars (quote if contains space)
- id: set_server_hostname
  label: Set server hostname
  kind: action
  command: "set server hostname {name}"
  params:
    - name: name
      type: string
      description: 1..128 chars (default zyper.local)
- id: set_server_location
  label: Set server location
  kind: action
  command: "set server location {name}"
  params:
    - name: name
      type: string
      description: 1..256 chars
- id: set_server_license
  label: Set server license key
  kind: action
  command: "set server license {key}"
  params:
    - name: key
      type: string
      description: license key from ZeeVee; controls max endpoints
- id: set_server_timezone
  label: Set server timezone
  kind: action
  command: "set server timezone {zone}"
  params:
    - name: zone
      type: string
      description: POSIX timezone (e.g. America/New_York)
- id: set_server_date_manual
  label: Set server date/time manually
  kind: action
  command: "set server date manual month {month} day {day} year {year} hour {hour} minute {minute}"
  params:
    - name: month
      type: integer
    - name: day
      type: integer
    - name: year
      type: integer
    - name: hour
      type: integer
    - name: minute
      type: integer
- id: set_server_date_ntpServer
  label: Set server date/time via NTP server
  kind: action
  command: "set server date ntpServer address {address}"
  params:
    - name: address
      type: string
      description: NTP server IPv4 address
- id: set_server_ftp_mode
  label: Enable/disable FTP access
  kind: action
  command: "set server ftp mode {arg}"
  params:
    - name: arg
      type: string
      enum: [enabled, disabled]
- id: set_server_encoderDefault_audio
  label: Set server default encoder audio format
  kind: action
  command: "set server encoderDefault edid audio {mode}"
  params:
    - name: mode
      type: string
      enum: [allowCompressed, onlyPcm]
- id: set_server_ip
  label: Set server IP per network interface
  kind: action
  command: "set server ip {port} {mode} address {addr} mask {mask} gateway {gateway} dns {dns} reboot"
  params:
    - name: port
      type: string
      enum: [videoPort, managementPort]
    - name: mode
      type: string
      enum: [static, dhcp]
    - name: addr
      type: string
    - name: mask
      type: string
    - name: gateway
      type: string
    - name: dns
      type: string
- id: set_server_isaac_address
  label: Set Isaac server domain name
  kind: action
  command: "set server isaac address {domainname}"
  params:
    - name: domainname
      type: string
- id: set_server_isaac_subsystemId
  label: Set Isaac server subsystem ID
  kind: action
  command: "set server isaac subsystemId {subsystemId}"
  params:
    - name: subsystemId
      type: string
- id: set_server_redundancy_virtualIp
  label: Set virtual IP for master/slave redundancy
  kind: action
  command: "set server redundancy {serv_id} virtualIp address {address} networkInterface {iface}"
  params:
    - name: serv_id
      type: string
      enum: [allServers, thisServer]
      description: or a specific server IP address
    - name: address
      type: string
      description: virtual IP address
    - name: iface
      type: string
      enum: [video, management]
# ----- SNMP netNode -----
- id: set_snmp_netNode_v3
  label: Update SNMP netNode v3 (VAM)
  kind: action
  command: "set snmp netNode {nameId} version v3 authType {auth} username {name} password {pass}"
  params:
    - name: nameId
      type: string
      description: name or numeric ID of NetNode
    - name: auth
      type: string
      enum: [sha1, sha512]
    - name: name
      type: string
    - name: pass
      type: string
- id: set_snmp_netNode_v2c
  label: Update SNMP netNode v2c (VAM)
  kind: action
  command: "set snmp netNode {nameId} snmp v2c communityName {name}"
  params:
    - name: nameId
      type: string
    - name: name
      type: string
- id: set_snmp_netNode_ipAddress
  label: Update SNMP netNode IP address (VAM)
  kind: action
  command: "set snmp netNode {ipaddr} ipAddress {newipaddr}"
  params:
    - name: ipaddr
      type: string
      description: current NetNode IP
    - name: newipaddr
      type: string
      description: new NetNode IP
# ----- TLS generate / load / sign / set -----
- id: generate_tls_ca
  label: Generate TLS CA private key
  kind: action
  command: "generate tls ca privKeyPass {privKey} country {country} state {state} locality {local} organization {org} organizationUnit {orgunit} email {email}"
  params:
    - name: privKey
      type: string
      description: private key phrase, or * to be prompted
    - name: country
      type: string
      description: 2-char country code
    - name: state
      type: string
      description: 2-char state code
    - name: local
      type: string
    - name: org
      type: string
    - name: orgunit
      type: string
    - name: email
      type: string
- id: generate_tls_server_csr
  label: Generate TLS server CSR private key
  kind: action
  command: "generate tls server csr privKeyPass {privKey} fqdn {domain} country {country} state {state} locality {local} organization {org} organizationUnit {orgunit} email {email}"
  params:
    - name: privKey
      type: string
    - name: domain
      type: string
      description: fully qualified domain name
    - name: country
      type: string
    - name: state
      type: string
    - name: local
      type: string
    - name: org
      type: string
    - name: orgunit
      type: string
    - name: email
      type: string
- id: generate_tls_device_csr
  label: Generate TLS device CSR private key
  kind: action
  command: "generate tls device csr privKeyPass {privKey} fqdn {domain} country {country} state {state} locality {local} organization {org} organizationUnit {orgunit} email {email}"
  params:
    - name: privKey
      type: string
    - name: domain
      type: string
    - name: country
      type: string
    - name: state
      type: string
    - name: local
      type: string
    - name: org
      type: string
    - name: orgunit
      type: string
    - name: email
      type: string
- id: generate_tls_radius_csr
  label: Generate TLS radius CSR private key
  kind: action
  command: "generate tls radius csr privKeyPass {privKey} fqdn {domain} country {country} state {state} locality {local} organization {org} organizationUnit {orgunit} email {email}"
  params:
    - name: privKey
      type: string
    - name: domain
      type: string
    - name: country
      type: string
    - name: state
      type: string
    - name: local
      type: string
    - name: org
      type: string
    - name: orgunit
      type: string
    - name: email
      type: string
- id: load_tls_ca_cert_fromInput
  label: Load TLS CA cert from input
  kind: action
  command: "load tls ca cert fromInput *"
  params: []
- id: load_tls_ca_cert_fromFile
  label: Load TLS CA cert from file
  kind: action
  command: "load tls ca cert fromFile {filename}"
  params:
    - name: filename
      type: string
- id: load_tls_ca_privateKey_fromInput
  label: Load TLS CA private key from input
  kind: action
  command: "load tls ca privateKey privKeyPass * fromInput *"
  params: []
- id: load_tls_ca_privateKey_fromFile
  label: Load TLS CA private key from file
  kind: action
  command: "load tls ca privateKey privKeyPass * fromFile {filename}"
  params:
    - name: filename
      type: string
- id: load_tls_device_caIntermediates_fromInput
  label: Load TLS device CA intermediates from input
  kind: action
  command: "load tls device caIntermediates fromInput {arg}"
  params:
    - name: arg
      type: string
      enum: [none, "*"]
- id: load_tls_device_caIntermediates_fromFile
  label: Load TLS device CA intermediates from file
  kind: action
  command: "load tls device caIntermediates fromFile {filename}|none"
  params:
    - name: filename
      type: string
- id: load_tls_device_cert_fromInput
  label: Load TLS device cert from input
  kind: action
  command: "load tls device cert fromInput *"
  params: []
- id: load_tls_device_cert_fromFile
  label: Load TLS device cert from file
  kind: action
  command: "load tls device cert fromFile {filename}"
  params:
    - name: filename
      type: string
- id: load_tls_device_privateKey_fromInput
  label: Load TLS device private key from input
  kind: action
  command: "load tls device privateKey privKeyPass * fromInput *"
  params: []
- id: load_tls_device_privateKey_fromFile
  label: Load TLS device private key from file
  kind: action
  command: "load tls device privateKey privKeyPass * fromFile {filename}"
  params:
    - name: filename
      type: string
- id: load_tls_server_caIntermediates_fromInput
  label: Load TLS server CA intermediates from input
  kind: action
  command: "load tls server caIntermediates fromInput {arg}"
  params:
    - name: arg
      type: string
      enum: [none, "*"]
- id: load_tls_server_caIntermediates_fromFile
  label: Load TLS server CA intermediates from file
  kind: action
  command: "load tls server caIntermediates fromFile {filename}|none"
  params:
    - name: filename
      type: string
- id: load_tls_server_cert_fromInput
  label: Load TLS server cert from input
  kind: action
  command: "load tls server cert fromInput *"
  params: []
- id: load_tls_server_cert_fromFile
  label: Load TLS server cert from file
  kind: action
  command: "load tls server cert fromFile {filename}"
  params:
    - name: filename
      type: string
- id: load_tls_server_privateKey_fromInput
  label: Load TLS server private key from input
  kind: action
  command: "load tls server privateKey privKeyPass * fromInput *"
  params: []
- id: load_tls_server_privateKey_fromFile
  label: Load TLS server private key from file
  kind: action
  command: "load tls server privateKey privKeyPass * fromFile {filename}"
  params:
    - name: filename
      type: string
- id: sign_tls_csr_fromInput
  label: Sign TLS CSR from input
  kind: action
  command: "sign tls csr caPrivateKeyPass * fromInput *"
  params: []
- id: sign_tls_csr_fromFile
  label: Sign TLS CSR from file
  kind: action
  command: "sign tls csr PrivateKeyPass * fromFile {filename}"
  params:
    - name: filename
      type: string
- id: set_tls_server_mode
  label: Enable/disable web server TLS mode
  kind: action
  command: "set tls server mode {mode}"
  params:
    - name: mode
      type: string
      enum: [enabled, disabled]
- id: set_tls_server_fqdn
  label: Set server TLS FQDN
  kind: action
  command: "set tls server fqdn {domain}|fromCert"
  params:
    - name: domain
      type: string
      description: full domain name, or fromCert
# ----- Show (query) commands -----
- id: show_account
  label: Show account information
  kind: query
  command: "show account {select} {since}"
  params:
    - name: select
      type: string
      enum: [active users, allConfig, list, login banner filenames, login banner text webPreLogin, login banner text webPostLogin]
    - name: since
      type: integer
      description: optional lastChangeId
- id: show_dataTunnels
  label: Show open RS232/IR data relay ports
  kind: query
  command: "show dataTunnels"
  params: []
- id: show_device_capabilities
  label: Show device capabilities
  kind: query
  command: "show device capabilities {id} {select} {since}"
  params:
    - name: id
      type: string
    - name: select
      type: string
      enum: [all, encoders, decoders]
    - name: since
      type: integer
      description: optional lastChangeId
- id: show_device_config
  label: Show device configuration
  kind: query
  command: "show device config {id} {since}"
  params:
    - name: id
      type: string
    - name: since
      type: integer
      description: optional lastChangeId
- id: show_device_connections
  label: Show encoder connections to decoders
  kind: query
  command: "show device connections"
  params: []
- id: show_device_names
  label: Show device names, MAC, IP, state
  kind: query
  command: "show device names {arg}"
  params:
    - name: arg
      type: string
      enum: [all, encoders, decoders]
- id: show_device_status
  label: Show device status
  kind: query
  command: "show device status {id} {since}"
  params:
    - name: id
      type: string
    - name: since
      type: integer
      description: optional lastChangeId
- id: show_device_userAdded
  label: Show manually added devices
  kind: query
  command: "show device userAdded"
  params: []
- id: show_files
  label: Show files stored on server
  kind: query
  command: "show files {type}"
  params:
    - name: type
      type: string
      enum: [all, edid, firmware, icon, idleImage]
- id: show_logs_authentications
  label: Show login/logout events
  kind: query
  command: "show logs authentications max {quantity}"
  params:
    - name: quantity
      type: integer
- id: show_logs_commands
  label: Show recent commands sent to server
  kind: query
  command: "show logs commands max {quantity}"
  params:
    - name: quantity
      type: integer
- id: show_multiviews_config
  label: Show multiview configuration (ZyPer4K only)
  kind: query
  command: "show multiviews config"
  params: []
- id: show_multiviews_status
  label: Show multiview status (ZyPer4K only)
  kind: query
  command: "show multiviews status"
  params: []
- id: show_multiviews_titles
  label: Show multiview titles (ZyPer4K only)
  kind: query
  command: "show multiviews titles {arg}"
  params:
    - name: arg
      type: string
      enum: [config, text]
- id: show_preset
  label: Show preset information
  kind: query
  command: "show preset {name} {arg} {since}"
  params:
    - name: name
      type: string
    - name: arg
      type: string
      enum: [commandBlob, commands, config, runLog, schedule, status]
    - name: since
      type: integer
      description: optional lastChangeId
- id: show_responses
  label: Show device RS232/IR responses
  kind: query
  command: "show responses {id} {type} {param3}"
  params:
    - name: id
      type: string
    - name: type
      type: string
      enum: [ir, rs232]
    - name: param3
      type: string
      enum: [last, lastChangeId, since]
- id: show_role
  label: Show role information
  kind: query
  command: "show role {rolename}|all maxAccess {since}"
  params:
    - name: rolename
      type: string
    - name: since
      type: integer
      description: optional lastChangeId
- id: show_server_config
  label: Show server configuration
  kind: query
  command: "show server config {since}"
  params:
    - name: since
      type: integer
      description: optional lastChangeId
- id: show_server_info
  label: Show server info
  kind: query
  command: "show server info {since}"
  params:
    - name: since
      type: integer
      description: optional lastChangeId
- id: show_server_ip_duplicates
  label: Show duplicate IP addresses
  kind: query
  command: "show server ip duplicates {since}"
  params:
    - name: since
      type: integer
      description: optional lastChangeId
- id: show_server_redundancy
  label: Show master/slave redundancy info
  kind: query
  command: "show server redundancy"
  params: []
- id: show_snmp
  label: Show SNMP users/trap servers
  kind: query
  command: "show snmp {arg}"
  params:
    - name: arg
      type: string
      enum: [trapServers, users]
- id: show_snmp_netNode
  label: Show SNMP netNode info (VAM)
  kind: query
  command: "show snmp {ident} {arg}"
  params:
    - name: ident
      type: string
      enum: [all, "<netNode name>"]
    - name: arg
      type: string
      enum: [general, snooping, warnings, "justChanges since <lastChangeId>"]
- id: show_snmp_netNode_vlan
  label: Show SNMP netNode VLAN info (VAM)
  kind: query
  command: "show snmp {ident} vlan {vlan} snooping"
  params:
    - name: ident
      type: string
    - name: vlan
      type: string
      description: VLAN number or "all"
- id: show_snmp_netNode_port
  label: Show SNMP netNode port info (VAM)
  kind: query
  command: "show snmp {ident} port {port} {detail}"
  params:
    - name: ident
      type: string
    - name: port
      type: string
      description: port number or "all"
    - name: detail
      type: string
      enum: [state, peer, snooping, vlan, stats]
- id: show_snmp_netNode_multicastForwardingDb
  label: Show SNMP netNode multicast forwarding DB (VAM)
  kind: query
  command: "show snmp {ident} multicastForwardingDb"
  params:
    - name: ident
      type: string
      enum: [all, "<netNode name>"]
- id: show_tls_ca_pem
  label: Show TLS CA PEM data
  kind: query
  command: "show tls ca pem {arg}"
  params:
    - name: arg
      type: string
      enum: [cert, privKey, signedCert]
- id: show_tls_device_pem
  label: Show TLS device/server/radius PEM data
  kind: query
  command: "show tls device pem {target} {arg}"
  params:
    - name: target
      type: string
      enum: [device, radius, server]
    - name: arg
      type: string
      enum: [csr, cert, privKey, caIntermediates]
- id: show_tls_summary
  label: Show TLS summary
  kind: query
  command: "show tls {arg} summary"
  params:
    - name: arg
      type: string
      enum: [ca, radius, server]
- id: show_tls_device_summary
  label: Show TLS device summary
  kind: query
  command: "show tls device summary"
  params: []
- id: show_values
  label: Show possible values for encoders/decoders/server/multiviews
  kind: query
  command: "show values {arg}"
  params:
    - name: arg
      type: string
      enum: [all, "encoder status", "encoder config", "decoder status", "decoder config", "server info", "server config", "server redundancy", "multiview status", "multiview config"]
- id: show_videoWalls
  label: Show all video walls
  kind: query
  command: "show videoWalls"
  params: []
- id: show_zones
  label: Show all zones
  kind: query
  command: "show zones"
  params: []
- id: show_events
  label: Poll events since lastChangeId
  kind: query
  command: "show events since {id}"
  params:
    - name: id
      type: integer
      description: lastChangeId; use 0 for all
```

## Feedbacks
```yaml
- id: device_state
  type: enum
  values: [Up, Down]
- id: server_state
  type: enum
  values: [down, initialization, master, slave-sync, slave, slave-switching-over, slave-db-updating, not-participating, slave-waiting-for-master, slave-version-mismatch]
- id: hdmi_connection
  type: enum
  values: [connected, disconnected]
- id: video_status
  type: enum
  values: [no, yes, yes-with-warning]
- id: hdcp_status
  type: enum
  values: [yes, no]
- id: hdcp_version
  type: enum
  values: [none, "1.4", "2.2"]
- id: resolution_change
  type: object
  description: sizeX, sizeY, fps change events
- id: rs232_response
  type: string
  description: RS232 data string from device
- id: ir_response
  type: string
  description: IR data hex string
- id: multiview_status
  type: enum
  values: [active, inactive]
- id: device_temperature
  type: number
  description: device.main temperature in Celsius (per show device status)
- id: firmware_update_status
  type: object
  description: status, loadingFile, percentComplete (per show device status)
```

## Variables
```yaml
- id: hdcp_mode
  type: enum
  values: [enabled, enabled1_4, disabled]
- id: edid_audio_format
  type: enum
  values: [onlyPcm, allowCompressed, serverDefault]
- id: rs232_baud
  type: enum
  values: [2400, 9600, 19200, 38400, 57600, 115200]
- id: rs232_data_bits
  type: enum
  values: ["7-bits", "8-bits"]
- id: rs232_stop_bits
  type: enum
  values: ["1-stop", "2-stop"]
- id: rs232_parity
  type: enum
  values: [none, even, odd]
- id: analog_audio_out
  type: enum
  values: [none, hdmiAudioDownmix, analogAudio, directDanteAudio]
- id: dante_audio_out
  type: enum
  values: [joinedAudio, none, analogAudio, hdmiAudioDownmix, DanteAudio]
- id: edid_prefer_mode
  type: enum
  values: [max, strict]
- id: power_save
  type: enum
  values: [enabled, disabled]
- id: osd_status_mode
  type: enum
  values: [enabled, disabled]
- id: hdmi_5v_control
  type: enum
  values: [enabled, disabled]
- id: low_latency
  type: enum
  values: [enabled, disabled]
- id: video_port
  type: enum
  values: [hdmi, hdmiOptionalIn, usbc, auto, displayPort, hdsdi, 12gsdi, component, composite, s-video, vga, none]
- id: utility_port
  type: enum
  values: [enabled, disabled, onlyDanteAudio]
- id: usb_filter
  type: enum
  values: [none, exceptHid, storage]
- id: data_tunnel_mode
  type: enum
  values: [raw, telnet]
- id: discover_mode
  type: enum
  values: [broadcast, multicast]
- id: role_access
  type: enum
  values: [admin, config, join, none, view]
- id: device_ip_mode
  type: enum
  values: [dhcp, static, linkLocal]
- id: device_security
  type: enum
  values: [enabled, disabled]
- id: terminal_output
  type: enum
  values: [normal, json]
- id: canvas_size
  type: object
  description: multiview canvas pixelsHoriz (640..8192), pixelsVert (480..8192); max 8,847,360 pixels
- id: display_mode
  type: enum
  values: [box, crop, stretch]
- id: connection_mode
  type: enum
  values: [fastSwitched, genlocked, genlockedScaled]
- id: decoder_hdcp_mode
  type: enum
  values: [auto, forceVersion1.4, forceVersion2.2]
- id: option_card
  type: enum
  values: [auto, hdsdi, displayPort, analog, hdmiOptionalIn, sdi12g]
- id: logging_level
  type: integer
  description: 1..4
```

## Events
```yaml
- id: DeviceStateChange
  message: "state=up|down"
  example: "Event::DeviceStateChange::DE1(d8:80:39:9a:af:e1)::Jun-18-02:42:56:PM::13::: state=Up"
- id: ServerStateChange
  message: "state=<from>-><to>"
- id: ServerIpChanged
  message: "ipAddress=<from>-><to>"
- id: NewServer
  message: "id=<id>, ip=<ipAddr>, state=<serverState>"
- id: OtherServerStateChange
  message: "ip=<ipAddr>, state=<from>-><to>"
- id: DeviceStatus
  message: "initial state event sent on connection"
- id: CableConnection
  message: "cable=connected|disconnected"
- id: VideoStatusChange
  message: "receivingVideoFromEncoder=no|yes|yes-with-warning"
- id: ResolutionChange
  message: "sizeX=from->to, sizeY=from->to, fps=from->to"
- id: VideoChanged
  message: "interlaced/color/colorDepth/hdcp/hdcpVersion/hdmi20 change"
- id: RS232Data
  message: "data=<rs232Data>"
- id: IRData
  message: "data=<irData> (hex Pronto code)"
- id: AutoEdidSelect
  message: "sourceDecoder/edidValid/pixClockMhz/color/colorDepth/onlyPcmAudio change"
- id: MulticastConflict
  message: "conflict=<multicastAddr>, action=getting new address"
- id: AllocMcastFailed
  message: "allocation=failed"
- id: EdidFirstChecksumInvalid
  message: "firstChecksum=invalid"
- id: EdidSecondChecksumInvalid
  message: "secondChecksum=invalid"
- id: IRDongleButtons
  message: "button0=open|closed, button1=open|closed"
```

## Macros
```yaml
- id: rs232_ir_data_tunnel
  description: "Open a TCP tunnel to relay RS232 or IR data between server and a specific encoder/decoder."
  command: "dataConnect {id1} server {mode} tunnelPort {port}"
  notes: "Use raw or telnet mode set via set server dataTunnelMode. Connect via TCP to tunnelPort; whatever sent is forwarded; whatever device returns is received on TCP connection."
- id: preset_presetNew_with_connections
  description: "Create a preset capturing current connections."
  command: "create presetNew {name} commands existingConnections"
- id: preset_blob
  description: "Define preset as a list of API commands separated by semicolons (max 4096 chars)."
  command: "set preset {id} commands blob \"join Cuba Bot-Left fast-switched;join NBC Bot_Right fast-switched\""
- id: multiview_layout_percentages
  description: "Place window using percentage coordinates."
  command: "set multiview {id} windowNumber {wn} encoderName {enc} percentPositionX {x} percentPositionY {y} percentSizeX {sx} percentSizeY {sy} layer {ly}"
- id: device_password_reset_no_password
  description: "Reset telnet to no-password state."
  command: "FTP empty file named defaultPasswords to /files on MP, then power-cycle MP within 1 minute."
  notes: "Per source: requires physical access to the MP."
```

## Safety
```yaml
confirmation_required_for:
  - factoryDefaults device
  - delete allConfiguration
  - delete device
  - shutdown server
  - delete multiview
  - delete videoWall
  - delete preset
  - revert server
interlocks: []
# Per source: factoryDefaults / delete allConfiguration / delete device affect device/server state with no rollback.
# Per source: set device security enabled locks device to a specific server key; if key is lost, hardware factory default required.
# Per source: set device irProcessing enables IR control from physical inputs.
# Per source: dataConnect opens a TCP listener on the ZMP server for IR/RS232 pass-through.
# Per source: set decoder hdcpMode / osdStatusMode cause decoder reboot.
# Per source: set device security key change requires disabling security on all devices first.
```

## Notes
- API prompt is `Zyper$` on Telnet/SSH sessions; events entered via `events` command consume one telnet session exclusively for asynchronous events.
- WebSocket event endpoint: `ws://<mp>:8001` using protocol `zeeVeeLogging` (send `Send Events` on connect).
- HTTP preview streams: `http://<mp_ip>/media/<encoder_mac>.m3u8` (HLS) or `http://<mp_ip>/media/<encoder_mac>.jpeg` (JPEG, 1 fps).
- RS232 responses terminate by configured `rs232TermChars` (default `"\n\r"`); if none set, each low-level response is its own response. RS232 events emit after termination char or 10 ms idle.
- Device commands tagged "ZyPer4K only", "ZyPerUHD only", "ZyPerUHD60 only", "ZyPer4K-XS/XR only", or "ZyPerHD only" in source — applicability varies by family; consult device capability via `show device capabilities`.
- Many commands support optional `since <lastChangeId>` to limit output to changes since that change ID.
- Authentication: telnet has no password by default; can be set via `set server telnet password`; web auth mode set via `set account all authMode web backend|browser`.
- Default hostname: `zyper.local`. Default EDID audio format: `onlyPcm`. Default canvas: 3840x2160.
- Source refines both RS-232 (`set device rs232` with documented baud/data/stop/parity values) and Telnet data tunnels over TCP.
- Device naming: colons, quotes, and blank spaces are not valid in device names.
- CEC not supported on ZyPerHD; CEC on ZyPer4K requires firmware 3.5.2+; CEC hexString not supported on ZyPerUHD.
- TLS: server/device/radius CSR + CA cert management via generate/load/sign/show tls commands.
- Many show commands support `since <lastChangeId>` polling for incremental state.
<!-- UNRESOLVED: full parameter enumeration for every command in source exceeds scope; many sub-options and enum values summarized. Use source for exhaustive list. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact ZMP hardware platform variants (NUC / Proserver / VMware / ZyUHD60-EMP) only named per update file, not enumerated per command applicability. -->
````

Upgrade done. Added ~95 missing actions (all `show *` queries, TLS generate/load/sign/set, `set device sourceDisplay *`, `set device dante ip *`, `set device optionCard`, `set device sendIpMcastRange`, decoder `connectionMode`/`displayMode`/`hdcpMode`/`hdmiAudioOut`/`displayAdvancedTiming`/`autoAudioConnections`, `set server *` batch, `set snmp netNode *`, `set multiview *` extras, `set preset *` extras, `set account all`, `load account`, `logging`, `help`, `authenticate username`). Preserved all existing IDs/shapes. Added port 8001 websocket note, 2 feedbacks, 4 variables, 1 macro.

## Provenance

```yaml
source_domains:
  - zeevee.com
  - partners.zeevee.com
source_urls:
  - https://www.zeevee.com/wp-content/uploads/2025/09/ZMP_4_0_3_user-manual.pdf
  - https://www.zeevee.com/zmp-api-manual/
  - https://www.zeevee.com/zmp-rs232-syntax-guide/
  - https://partners.zeevee.com/English/
retrieved_at: 2026-08-11T03:33:28.044Z
last_checked_at: 2026-08-19T10:04:11.661Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T10:04:11.661Z
matched_actions: 235
action_count: 235
confidence: medium
summary: "All 235 spec actions have literal command matches in the source's API Command Listing and detailed subsections. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this doc covers the entire ZMP API controlling the ZyPer product family rather than a single device; treat the spec as a control-surface summary. Specific encoder/decoder model command applicability varies by family and is noted per-action where the source distinguishes ZyPer4K / ZyPerUHD / ZyPerUHD60 / ZyPerHD. Firmware matrix, exact ZMP server hardware (NUC vs. Proserver vs. VMware), and licensing tiers not fully detailed."
- "HTTP base URL not stated; example uses http://<mp_ip_address>/media/..."
- "full parameter enumeration for every command in source exceeds scope; many sub-options and enum values summarized. Use source for exhaustive list."
- "firmware version compatibility not stated in source."
- "exact ZMP hardware platform variants (NUC / Proserver / VMware / ZyUHD60-EMP) only named per update file, not enumerated per command applicability."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
