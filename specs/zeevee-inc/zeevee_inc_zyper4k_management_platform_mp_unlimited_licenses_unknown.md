---
spec_id: admin/zeevee-zyper4k-management-platform-mp
schema_version: ai4av-public-spec-v1
revision: 2
title: "Zeevee Inc ZyPer4K Management Platform (MP) Control Spec"
manufacturer: "Zeevee Inc"
model_family: "ZyPer4K Management Platform (MP) Unlimited Licenses"
aliases: []
compatible_with:
  manufacturers:
    - "Zeevee Inc"
  models:
    - "ZyPer4K Management Platform (MP) Unlimited Licenses"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - zeevee.com
source_urls:
  - https://www.zeevee.com/zmp-api-manual/
  - https://www.zeevee.com/zmp-rs232-syntax-guide/
  - https://www.zeevee.com/documentation/
retrieved_at: 2026-08-11T03:09:15.876Z
last_checked_at: 2026-08-19T10:09:28.769Z
generated_at: 2026-08-19T10:09:28.769Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default TCP port for the API not explicitly stated in source (telnet/SSH access shown without a port number)."
  - "no voltage/current/power specifications in source."
  - "firmware/software version compatibility ranges not stated in source."
  - "API/HTTP/FTP port numbers not explicitly stated in source"
  - "many additional response fields per show command not individually enumerated."
  - "full parameter set per set command not individually enumerated."
  - "specific event payload schema not documented in source."
  - "preset schedule execution details partially documented."
  - "no electrical/power/voltage safety specs in source."
  - "default API control port (telnet/HTTP/FTP) not explicitly stated in source."
  - "firmware/software version compatibility matrix not stated."
  - "full per-command response/feedback field schemas not individually enumerated."
  - "voltage, current, power, and environmental specs not in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T10:09:28.769Z
  matched_actions: 222
  action_count: 222
  confidence: medium
  summary: "All 222 spec actions map to source commands verbatim and source's command catalogue is essentially fully represented. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Zeevee Inc ZyPer4K Management Platform (MP) Control Spec

## Summary
The ZyPer4K Management Platform (ZMP) is a server-based management system for ZeeVee ZyPer family AV-over-IP endpoints (encoders/decoders). It exposes a text-line API accessible over Telnet/SSH (TCP) and HTTP (JSON), used to discover/configure endpoints, route video/audio/USB joins, build multiviews and video walls, manage presets/zones/KVM, and relay IR/RS-232/CEC to downstream devices. This spec covers the ZMP API command set.

<!-- UNRESOLVED: default TCP port for the API not explicitly stated in source (telnet/SSH access shown without a port number). -->
<!-- UNRESOLVED: no voltage/current/power specifications in source. -->
<!-- UNRESOLVED: firmware/software version compatibility ranges not stated in source. -->

## Transport
```yaml
# Primary control is a text-line API reached via Telnet or SSH (TCP). HTTP is used
# for JSON responses and preview-stream/media retrieval. FTP is used for file
# transfer (firmware/EDID/images). All four are explicitly documented.
protocols:
  - tcp       # Telnet/SSH text API (e.g. "telnet 192.168.0.78", "Zyper$" prompt)
  - http      # JSON responses + preview streams ("http://mp_ip_address/media/<mac>.m3u8|.jpeg")
  # FTP used for file upload (firmware/EDID/icons) - not a control channel.
addressing:
  base_url: "http://<mp_ip_address>/media/"  # preview/media endpoint pattern (mp_ip_address = IP of ZMP)
  port: null  # UNRESOLVED: API/HTTP/FTP port numbers not explicitly stated in source
auth:
  type: password  # configurable: "set server telnet password" + account/role/2FA/LDAP system; "By default Telnet has no password."
```

## Traits
```yaml
- routable    # inferred: join commands route video/audio/USB from encoder to decoder/wall/multiview
- queryable   # inferred: extensive show*/show device status/show values query commands
- powerable   # inferred: restart device, shutdown server, factoryDefaults device commands
```

## Actions
```yaml
# Commands enumerated from the API Command Listing + detailed sections. Each
# documented mnemonic = one action. Parameter ranges/enum values within a single
# command are shown as params, not split into separate actions. Payloads/templates
# are copied verbatim from the source syntax blocks.

# ---- device add / discovery ----
- id: add_device
  label: Add Device (manual)
  kind: action
  command: "add device ipAddress <ip>"
  params:
    - name: ip
      type: string
      description: IP address of the device (on a different VLAN/subnet or in Isolation Mode)

- id: add_ldap
  label: Add LDAP Group
  kind: action
  command: "add ldap ldapGroupId <id> mapto roleName <name>"
  params:
    - name: id
      type: integer
      description: LDAP group ID (1 to 65535)
    - name: name
      type: string
      description: Role name (Tech or Admin)

- id: add_snmp
  label: Add SNMP User / Trap Server
  kind: action
  command: "add snmp <arg> <name>"
  params:
    - name: arg
      type: string
      description: "trapServer v2cTrap ipAddress <addr> community <comm> | user v2c accessLevel readOnly community | user v3 accessLevel readOnly auth MD5 encrypted no username <name> password <pwd>"

- id: add_snmp_netnode_v3
  label: Add SNMP netNode (v3)
  kind: action
  command: "add snmp netNode ipAddress <ipaddr> snmp v3 authType <auth> username <name> password <pass>"
  params:
    - name: auth
      type: string
      description: "sha1 | sha512"

- id: add_snmp_netnode_v2c
  label: Add SNMP netNode (v2c)
  kind: action
  command: "add snmp netNode ipAddress <ipaddr> snmp v2c communityName <name>"
  params: []

- id: add_zonedisplay
  label: Add Zone Display
  kind: action
  command: "add zoneDisplay <name> <id>"
  params:
    - name: name
      type: string
      description: Zone name (case-sensitive); "All" adds to every zone
    - name: id
      type: string
      description: Display/video-wall name or MAC address

- id: authenticate_username
  label: Authenticate Username (browser)
  kind: action
  command: "authenticate username <user> password <pwd> token <tkn> newPasword <npwd>"
  params: []
  notes: Not intended to be run directly from the API CLI; used by browsers.

# ---- channel / cloning / conversion ----
- id: channel
  label: Channel Up/Down
  kind: action
  command: "channel <direction> <decoder-id>"
  params:
    - name: direction
      type: string
      description: "up | down"

- id: clone_multiview
  label: Clone Multiview
  kind: action
  command: "clone multiview <name> to <newmvname>"
  params: []

- id: convert_pid
  label: Convert PID (12G SDI)
  kind: action
  command: "convertPid ZyPer4K sdi12g <toNewPid|toOldPid> <filename>"
  params: []
  notes: ZyPer4K only; run under Kramer/ZeeVee support direction.

# ---- create ----
- id: create_account
  label: Create Account
  kind: action
  command: "create account <name> <passwordOption>"
  params:
    - name: passwordOption
      type: string
      description: "password <pwd> | tempInitialPassword"

- id: create_kvm
  label: Create KVM
  kind: action
  command: "create kvm <name>"
  params: []

- id: create_multiview
  label: Create Multiview
  kind: action
  command: "create multiview <name>"
  params: []

- id: create_preset_new
  label: Create Preset (New)
  kind: action
  command: "create presetNew <name> commands <connections>"
  params:
    - name: connections
      type: string
      description: "empty | existingConnections"

- id: create_preset_schedule
  label: Create Preset Schedule
  kind: action
  command: "create presetSchedule <presetname> <schedule name>"
  params: []

- id: create_role
  label: Create Role
  kind: action
  command: "create role <name> allSubsystems maxAccess <accessLevel>"
  params:
    - name: accessLevel
      type: string
      description: "admin | config | join | none | view"

- id: create_videowall
  label: Create Video Wall
  kind: action
  command: "create videoWall <name>"
  params: []

- id: create_zone
  label: Create Zone
  kind: action
  command: "create zone <name>"
  params: []

# ---- dataConnect / diagnostics ----
- id: dataconnect
  label: Data Connect (IR/RS232 tunnel)
  kind: action
  command: "dataConnect <id1> <id2> <mode> tunnelPort <port>"
  params:
    - name: mode
      type: string
      description: "ir | rs232"
    - name: port
      type: integer
      description: TCP tunnel port (1024 to 49152)

- id: diagnostics_device
  label: Diagnostics Device
  kind: query
  command: "diagnostics device <id>"
  params: []

- id: dumpusb
  label: Dump USB
  kind: query
  command: "dumpusb"
  params: []
  notes: Hidden command; not in HELP.

- id: events
  label: Enter Events Mode
  kind: action
  command: "events"
  params: []
  notes: Server streams events to the telnet session; any char exits.

# ---- device-level operations ----
- id: factorydefaults_device
  label: Factory Defaults Device
  kind: action
  command: "factoryDefaults device <id>"
  params: []

- id: flashleds
  label: Flash LEDs
  kind: action
  command: "flashLeds <id>"
  params: []
  notes: LEDs flash for 5 seconds.

- id: restart_device
  label: Restart Device
  kind: action
  command: "restart device <id>"
  params: []

- id: shutdown_server
  label: Shutdown Server
  kind: action
  command: "shutdown server"
  params: []

- id: revert_server
  label: Revert Server
  kind: action
  command: "revert server"
  params: []
  notes: Returns to previously installed API/database version.

- id: update_device
  label: Update Device Firmware
  kind: action
  command: "update device <arg> <file>"
  params:
    - name: arg
      type: string
      description: "<id> | all | encoders | decoders"
    - name: file
      type: string
      description: ".apz or .zip firmware file"

- id: update_server
  label: Update Server Software
  kind: action
  command: "update server <file>"
  params:
    - name: file
      type: string
      description: ".zyper platform-specific update file"

- id: trouble_report
  label: Trouble Report
  kind: action
  command: "troubleReport [password <pw>]"
  params: []
  notes: Writes .tgz (or .gpg if password) to /srv/ftp/files.

# ---- generate TLS ----
- id: generate_tls_ca
  label: Generate TLS CA Private Key
  kind: action
  command: "generate tls ca privKeyPass <privKey> country <country> state <state> locality <local> organization <org> organizationUnit <orgunit> email <email>"
  params: []

- id: generate_tls_device_csr
  label: Generate TLS Device CSR
  kind: action
  command: "generate tls device csr privKeyPass <privKey> fqdn <domain> country <country> state <state> locality <local> organization <org> organizationUnit <orgunit> email <email>"
  params: []

- id: generate_tls_server_csr
  label: Generate TLS Server CSR
  kind: action
  command: "generate tls server csr privKeyPass <privKey> fqdn <domain> country <country> state <state> locality <local> organization <org> organizationUnit <orgunit> email <email>"
  params: []

- id: generate_tls_radius_csr
  label: Generate TLS Radius CSR
  kind: action
  command: "generate tls radius csr privKeyPass <privKey> fqdn <domain> country <country> state <state> locality <local> organization <org> organizationUnit <orgunit> email <email>"
  params: []

- id: sign_tls_csr
  label: Sign TLS CSR
  kind: action
  command: "sign tls csr caPrivateKeyPass <*|pass> <fromInput *|fromFile <filename>>"
  params: []

# ---- help / sleep / script / logout ----
- id: help
  label: Help
  kind: query
  command: "help [all alphabetical|byConcept|bySubsystem|byAccessLevel|concept <c>|subsystem <s>|accessLevel <a>|search string <kw>]"
  params: []

- id: sleep
  label: Sleep
  kind: action
  command: "sleep <ms>"
  params:
    - name: ms
      type: integer
      description: Duration in milliseconds

- id: script
  label: Run Script
  kind: action
  command: "script <file> [loop]"
  params: []
  notes: Script must exist in /srv/ftp/files.

- id: logout
  label: Logout
  kind: action
  command: "logout [force sessionId <num>]"
  params: []

# ---- join (routing) ----
- id: join
  label: Join (route)
  kind: action
  command: "join <enc> <dec> <mode>"
  params:
    - name: mode
      type: string
      description: "analogAudio | danteAudio | fastSwitched | genlocked | genlockedScaled | hdmiAudio | multiview | video | videoWall | window | usb | none"
  notes: "join none <dec> fastSwitched" disconnects. Window mode takes viewportSource/viewportDest coords.

- id: join_videosource
  label: Join Video Source (audio follow)
  kind: action
  command: "join videoSource <dec> <mode>"
  params:
    - name: mode
      type: string
      description: "audio (UHD only) | hdmiAudio (4K family only)"

# ---- load ----
- id: load_account
  label: Load Account Banner
  kind: action
  command: "load account all <preLoginBanner|postLoginBanner> <terminal|webText|webImage> <file>"
  params: []

- id: load_encoder_edid
  label: Load Encoder EDID
  kind: action
  command: "load encoderEdid <enc> <mode> <file>"
  params:
    - name: mode
      type: string
      description: "auto | builtIn | default | saved"

- id: load_idle_image
  label: Load Idle Image
  kind: action
  command: "load idleImage <dec> filename <file>"
  params: []
  notes: JPG 1280x720.

- id: load_tls_ca_cert
  label: Load TLS CA Cert
  kind: action
  command: "load tls ca cert <fromInput *|fromFile <filename>>"
  params: []

- id: load_tls_ca_privatekey
  label: Load TLS CA Private Key
  kind: action
  command: "load tls ca privateKey privKeyPass <*|pass> <fromInput *|fromFile <filename>>"
  params: []

- id: load_tls_device_caintermediates
  label: Load TLS Device CA Intermediates
  kind: action
  command: "load tls device caIntermediates <fromInput none|*|fromFile <filename|none>>"
  params: []

- id: load_tls_device_cert
  label: Load TLS Device Cert
  kind: action
  command: "load tls device cert <fromInput *|fromFile <filename>>"
  params: []

- id: load_tls_device_privatekey
  label: Load TLS Device Private Key
  kind: action
  command: "load tls device privateKey privKeyPass <*|pass> <fromInput *|fromFile <filename>>"
  params: []

- id: load_tls_server_caintermediates
  label: Load TLS Server CA Intermediates
  kind: action
  command: "load tls server caIntermediates <fromInput none|*|fromFile <filename|none>>"
  params: []

- id: load_tls_server_cert
  label: Load TLS Server Cert
  kind: action
  command: "load tls server cert <fromInput *|fromFile <filename>>"
  params: []

- id: load_tls_server_privatekey
  label: Load TLS Server Private Key
  kind: action
  command: "load tls server privateKey privKeyPass <*|pass> <fromInput *|fromFile <filename>>"
  params: []

- id: logging
  label: Logging Level / Note
  kind: action
  command: "logging <level <int>|note <string>>"
  params: []

# ---- preview stream ----
- id: preview_stream
  label: Preview Stream Start/Stop
  kind: action
  command: "previewStream <enc> <stop|start> [<hls|jpeg> width <size>]"
  params:
    - name: size
      type: integer
      description: Width in pixels (180 to 400)

# ---- redundancy ----
- id: redundancy_add_server
  label: Redundancy Add Server
  kind: action
  command: "redundancy add server ip <ip>"
  params: []

- id: redundancy_delete_downservers
  label: Redundancy Delete Down Servers
  kind: action
  command: "redundancy delete downServers"
  params: []

- id: redundancy_delete_server
  label: Redundancy Delete Server
  kind: action
  command: "redundancy delete server ip <ip>"
  params: []

- id: redundancy_switchover
  label: Redundancy Switchover
  kind: action
  command: "redundancy switchover"
  params: []

# ---- rename ----
- id: rename_kvm
  label: Rename KVM
  kind: action
  command: "rename kvm <kvmname> newName <newkvmname>"
  params: []

- id: rename_zone
  label: Rename Zone
  kind: action
  command: "rename zone <zonename> newName <newzonename>"
  params: []

# ---- restore / save / run ----
- id: restore_server_database
  label: Restore Server Database
  kind: action
  command: "restore server database <name>"
  params: []

- id: run_preset
  label: Run Preset
  kind: action
  command: "run preset <name>"
  params: []

- id: save_device_edid
  label: Save Device EDID
  kind: action
  command: "save deviceEdid <id> <file>"
  params: []

- id: save_server_database
  label: Save Server Database
  kind: action
  command: "save server database <name>"
  params: []

- id: save_system_config
  label: Save System Config
  kind: action
  command: "save system config <name>"
  params: []

# ---- send (IR/CEC/RS232 relay) ----
- id: send
  label: Send IR / CEC / RS232
  kind: action
  command: "send <id> <type> <text>"
  params:
    - name: type
      type: string
      description: "ir (Pronto hex, max 1024 chars) | cec on|off | cec <hexString> | rs232 (ASCII, max 256 chars)"

# ---- delete ----
- id: delete_account
  label: Delete Account
  kind: action
  command: "delete account <id>"
  params: []

- id: delete_allconfiguration
  label: Delete All Configuration
  kind: action
  command: "delete allConfiguration <reboot|restart|shutdown>"
  params: []

- id: delete_device
  label: Delete Device
  kind: action
  command: "delete device <id>"
  params: []

- id: delete_kvm
  label: Delete KVM
  kind: action
  command: "delete kvm <name> [row <int> col <int>]"
  params: []

- id: delete_ldap
  label: Delete LDAP
  kind: action
  command: "delete ldap ldapGroupId <id>"
  params: []

- id: delete_multiview
  label: Delete Multiview
  kind: action
  command: "delete multiview <name>"
  params: []

- id: delete_multiview_window
  label: Delete Multiview Window
  kind: action
  command: "delete multiviewWindow <name> window <wn>"
  params:
    - name: wn
      type: integer
      description: Window number (1 to 9)

- id: delete_preset
  label: Delete Preset / RunLog / Schedule
  kind: action
  command: "delete preset <name> [runLog|schedule <schname>]"
  params: []

- id: delete_role
  label: Delete Role
  kind: action
  command: "delete role <id>"
  params: []

- id: delete_snmp
  label: Delete SNMP User / Trap Server
  kind: action
  command: "delete snmp <arg> <name>"
  params: []

- id: delete_snmp_netnode
  label: Delete SNMP netNode
  kind: action
  command: "delete snmp netNode <byName|byId> <ident>"
  params: []

- id: delete_videowall
  label: Delete Video Wall
  kind: action
  command: "delete videoWall <name>"
  params: []

- id: delete_zone
  label: Delete Zone
  kind: action
  command: "delete zone <name>"
  params: []

- id: delete_zonedisplay
  label: Delete Zone Display
  kind: action
  command: "delete zoneDisplay <name> <id>"
  params: []

# ---- set account ----
- id: set_account_all
  label: Set Account (all) Security Features
  kind: action
  command: "set account all <option>"
  params:
    - name: option
      type: string
      description: "authMode telnet <oldAuth|fullAuth> | authMode web <backend|browser> | concurrentSessionsMax <int|unlimited> | idleLogout minutes <int|unlimited> | onThreeFailures lockoutMinutes <int|none> disableAccount <true|false> | password complex <enabled|disabled> minLen <int> | password duration ..."

- id: set_account_password
  label: Set Account Password
  kind: action
  command: "set account password existing <currentpass|*> <newpass>"
  params: []

- id: set_account_username
  label: Set Account Username Features
  kind: action
  command: "set account username <user> <option>"
  params:
    - name: option
      type: string
      description: "2fa <enabled|disabled> | expirePassword <enabled|disabled> | lock | unlock | password new <string|*> | role <rolename>"

# ---- set decoder ----
- id: set_decoder_analogaudioout
  label: Set Decoder Analog Audio Out
  kind: action
  command: "set decoder <id> analogAudioOut source <type>"
  params:
    - name: type
      type: string
      description: "analogAudio | hdmiAudio | hdmiPassthroughAudio | hdmiAudioDownmix | danteAudio | directDanteAudio"

- id: set_decoder_connectionmode
  label: Set Decoder Connection Mode
  kind: action
  command: "set decoder <id> connectionMode <fastSwitched|genlocked|genlockedScaled>"
  params: []
  notes: ZyPer4K family only.

- id: set_decoder_displayadvancedtiming
  label: Set Decoder Display Advanced Timing
  kind: action
  command: "set decoder <id> displayAdvancedTiming activeSize <pixelsHoriz> <pixelsVert> fps <float> totalSize <pixelsHoriz> <pixelsVert> syncFrontPorch <pixelsHoriz> <pixelsVert> syncWidth <pixelsHoriz> <pixelsVert> syncPolarity <hPositive|hNegative> <vPositive|vNegative>"
  params: []

- id: set_decoder_displaymode
  label: Set Decoder Display Mode
  kind: action
  command: "set decoder <id> displayMode <box|crop|stretch>"
  params: []

- id: set_decoder_displayresolution
  label: Set Decoder Display Resolution
  kind: action
  command: "set decoder <id> displayResolution <auto|source|activeSize <int> <int> fps <int>>"
  params: []

- id: set_decoder_danteaudioout
  label: Set Decoder Dante Audio Out
  kind: action
  command: "set decoder <id> danteAudioOut source <arg>"
  params:
    - name: arg
      type: string
      description: "joinedAudio | none | analogAudio | hdmiAudioDownmix | DanteAudio"

- id: set_decoder_edidprefermode
  label: Set Decoder EDID Prefer Mode
  kind: action
  command: "set decoder <id> edidPreferMode <max|strict>"
  params: []

- id: set_decoder_hdcpmode
  label: Set Decoder HDCP Mode
  kind: action
  command: "set decoder <id> hdcpMode <auto|forceVersion1.4|forceVersion2.2>"
  params: []
  notes: ZyPerUHD and ZyPerUHD60 only; forces decoder reboot.

- id: set_decoder_hdmiaudioout
  label: Set Decoder HDMI Audio Out
  kind: action
  command: "set decoder <id> hdmiAudioOut source <type>"
  params:
    - name: type
      type: string
      description: "analogAudio | hdmiAudio | hdmiAudioDownmix | hdmiPassthroughAudio"

- id: set_decoder_hdmi5vcontrol
  label: Set Decoder HDMI 5V Control
  kind: action
  command: "set decoder <id> hdmi5vControl <enabled|disabled>"
  params: []
  notes: ZyPer4K-XS/XSE/XR only.

- id: set_decoder_lowlatency
  label: Set Decoder Low Latency
  kind: action
  command: "set decoder <id> lowLatency <enabled|disabled>"
  params: []
  notes: ZyPerUHD60 only.

- id: set_decoder_osdstatusmode
  label: Set Decoder OSD Status Mode
  kind: action
  command: "set decoder <id> osdStatusMode <enabled|disabled>"
  params: []
  notes: ZyPerUHD/UHD60 only; forces reboot.

- id: set_decoder_powersave
  label: Set Decoder Power Save
  kind: action
  command: "set decoder <id> powerSave <enabled|disabled>"
  params: []
  notes: ZyPerUHD/UHD60 only.

- id: set_decoder_autoaudioconnections
  label: Set Decoder Auto Audio Connections
  kind: action
  command: "set decoder <id> autoAudioConnections hdmiAudioFollowVideo <enabled|disabled>"
  params: []

# ---- set device ----
- id: set_device_dante_port
  label: Set Device Dante Port
  kind: action
  command: "set device <id> dante port <video|utility> <reboot|noReboot>"
  params: []

- id: set_device_dante_ip
  label: Set Device Dante IP (DHCP)
  kind: action
  command: "set device <id> dante ip <dhcp|linkLocal>"
  params: []

- id: set_device_dante_ip_static
  label: Set Device Dante IP (Static)
  kind: action
  command: "set device <id> ip static <addr> <mask> <gateway>"
  params: []

- id: set_device_dante_vlan_mode
  label: Set Device Dante VLAN Mode
  kind: action
  command: "set device <id> dante vlan mode <enabled|disabled> vlanId <LANid> <reboot|noReboot>"
  params:
    - name: LANid
      type: integer
      description: VLAN ID (1 to 4000)

- id: set_device_general_name
  label: Set Device Name
  kind: action
  command: "set device <id> general name <str>"
  params: []
  notes: "Invalid chars: colon, quotes, spaces."

- id: set_device_ip
  label: Set Device IP (DHCP)
  kind: action
  command: "set device <id> ip <dhcp|linkLocal>"
  params: []

- id: set_device_ip_static
  label: Set Device IP (Static)
  kind: action
  command: "set device <id> ip static <addr> <mask> <gateway>"
  params: []

- id: set_device_irprocessing
  label: Set Device IR Processing
  kind: action
  command: "set device <id> irProcessing <zyperTrigger|zyperRemote|none>"
  params: []

- id: set_device_optioncard
  label: Set Device Option Card
  kind: action
  command: "set device <id> optionCard type <arg>"
  params:
    - name: arg
      type: string
      description: "auto | hdsdi | displayPort | analog | hdmiOptionalIn | sdi12g"

- id: set_device_rs232
  label: Set Device RS232 Settings
  kind: action
  command: "set device <id> rs232 <baud> <data> <stop> <parity>"
  params:
    - name: baud
      type: string
      description: "2400 | 9600 | 19200 | 38400 | 57600 | 115200"
    - name: data
      type: string
      description: "7-bits | 8-bits"
    - name: stop
      type: string
      description: "1-stop | 2-stop"
    - name: parity
      type: string
      description: "none | even | odd"

- id: set_device_security
  label: Set Device Security
  kind: action
  command: "set device <id> security <enabled|disabled>"
  params: []
  notes: ZyPer4K-XS/XSE/XR only.

- id: set_device_sendipmcastrange
  label: Set Device Send IP Multicast Range
  kind: action
  command: "set device <id> sendIpMcastRange <first:ip> <last:ip>"
  params: []
  notes: Range 224.1.1.1 to 239.255.255.255.

- id: set_device_sourcedisplay_iconimagename
  label: Set Device Source Display Icon
  kind: action
  command: "set device <id> sourceDisplay iconImageName <fname>"
  params: []

- id: set_device_sourcedisplay_location
  label: Set Device Source Display Location
  kind: action
  command: "set device <id> sourceDisplay location <loc>"
  params: []

- id: set_device_sourcedisplay_manufacturer
  label: Set Device Source Display Manufacturer
  kind: action
  command: "set device <id> sourceDisplay manufacturer <mfg>"
  params: []

- id: set_device_sourcedisplay_model
  label: Set Device Source Display Model
  kind: action
  command: "set device <id> sourceDisplay model <model>"
  params: []

- id: set_device_sourcedisplay_serialnumber
  label: Set Device Source Display Serial Number
  kind: action
  command: "set device <id> sourceDisplay serialNumber <serial>"
  params: []

- id: set_device_usbfilter
  label: Set Device USB Filter
  kind: action
  command: "set device <id> usbFilter <none|exceptHid|storage>"
  params: []

- id: set_device_usbtype
  label: Set Device USB Type
  kind: action
  command: "set device <id> usbType <full|hid>"
  params: []

- id: set_device_utilityport
  label: Set Device Utility Port
  kind: action
  command: "set device <id> utilityPort <enabled|disabled|onlyDanteAudio>"
  params: []

- id: set_device_videoport
  label: Set Device Video Port
  kind: action
  command: "set device <id> videoPort <arg>"
  params:
    - name: arg
      type: string
      description: "hdmi | hdmiOptionalIn | usbc | auto | displayPort | hdsdi | 12gsdi | component | composite | s-video | vga"

# ---- set encoder ----
- id: set_encoder_analogaudioout
  label: Set Encoder Analog Audio Out
  kind: action
  command: "set encoder <id> analogAudioOut source <type>"
  params:
    - name: type
      type: string
      description: "none | hdmiAudioDownmix | directDanteAudio"

- id: set_encoder_danteaudioout
  label: Set Encoder Dante Audio Out
  kind: action
  command: "set encoder <id> danteAudioOut source <analogAudio|hdmiAudioDownmix>"
  params: []

- id: set_encoder_edid_audio
  label: Set Encoder EDID Audio
  kind: action
  command: "set encoder <id> edid audio <onlyPcm|allowCompressed|serverDefault>"
  params: []

- id: set_encoder_hdcpmode
  label: Set Encoder HDCP Mode
  kind: action
  command: "set encoder <id> hdcpMode <enabled|enabled1_4|disabled>"
  params: []

# ---- set kvm ----
- id: set_kvm
  label: Set KVM Position
  kind: action
  command: "set kvm <name> row <int> column <int> <decoder|encoder|multiview|usbSource> <id>"
  params: []

- id: set_kvm_hotkey
  label: Set KVM Hotkey Base
  kind: action
  command: "set kvm all hotkeyBase <ctrl-ctrl|shift-shift|alt-alt|scroll-scroll|print-print>"
  params: []

# ---- set ldap ----
- id: set_ldap_mode
  label: Set LDAP Mode
  kind: action
  command: "set ldap mode <disabled|enabled>"
  params: []

- id: set_ldap_server_address
  label: Set LDAP Server Address
  kind: action
  command: "set ldap server address <domain>"
  params: []

- id: set_ldap_server_basesearchdn
  label: Set LDAP Server Base Search DN
  kind: action
  command: "set ldap server baseSearchDn <name>"
  params: []

- id: set_ldap_server_binddn_username
  label: Set LDAP Server bindDn Username
  kind: action
  command: "set ldap server bindDn username <username>"
  params: []

- id: set_ldap_server_binddn_password
  label: Set LDAP Server bindDn Password
  kind: action
  command: "set ldap server bindDn password <password>"
  params: []

- id: set_ldap_type
  label: Set LDAP Type
  kind: action
  command: "set ldap type <openLdap|activeDirectory>"
  params: []

# ---- set multiview ----
- id: set_multiview
  label: Set Multiview Window (percent/pixel)
  kind: action
  command: "set multiview <id> windowNumber <wn> encoderName <enc> position <percentPositionX|pixelPositionX> <posx> <percentPositionY|pixelPositionY> <posy> <percentSizeX|pixelSizeX> <sx> <percentSizeY|pixelSizeY> <sy> layer <ly>"
  params: []

- id: set_multiview_layer_position_size
  label: Set Multiview Window Layer / Position / Size (no encoder)
  kind: action
  command: "set multiview <id> windowNumber <wn> [positionX <posx>] [positionY <posy>] [sizeX <sx>] [sizeY <sy>] [layer <ly>]"
  params: []
  notes: "Sets windowNumber then any subset of positionX/positionY/sizeX/sizeY/layer without re-supplying encoder. sizeX/sizeY may be percentSizeX/percentSizeY or pixelSizeX/pixelSizeY."

- id: set_multiview_allowmainstream
  label: Set Multiview Allow Main Stream
  kind: action
  command: "set multiview <id> allowMainStream <enabled|disabled>"
  params: []

- id: set_multiview_audiosource
  label: Set Multiview Audio Source Window
  kind: action
  command: "set multiview <id> audioSource windowNumber <int|none>"
  params: []

- id: set_multiview_channel
  label: Set Multiview Window Channel Up/Down
  kind: action
  command: "set multiview <id> windowNumber <wn> channel <up|down>"
  params: []

- id: set_multiview_canvassize
  label: Set Multiview Canvas Size
  kind: action
  command: "set multiview <id> canvasSize <pixelsHoriz> <pixelsVert>"
  params: []

- id: set_multiview_newencodername
  label: Set Multiview Window New Encoder
  kind: action
  command: "set multiview <id> windowNumber <wn> newEncoderName <encName|none>"
  params: []

- id: set_multiview_title_textstring
  label: Set Multiview Window Title Text
  kind: action
  command: "set multiview <id> windowNumber <wn> title textString <title>"
  params: []
  notes: Strings containing spaces must be enclosed in quotations.

- id: set_multiview_title_textsize
  label: Set Multiview Window Title Text Size
  kind: action
  command: "set multiview <id> windowNumber <wn> title textSize <ts>"
  params:
    - name: ts
      type: integer
      description: Text size (1 to 10)

- id: set_multiview_title_transparency
  label: Set Multiview Window Title Transparency
  kind: action
  command: "set multiview <id> windowNumber <wn> title transparency text <tt> background <bt>"
  params:
    - name: tt
      type: integer
      description: Text transparency percentage (0 to 100)
    - name: bt
      type: integer
      description: Background transparency percentage (0 to 100)

- id: set_multiview_title_color
  label: Set Multiview Window Title Color
  kind: action
  command: "set multiview <id> windowNumber <wn> title color text <tc> background <bc>"
  params:
    - name: tc
      type: string
      description: "Text color: black, blue, brown, cyan, darkBlue, gray, green, lightBlue, lightGray, lime, magenta, maroon, olive, orange, purple, red, silver, white, yellow"
    - name: bc
      type: string
      description: "Background color: black, blue, brown, cyan, darkBlue, gray, green, lightBlue, lightGray, lime, magenta, maroon, olive, orange, purple, red, silver, white, yellow"

# ---- set preset ----
- id: set_preset_commands_auto
  label: Set Preset Commands Auto
  kind: action
  command: "set preset <id> commands auto <existingConnections|empty>"
  params: []

- id: set_preset_commands_blob
  label: Set Preset Commands Blob
  kind: action
  command: "set preset <id> commands blob <connections>"
  params: []
  notes: Quoted semicolon-separated commands; max 4096 chars.

- id: set_preset_description
  label: Set Preset Description
  kind: action
  command: "set preset <id> description <description>"
  params: []

- id: set_preset_schedule_eventcolor
  label: Set Preset Schedule Event Color
  kind: action
  command: "set preset <id> schedule <scname> eventColor <color>"
  params: []

- id: set_preset_schedule_month
  label: Set Preset Schedule Month/Day/Time
  kind: action
  command: "set preset <id> schedule <scname> month <month> dayOfMonth <day> dayOfWeek <day> hour <hour> minute <minute>"
  params: []

# ---- set responses / role ----
- id: set_responses_rs232termchars
  label: Set RS232 Termination Chars
  kind: action
  command: "set responses <id> chr"
  params: []

- id: set_role
  label: Set Role Permissions
  kind: action
  command: "set role <rolename> subsystem <subinfo> maxAccess <accessLevel>"
  params:
    - name: subinfo
      type: string
      description: "account | all | device | ldap | log | multiview | netmap | preset | role | server | snmpagent | tls | videowall | zone"
    - name: accessLevel
      type: string
      description: "admin | config | join | none | view"

# ---- set server ----
- id: set_server_api_linewrap
  label: Set Server API Line Wrap
  kind: action
  command: "set server api lineWrap <wrap>"
  params:
    - name: wrap
      type: integer
      description: 100 to 512

- id: set_server_autoedidmode
  label: Set Server Auto EDID Mode
  kind: action
  command: "set server autoEdidMode <disabled|enabled>"
  params: []

- id: set_server_contact
  label: Set Server Contact
  kind: action
  command: "set server contact <name>"
  params: []

- id: set_server_datatunnelmode
  label: Set Server Data Tunnel Mode
  kind: action
  command: "set server dataTunnelMode <raw|telnet>"
  params: []

- id: set_server_date
  label: Set Server Date
  kind: action
  command: "set server date <manual month <int> day <int> year <int> hour <int> minute <int>|ntpServer address <domainName>>"
  params: []

- id: set_server_discovermode
  label: Set Server Discover Mode
  kind: action
  command: "set server discoverMode all <broadcast|multicast|none>"
  params: []

- id: set_server_encoderdefault_audio
  label: Set Server Encoder Default Audio
  kind: action
  command: "set server encoderDefault edid audio <allowCompress|onlyPcm>"
  params: []

- id: set_server_ftp_mode
  label: Set Server FTP Mode
  kind: action
  command: "set server ftp mode <enabled|disabled>"
  params: []

- id: set_server_hostname
  label: Set Server Hostname
  kind: action
  command: "set server hostName <name>"
  params: []

- id: set_server_ip
  label: Set Server IP
  kind: action
  command: "set server ip <videoPort|managementPort> <static|dhcp> [address <IP> mask <Mask> gateway <Gateway> dns <DNS>] reboot"
  params: []

- id: set_server_isaac_address
  label: Set Server Isaac Address
  kind: action
  command: "set server isaac address <domainname>"
  params: []

- id: set_server_isaac_subsystemid
  label: Set Server Isaac Subsystem ID
  kind: action
  command: "set server isaac subsystemId <subsystemID>"
  params: []

- id: set_server_isolationmode
  label: Set Server Isolation Mode
  kind: action
  command: "set server isolationMode <enabled|disabled>"
  params: []

- id: set_server_license
  label: Set Server License
  kind: action
  command: "set server license <key>"
  params: []

- id: set_server_location
  label: Set Server Location
  kind: action
  command: "set server location <name>"
  params: []

- id: set_server_redundancy_mode
  label: Set Server Redundancy Mode
  kind: action
  command: "set server redundancy mode <enabled|disabled>"
  params: []

- id: set_server_redundancy
  label: Set Server Redundancy Virtual IP
  kind: action
  command: "set server redundancy <serv_id> virtualIp address <IP_Address> networkInterface <video|management>"
  params: []

- id: set_server_redundancy_preferredrole
  label: Set Server Redundancy Preferred Master / Slave
  kind: action
  command: "set server redundancy <serv_id> preferredMaster <true|false> preferredSlave <true|false>"
  params:
    - name: serv_id
      type: string
      description: "allServers | thisServer | <server IP Address>"
  notes: Used by redundancy configuration step "Configure the preferred roles".

- id: set_server_security_devicekey
  label: Set Server Security Device Key
  kind: action
  command: "set server security deviceSecurityKey <key>"
  params: []
  notes: Key 8 to 64 chars.

- id: set_server_telnet_password
  label: Set Server Telnet Password
  kind: action
  command: "set server telnet password <pass>"
  params: []

- id: set_server_telnet_mode
  label: Set Server Telnet Mode
  kind: action
  command: "set server telnet mode <enabled|disabled>"
  params: []

- id: set_server_timezone
  label: Set Server Timezone
  kind: action
  command: "set server timezone <zone>"
  params: []

# ---- set terminal / snmp / tls / videowall ----
- id: set_terminal_output
  label: Set Terminal Output
  kind: action
  command: "set terminal output <normal|json> echo <yes|no> prompt <yes|no>"
  params: []

- id: set_snmp_netnode_v3
  label: Set SNMP netNode (v3)
  kind: action
  command: "set snmp netNode <nameId> version v3 authType <sha1|sha512> username <name> password <pass>"
  params: []

- id: set_snmp_netnode_v2c
  label: Set SNMP netNode (v2c)
  kind: action
  command: "set snmp netNode <nameID> snmp v2c communityName <name>"
  params: []

- id: set_snmp_netnode_ipaddress
  label: Set SNMP netNode IP Address
  kind: action
  command: "set snmp netNode <ipaddr> ipAddress <newipaddr>"
  params: []

- id: set_tls_server_mode
  label: Set TLS Server Mode
  kind: action
  command: "set tls server mode <enabled|disabled>"
  params: []

- id: set_tls_server_fqdn
  label: Set TLS Server FQDN
  kind: action
  command: "set tls server fqdn <domain|fromCert>"
  params: []

- id: set_videowall_size
  label: Set Video Wall Size / Bezels
  kind: action
  command: "set videoWall <id> size rows <rows> columns <cols> topBezel <bezt> bottomBezel <bezb> leftBezel <bezl> rightBezel <bezr>"
  params: []

- id: set_videowall_decoder
  label: Set Video Wall Decoder
  kind: action
  command: "set videoWall <wallid> decoder <id|none> row <row> column <col>"
  params: []

- id: set_videowall_newname
  label: Set Video Wall New Name
  kind: action
  command: "set videoWall <id> newName <name>"
  params: []

# ---- start / stop ----
- id: start_encoder
  label: Start Encoder Stream
  kind: action
  command: "start encoder <id> stream <arg>"
  params:
    - name: arg
      type: string
      description: "analogAudio | hdmiAudio | video | videoScaled"

- id: stop_encoder
  label: Stop Encoder Stream
  kind: action
  command: "stop encoder <id> stream <arg>"
  params:
    - name: arg
      type: string
      description: "analogAudio | hdmiAudio | video | videoScaled"

- id: start_kvm
  label: Start KVM
  kind: action
  command: "start kvm <name>"
  params: []

- id: stop_kvm
  label: Stop KVM
  kind: action
  command: "stop kvm <name>"
  params: []

- id: switch
  label: Switch (IR/RS232 between devices)
  kind: action
  command: "switch <txid> <rxid> <ir|rs232>"
  params: []

# ---- show (queries) ----
- id: show_account
  label: Show Account
  kind: query
  command: "show account <active users|allConfig|list|login banner filenames|login banner text webPreLogin|login banner text webPostLogin> [since <id>]"
  params: []

- id: show_datatunnels
  label: Show Data Tunnels
  kind: query
  command: "show dataTunnels"
  params: []

- id: show_device_capabilities
  label: Show Device Capabilities
  kind: query
  command: "show device capabilities <id|all|encoders|decoders> [since <id>]"
  params: []

- id: show_device_config
  label: Show Device Config
  kind: query
  command: "show device config <id|all|commands|encoders|decoders> [since <id>]"
  params: []

- id: show_device_connections
  label: Show Device Connections
  kind: query
  command: "show device connections"
  params: []

- id: show_device_names
  label: Show Device Names
  kind: query
  command: "show device names <id|all|encoders|decoders>"
  params: []

- id: show_device_status
  label: Show Device Status
  kind: query
  command: "show device status <id|all|encoders|decoders> [since <id>]"
  params: []

- id: show_device_useradded
  label: Show Device User Added
  kind: query
  command: "show device userAdded"
  params: []

- id: show_files
  label: Show Files
  kind: query
  command: "show files <all|edid|firmware|icon|idleImage>"
  params: []

- id: show_kvm_config
  label: Show KVM Config
  kind: query
  command: "show kvm config [since <id>]"
  params: []

- id: show_kvm_swapped
  label: Show KVM Swapped
  kind: query
  command: "show kvm swapped [since <id>]"
  params: []

- id: show_ldap
  label: Show LDAP
  kind: query
  command: "show ldap <server|groupIdToRole>"
  params: []

- id: show_logs_authentications
  label: Show Logs Authentications
  kind: query
  command: "show logs authentications max <quantity>"
  params: []

- id: show_logs_commands
  label: Show Logs Commands
  kind: query
  command: "show logs commands max <quantity>"
  params: []

- id: show_multiviews_config
  label: Show Multiviews Config
  kind: query
  command: "show multiviews config"
  params: []

- id: show_multiviews_status
  label: Show Multiviews Status
  kind: query
  command: "show multiviews status"
  params: []

- id: show_multiviews_titles_config
  label: Show Multiviews Titles Config
  kind: query
  command: "show multiviews titles config"
  params: []

- id: show_multiviews_titles_text
  label: Show Multiviews Titles Text
  kind: query
  command: "show multiviews titles text"
  params: []

- id: show_preset
  label: Show Preset
  kind: query
  command: "show preset <name> <commandBlob|commands|config|runLog|schedule|status> [since <id>]"
  params: []

- id: show_responses
  label: Show Responses (IR/RS232)
  kind: query
  command: "show responses <id> <ir|rs232> <last|lastChangeId|since <id>>"
  params: []

- id: show_role
  label: Show Role
  kind: query
  command: "show role <rolename|all> maxAccess [since <id>]"
  params: []

- id: show_server_config
  label: Show Server Config
  kind: query
  command: "show server config [since <id>]"
  params: []

- id: show_server_info
  label: Show Server Info
  kind: query
  command: "show server info [since <id>]"
  params: []

- id: show_server_ip_duplicates
  label: Show Server IP Duplicates
  kind: query
  command: "show server ip duplicates [since <id>]"
  params: []

- id: show_server_manageddevices
  label: Show Server Managed Devices
  kind: query
  command: "show server managedDevices all [since <id>]"
  params: []

- id: show_server_redundancy
  label: Show Server Redundancy
  kind: query
  command: "show server redundancy [since <id>]"
  params: []

- id: show_snmp
  label: Show SNMP
  kind: query
  command: "show snmp <trapServers|users>"
  params: []

- id: show_snmp_netnode
  label: Show SNMP netNode
  kind: query
  command: "show snmp <ident> <general|snooping|warnings|justChanges since <id>>"
  params: []

- id: show_snmp_netnode_vlan
  label: Show SNMP netNode VLAN
  kind: query
  command: "show snmp <ident> vlan <arg> snooping"
  params: []

- id: show_snmp_netnode_port
  label: Show SNMP netNode Port
  kind: query
  command: "show snmp <ident> port <arg> <state|peer|snooping|vlan|stats>"
  params: []

- id: show_snmp_netnode_mfdb
  label: Show SNMP netNode Multicast Forwarding DB
  kind: query
  command: "show snmp <ident> multicastForwardingDb"
  params: []

- id: show_tls_ca_pem
  label: Show TLS CA PEM
  kind: query
  command: "show tls ca pem <cert|privKey|signedCert>"
  params: []

- id: show_tls_device_pem
  label: Show TLS Device PEM
  kind: query
  command: "show tls device pem <device|radius|server> <csr|cert|privKey|caIntermediates>"
  params: []

- id: show_tls_summary
  label: Show TLS Summary
  kind: query
  command: "show tls <ca|radius|server> summary"
  params: []

- id: show_tls_device_summary
  label: Show TLS Device Summary
  kind: query
  command: "show tls device summary"
  params: []

- id: show_values
  label: Show Values
  kind: query
  command: "show values <all|encoder status|encoder config|decoder status|decoder config|server info|server config|server redundancy|multiview status|multiview config>"
  params: []

- id: show_videowalls
  label: Show Video Walls
  kind: query
  command: "show videoWalls"
  params: []

- id: show_zones
  label: Show Zones
  kind: query
  command: "show zones"
  params: []
```

## Feedbacks
```yaml
# Representative observable states returned by show*/diagns commands.
# Full set of response fields is large; see source for complete field lists per query.
- id: device_state
  type: enum
  values: [Up, Down]
  source_query: "show device status"
- id: device_hdmi_input_status
  type: object
  description: HDMI input cable/hdcp/resolution/fps/color details
  source_query: "show device status"
- id: device_connection_mode
  type: enum
  values: [fastSwitched, genlocked, genlockedScaled]
  source_query: "show device config"
- id: diagnostics_summary
  type: object
  description: "status=complete, error=<n>, warning=<n>, info=<n>"
  source_query: "diagnostics device"
- id: rs232_response
  type: string
  description: RS232 response string ring buffer entry
  source_query: "show responses <id> rs232"
- id: server_info
  type: object
  description: hostname/version/uptime/license/device counts
  source_query: "show server info"
- id: server_redundancy
  type: object
  description: "state, version, preferredMaster, preferredSlave, virtualIp"
  source_query: "show server redundancy"
- id: device_connections
  type: object
  description: encoder->decoder connection map
  source_query: "show device connections"
- id: multiview_titles_config
  type: object
  description: per-window position/textSize/color/transparency
  source_query: "show multiviews titles config"
- id: multiview_titles_text
  type: object
  description: per-window text string and canvas/audioSourceWindow
  source_query: "show multiviews titles text"
- id: kvm_swapped
  type: object
  description: per-kvm position-to-encoder/decoder assignments
  source_query: "show kvm swapped"
# UNRESOLVED: many additional response fields per show command not individually enumerated.
```

## Variables
```yaml
# Settable device/server parameters (non-discrete). Representative entries:
- name: device_rs232_baud
  type: enum
  values: ["2400", "9600", "19200", "38400", "57600", "115200"]
- name: device_rs232_parity
  type: enum
  values: [none, even, odd]
- name: server_api_linewrap
  type: integer
  range: [100, 512]
- name: logging_level
  type: integer
  range: [1, 4]
- name: preview_stream_width
  type: integer
  range: [180, 400]
- name: multiview_canvas_max_pixels
  type: integer
  description: "Maximum 8,847,360"
- name: multiview_canvas_horiz
  type: integer
  range: [640, 8192]
- name: multiview_canvas_vert
  type: integer
  range: [480, 8192]
- name: multiview_window_layer
  type: integer
  range: [1, 9]
- name: multiview_title_textsize
  type: integer
  range: [1, 10]
- name: multiview_title_transparency
  type: integer
  range: [0, 100]
- name: multiview_percent_range
  type: integer
  range: [0, 99]
- name: videowall_max_rows_cols
  type: integer
  description: "Max 15 for ZyPer4K/UHD/UHD60; Max 4 for ZyPerHD"
- name: server_security_devicekey_len
  type: integer
  range: [8, 64]
- name: snmp_password_len
  type: integer
  range: [8, 127]
- name: tunnel_port_range
  type: integer
  range: [1024, 49152]
# UNRESOLVED: full parameter set per set command not individually enumerated.
```

## Events
```yaml
# The "events" command enters a streaming mode where the server pushes initial
# events and new events as they occur to the telnet session; any char exits.
- id: server_event_stream
  description: Unsolicited server-pushed events (entered via `events` command)
  transport: tcp
# UNRESOLVED: specific event payload schema not documented in source.
```

## Macros
```yaml
# Presets and scripts are the multi-step sequence mechanisms.
- id: preset_run
  description: "run preset <name> executes a stored sequence of join/config commands"
  command: "run preset <name>"
- id: preset_commands_blob
  description: "set preset <id> commands blob stores a quoted semicolon-separated command list (max 4096 chars)"
  command: "set preset <id> commands blob <connections>"
- id: script_run
  description: "script <file> [loop] executes an AJAX/JSON or text script from /srv/ftp/files"
  command: "script <file> [loop]"
# UNRESOLVED: preset schedule execution details partially documented.
```

## Safety
```yaml
confirmation_required_for:
  - delete allConfiguration   # wipes all device/server info; action arg forces reboot/restart/shutdown
  - factoryDefaults device    # resets endpoint to factory defaults
  - update device             # firmware update
  - update server             # server software update; reboots server, drops connections
  - revert server             # reverts API + database version
  - shutdown server           # shuts down the Management Platform
interlocks:
  - "set device security: once a device is enabled for a server key it will not work with any server without the same key; if the key is lost, devices must be hardware factory defaulted."
  - "set server security deviceSecurityKey: all devices must have security disabled before changing the server key."
  - "dataConnect / switch: issuing or disconnecting can cause the ZyPer endpoint to reboot; establish the link once and leave it."
  - "set decoder osdStatusMode / set decoder hdcpMode: forces decoder reboot."
  - "set decoder displayResolution activeSize: if configured resolution exceeds display max, display will black out with no user indication."
  - "set videoWall size bezel values: affect a resolution change; if unsupported by the display there will be no picture."
notes:
  - "Network changes (add device across VLAN, isolation mode) require a qualified network engineer and confirmed inter-VLAN routing."
# UNRESOLVED: no electrical/power/voltage safety specs in source.
```

## Notes
- API is a line-oriented text interface with a `Zyper$` prompt; tab-completion and `<cmd> help` / `<cmd> ?` / `?` supported.
- Output format selectable via `set terminal output normal|json`.
- Endpoint families referenced: ZyPer4K (white box), ZyPer4K-XS/XSE/XR, ZyPerUHD, ZyPerUHD60 (-2EA/2DA), ZyPerHD. Many commands are family-specific (noted per action).
- Default ZMP video port = DHCP; management port static 192.168.20.2/24 (NUC-E/NUC-F/Enterprise rack mount defaults). These are documented network defaults, not the API control port.
- RS-232 relay to endpoints uses `send <dec> rs232 <text>`; supports `\n \r \t \\ \xnn`. Crestron may require an extra `\` before `\r`.
- CEC firmware requirement: ZyPer4K hardware firmware 3.5.2+ for CEC; CEC hexString not on ZyPerUHD.
- Preview stream: max 20 concurrent; ZyPer4K firmware 4.0.1.0+ for HLS.
- Redundancy switchover: 10–20s where virtual IP may be unavailable (ARP age time dependent).
- ZyPer4K-XS/XR must be on firmware 1.3.2.4+ for `set decoder hdmi5vControl`.

<!-- UNRESOLVED: default API control port (telnet/HTTP/FTP) not explicitly stated in source. -->
<!-- UNRESOLVED: firmware/software version compatibility matrix not stated. -->
<!-- UNRESOLVED: full per-command response/feedback field schemas not individually enumerated. -->
<!-- UNRESOLVED: voltage, current, power, and environmental specs not in source. -->

## Provenance

```yaml
source_domains:
  - zeevee.com
source_urls:
  - https://www.zeevee.com/zmp-api-manual/
  - https://www.zeevee.com/zmp-rs232-syntax-guide/
  - https://www.zeevee.com/documentation/
retrieved_at: 2026-08-11T03:09:15.876Z
last_checked_at: 2026-08-19T10:09:28.769Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T10:09:28.769Z
matched_actions: 222
action_count: 222
confidence: medium
summary: "All 222 spec actions map to source commands verbatim and source's command catalogue is essentially fully represented. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default TCP port for the API not explicitly stated in source (telnet/SSH access shown without a port number)."
- "no voltage/current/power specifications in source."
- "firmware/software version compatibility ranges not stated in source."
- "API/HTTP/FTP port numbers not explicitly stated in source"
- "many additional response fields per show command not individually enumerated."
- "full parameter set per set command not individually enumerated."
- "specific event payload schema not documented in source."
- "preset schedule execution details partially documented."
- "no electrical/power/voltage safety specs in source."
- "default API control port (telnet/HTTP/FTP) not explicitly stated in source."
- "firmware/software version compatibility matrix not stated."
- "full per-command response/feedback field schemas not individually enumerated."
- "voltage, current, power, and environmental specs not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
